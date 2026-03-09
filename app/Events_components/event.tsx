'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ImageComponent from '../home_components/imageHolder'; // <-- adjust path

type EventItem = {
  id: string;
  date: string;
  title: string;
  posterSrc: string;
  posterAlt: string;

  // NEW
  arrowSrc: string;
  arrowAlt: string;
};

type Props = {
  heading?: string;
  events?: EventItem[];
  className?: string;

  // OPTIONAL: provide a default arrow for all items
  defaultArrowSrc?: string;
  defaultArrowAlt?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function getReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

export default function EventsBlock({
  heading = 'Our Events',
  events,
  className,
  defaultArrowSrc = '/images/arrow_right.png',
  defaultArrowAlt = 'Arrow',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Floating poster refs (no rerender on mousemove)
  const posterWrapRef = useRef<HTMLDivElement | null>(null); // absolute wrapper
  const posterCardRef = useRef<HTMLDivElement | null>(null); // inner card for scale/rotate

  const rafRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const activeRowRectRef = useRef<DOMRect | null>(null);

  const reducedMotionRef = useRef(false);

  const [activeId, setActiveId] = useState<string | null>(null);


  useEffect(() => {
    reducedMotionRef.current = getReducedMotion();

    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
      // If reduced motion toggles on while hovering, snap to no-rotation/no-arc.
      if (mq.matches && activeId) {
        applyTransforms(0, 0, 0);
      }
    };

    // Safari compatibility
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo<EventItem[]>(
    () =>
      (events ?? [
        {
          id: 'e-1',
          date: 'Feb 26th, 2026',
          title: 'Pro Web Scraping Powered by Go',
          posterSrc: '/events/pro-web-scraping.png',
          posterAlt: 'Pro Web Scraping event poster',
          arrowSrc: defaultArrowSrc,
          arrowAlt: defaultArrowAlt,
        },
        {
          id: 'e-2',
          date: 'Mar 12th, 2026',
          title: 'Build a Modern Portfolio with Next.js',
          posterSrc: '/events/portfolio-next.png',
          posterAlt: 'Modern Portfolio event poster',
          arrowSrc: defaultArrowSrc,
          arrowAlt: defaultArrowAlt,
        },
        {
          id: 'e-3',
          date: 'Apr 02nd, 2026',
          title: 'Design Systems in Tailwind',
          posterSrc: '/events/design-systems.png',
          posterAlt: 'Design Systems event poster',
          arrowSrc: defaultArrowSrc,
          arrowAlt: defaultArrowAlt,
        },
      ]).map((item) => ({
        ...item,
        arrowSrc: (item as EventItem).arrowSrc ?? defaultArrowSrc,
        arrowAlt: (item as EventItem).arrowAlt ?? defaultArrowAlt,
      })),
    [events, defaultArrowSrc, defaultArrowAlt]
  );

  const activeEvent = activeId ? data.find((e) => e.id === activeId) : null;

  const cancelRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const applyTransforms = (baseX: number, baseY: number, normalizedX: number) => {
    const wrap = posterWrapRef.current;
    const card = posterCardRef.current;
    if (!wrap || !card) return;

    // Rotation: -6deg .. +6deg (rotateZ)
    const maxRot = 6;
    const rot = clamp(normalizedX, -1, 1) * maxRot;

    // Arc: half-circle / fan feel.
    // Map normalizedX [-1..1] to angle in [-pi/2 .. +pi/2]
    // Then compute offsets.
    // We want "center is highest/closest to top of arc" and edges shift outward.
    const r = 30; // good default in 20–40px range

    const reduced = reducedMotionRef.current;

    let arcX = 0;
    let arcY = 0;
    let rotZ = 0;

    if (!reduced) {
      const angle = clamp(normalizedX, -1, 1) * (Math.PI / 2); // -90°..+90°
      // Fan arc:
      // x: outward left/right
      // y: highest at center (more negative = up)
      // Using sin/cos:
      arcX = Math.sin(angle) * r; // -r..+r
      arcY = (Math.cos(angle) - 1) * r; // 0 at center? Actually cos(0)=1 => 0; edges cos=0 => -r (up)
      // We want center highest, edges outward (and slightly lower). Flip that:
      // Make center the most negative (highest), edges closer to 0.
      // Using: arcY = -(1 - cos(angle)) * r => 0 at center, -r at edges (edges highest) — wrong.
      // Instead: arcY = -(Math.cos(angle)) * r gives -r at center, ~0 at edges — correct.
      arcY = -Math.cos(angle) * r; // center -r (highest), edges ~0
      rotZ = rot;
    }

    // Translate wrapper to pointer within container (base)
    wrap.style.transform = `translate3d(${baseX}px, ${baseY}px, 0)`;

    // Add arc offset + rotation on the card (with your required transform order)
    // Note: keep your existing offset: -translate-y-1/2 and translate-x-6 via Tailwind classes
    card.style.transform = `translate3d(0px, 0px, 0) translate3d(${arcX.toFixed(
      2
    )}px, ${arcY.toFixed(2)}px, 0) rotateZ(${rotZ.toFixed(2)}deg)`;
  };

const scheduleUpdate = () => {
  if (rafRef.current != null) return;

  rafRef.current = requestAnimationFrame(() => {
    rafRef.current = null;

    const container = containerRef.current;
    const rowRect = activeRowRectRef.current;
    const p = lastPointerRef.current;

    if (!container || !rowRect || !p || !activeId) return;

    const containerRect = container.getBoundingClientRect();

    // X still follows pointer within the hovered row
    const localXInRow = clamp(p.x - rowRect.left, 0, rowRect.width);

    // normalizedX: left -1, center 0, right +1
    const mid = rowRect.width / 2;
    const normalizedX = mid > 0 ? clamp((localXInRow - mid) / mid, -1, 1) : 0;

    // Convert row-local X -> container-local X for absolute positioning
    const baseX = clamp(
      rowRect.left - containerRect.left + localXInRow,
      0,
      containerRect.width
    );

    // LOCK Y: keep poster fixed vertically within the row
    const lockedYInRow = rowRect.height / 2;
    const baseY = clamp(
      rowRect.top - containerRect.top + lockedYInRow,
      0,
      containerRect.height
    );

    applyTransforms(baseX, baseY, normalizedX);
  });
};

  const handlePointer = (clientX: number, clientY: number) => {
    lastPointerRef.current = { x: clientX, y: clientY };
    scheduleUpdate();
  };

  const onDeactivate = () => {
    setActiveId(null);
    activeRowRectRef.current = null;
    lastPointerRef.current = null;
    cancelRaf();
  };

  return (
    <section
      ref={containerRef}
      className={[
        'relative mx-auto w-full max-w-5xl overflow-visible bg-white',
        'px-6 pb-10 sm:px-10 sm:pb-14',
        'pt-20 sm:pt-24 lg:pt-28',
        className ?? '',
      ].join(' ')}
      onMouseMove={(e) => {
        if (!activeId) return;
        handlePointer(e.clientX, e.clientY);
      }}
    >
      {/* Title */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
          {heading}
        </h2>
      </div>

      {/* Events list */}
      <div className="mx-auto w-full max-w-6xl">
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <EventRow
                item={item}
                isActive={activeId === item.id}
                onEnter={(e, rowEl) => {
                  setActiveId(item.id);

                  // Store hovered row bounding box (NOT whole container)
                  activeRowRectRef.current = rowEl.getBoundingClientRect();

                  // Immediately set rotation/arc based on entry point
                  handlePointer(e.clientX, e.clientY);
                }}
                onLeave={() => {
                  if (activeId === item.id) onDeactivate();
                }}
                onMove={(e, rowEl) => {
                  if (activeId !== item.id) return;

                  // Update rect in case layout shifts while hovering
                  activeRowRectRef.current = rowEl.getBoundingClientRect();
                  handlePointer(e.clientX, e.clientY);
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Floating poster */}
      <div
        ref={posterWrapRef}
        aria-hidden="true"
        className={[
          'pointer-events-none absolute left-0 top-0 z-20',
          'transition-opacity duration-200',
          activeEvent ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ transform: 'translate3d(0px, 0px, 0)' }}
      >
        <div
          ref={posterCardRef}
          className={[
            'relative -translate-y-1/2 translate-x-6',
            'h-40 w-40 sm:h-48 sm:w-48',
            'rounded-2xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] ring-1 ring-neutral-200',
            'overflow-hidden',
            // keep scale transition only; rotation/arc are applied inline (perf)
            'transition-transform duration-200',
            activeEvent ? 'scale-100' : 'scale-95',
          ].join(' ')}
          style={{
            transform: 'translate3d(0px, 0px, 0) translate3d(0px, 0px, 0) rotateZ(0deg)',
            willChange: 'transform',
          }}
        >
          {activeEvent ? (
            <ImageComponent
              src={activeEvent.posterSrc}
              alt={activeEvent.posterAlt}
              width={512}
              height={512}
              className="h-full w-full object-cover"
              priority={false}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function EventRow({
  item,
  isActive,
  onEnter,
  onLeave,
  onMove,
}: {
  item: EventItem;
  isActive: boolean;
  onEnter: (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => void;
  onLeave: React.MouseEventHandler<HTMLDivElement>;
  onMove: (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => void;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={rowRef}
      className={['group relative py-6 sm:py-8', 'cursor-default select-none'].join(' ')}
      onMouseEnter={(e) => {
        const el = rowRef.current;
        if (!el) return;
        onEnter(e, el);
      }}
      onMouseLeave={onLeave}
      onMouseMove={(e) => {
        const el = rowRef.current;
        if (!el) return;
        onMove(e, el);
      }}
    >
      {/* 3 columns on sm+: date | title | arrow */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[220px_1fr_40px] sm:items-center sm:gap-10">
        {/* Date */}
        <div
          className={[
            'text-lg font-semibold text-neutral-900 sm:text-xl',
            'transition-transform duration-200 ease-out',
            isActive ? 'translate-x-2' : 'translate-x-0',
          ].join(' ')}
        >
          {item.date}
        </div>

        {/* Title */}
        <div
          className={[
            'text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl',
            'transition-transform duration-200 ease-out',
            isActive ? 'translate-x-2' : 'translate-x-0',
          ].join(' ')}
        >
          {item.title}
        </div>

        {/* Arrow (40x40) */}
        <div
          className={[
            'hidden sm:flex items-center justify-end',
            'transition-transform duration-200 ease-out',
            isActive ? 'translate-x-1' : 'translate-x-0',
          ].join(' ')}
        >
          <ImageComponent
            src={item.arrowSrc}
            alt={item.arrowAlt}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Lines underneath (shift left on hover) */}
      <div className="mt-5 sm:mt-6">
        <div
          className={[
            'h-px w-full bg-neutral-900/80 will-change-transform',
            'transition-transform duration-200 ease-out',
            isActive ? '-translate-x-2' : 'translate-x-0',
          ].join(' ')}
        />
      </div>
    </div>
  );
}