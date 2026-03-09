'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useRef, useState } from 'react';
import DesktopNavbar from './Navbar_parts/desktop_navbar';
import MobileNavbar from './Navbar_parts/mobile_navbar';

type NavItem = {
  href: string;
  label: string;
  strong?: boolean;
  current?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home', strong: true, current: true },
  { href: '/#about-section', label: 'About' },
  { href: '#core-team', label: 'Core Team' },
  { href: '/Events_page', label: 'Events' },
  { href: '/alumni', label: 'Alumni' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const [isMobile, setIsMobile] = useState(false);
  const [forceCompact, setForceCompact] = useState(false);

  // refs for overflow/zoom detection
  const frameRef = useRef<HTMLDivElement | null>(null);
  const desktopBlockRef = useRef<HTMLDivElement | null>(null);

  const mobileItemClass =
    'w-full block px-4 py-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition';

  const desktopLinkClass =
    'menu-item w-nav-link text-black tracking-wide whitespace-nowrap text-sm lg:text-base inline-flex items-center px-5 py-2.5 rounded-lg bg-white/80 hover:bg-white transition';

  // GAP behavior (desktop)
  const BASE_GAP_BETWEEN_LOGO_AND_NAV_PX = 450; // your ideal spacing
  const MIN_GAP_BETWEEN_LOGO_AND_NAV_PX = 24; // smallest we allow before switching to dropdown

  const [gapPx, setGapPx] = useState(BASE_GAP_BETWEEN_LOGO_AND_NAV_PX);

  // Keep latest gapPx in a ref so our observer effect doesn't have to depend on gapPx
  const gapPxRef = useRef(gapPx);
  useEffect(() => {
    gapPxRef.current = gapPx;
  }, [gapPx]);

  // padding/reserved space so centered block doesn't collide with edges
  const SIDE_PADDING_PX = 16;
  const RIGHT_RESERVED_WHEN_COMPACT_PX = 56;

  // mobile breakpoint detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);

  // we use mobile UI if actual mobile OR forced compact due to overflow/zoom
  const shouldUseMobileUI = useMemo(
    () => isMobile || forceCompact,
    [isMobile, forceCompact]
  );

  // close menu when switching modes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [shouldUseMobileUI]);

  // Overflow/zoom detection for desktop (debounced):
  // Only "commits" adjustments once after zoom/resize settles.
  useEffect(() => {
    if (isMobile) {
      setForceCompact(false);
      setGapPx(BASE_GAP_BETWEEN_LOGO_AND_NAV_PX);
      return;
    }

    let timeoutId: number | null = null;
    let rafId: number | null = null;

    const checkNow = () => {
      const frame = frameRef.current;
      const block = desktopBlockRef.current;
      if (!frame || !block) return;

      const available =
        frame.clientWidth - SIDE_PADDING_PX * 2 - RIGHT_RESERVED_WHEN_COMPACT_PX;

      // This scrollWidth includes the current gap being used in DesktopNavbar.
      const required = Math.ceil(block.scrollWidth);
      const currentGap = gapPxRef.current;

      // If it overflows, try to "buy back" space by shrinking the gap first.
      if (required > available + 1) {
        const overflow = required - available;

        // Because required includes gapPx, reducing gap by X reduces required by ~X.
        const nextGap = Math.max(
          MIN_GAP_BETWEEN_LOGO_AND_NAV_PX,
          Math.min(BASE_GAP_BETWEEN_LOGO_AND_NAV_PX, currentGap - overflow)
        );

        if (nextGap !== currentGap) {
          gapPxRef.current = nextGap;
          setGapPx(nextGap);
          // Don't force compact yet; let the layout update and a later debounced check decide.
          return;
        }

        // We couldn't shrink any further (already at MIN).
        // Determine if it would still overflow even at MIN.
        const minRequired =
          required - Math.max(0, currentGap - MIN_GAP_BETWEEN_LOGO_AND_NAV_PX);

        setForceCompact(minRequired > available + 1);
        return;
      }

      // It fits: ensure we are not compact, and gently restore the gap back toward BASE.
      setForceCompact(false);

      if (currentGap < BASE_GAP_BETWEEN_LOGO_AND_NAV_PX) {
        const spare = available - required;
        // restore faster when there's lots of room, slower when tight
        const bump = Math.max(1, Math.floor(spare / 6));
        const restored = Math.min(
          BASE_GAP_BETWEEN_LOGO_AND_NAV_PX,
          currentGap + bump
        );

        if (restored !== currentGap) {
          gapPxRef.current = restored;
          setGapPx(restored);
        }
      }
    };

    // Debounced scheduler: only run checkNow once after changes stop.
    const schedule = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (timeoutId !== null) window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
          checkNow();
        }, 160); // tweak: ~120–200ms usually feels good
      });
    };

    // Initial (debounced) run
    schedule();

    const ro = new ResizeObserver(schedule);
    if (frameRef.current) ro.observe(frameRef.current);
    // if (desktopBlockRef.current) ro.observe(desktopBlockRef.current);

    window.addEventListener('resize', schedule);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // NOTE: intentionally not depending on gapPx; we read it from gapPxRef instead.
  }, [isMobile]);

  return (
    <div
      data-animation="default"
      data-collapse="small"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navbar w-nav w-full border-2 border-transparent md:border-gray-200 fixed top-0 left-0 right-0 z-50 h-[79px] bg-white"
    >
      {/* Positioning container */}
      <div ref={frameRef} className="relative w-full h-full">
        {!shouldUseMobileUI ? (
          <DesktopNavbar
            items={NAV_ITEMS}
            desktopLinkClass={desktopLinkClass}
            gapPx={gapPx} // ✅ dynamic gap now
            desktopBlockRef={desktopBlockRef}
          />
        ) : (
          <MobileNavbar
            items={NAV_ITEMS}
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
            mobileItemClass={mobileItemClass}
          />
        )}
      </div>
    </div>
  );
}