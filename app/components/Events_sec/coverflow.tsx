/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  memo,
} from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type PanInfo,
  type MotionValue,
} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
export interface CoverFlowItem {
  id: string | number
  image: string
  title: string
  subtitle?: string
}

export interface CoverFlowProps {
  items: CoverFlowItem[]
  itemWidth?: number
  itemHeight?: number
  stackSpacing?: number
  centerGap?: number
  rotation?: number
  initialIndex?: number
  enableReflection?: boolean
  enableClickToSnap?: boolean
  enableScroll?: boolean
  scrollThreshold?: number
  className?: string
  onItemClick?: (item: CoverFlowItem, index: number) => void
  onIndexChange?: (index: number) => void
}

export function CoverFlow({
  items,
  itemWidth = 400,
  itemHeight = 400,
  stackSpacing = 100,
  centerGap = 250,
  rotation = 50,
  initialIndex = 0,
  enableReflection = false,
  enableClickToSnap = true,
  enableScroll = true,
  scrollThreshold = 100,
  className,
  onItemClick,
  onIndexChange,
}: CoverFlowProps) {
  // Derived from MotionValue (updates only when rounded index changes)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const activeIndexRef = useRef(initialIndex)

  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const enableScrollRef = useRef(enableScroll)
  const scrollThresholdRef = useRef(scrollThreshold)

  const scrollX = useMotionValue(initialIndex)
  const springX = useSpring(scrollX, {
    stiffness: 150,
    damping: 30,
    mass: 1,
  })
  const ctaOffset = 80 // increase this to move further right
  const ctaX = centerGap + itemWidth / 2 + ctaOffset
  // Keep the MV as the source of truth for index changes (minimal rerenders).
  useEffect(() => {
    const clamp = (i: number) => Math.min(Math.max(i, 0), items.length - 1)

    const updateFromValue = (value: number) => {
      if (isDraggingRef.current) return
      const rounded = clamp(Math.round(value))
      if (rounded === activeIndexRef.current) return
      activeIndexRef.current = rounded
      setActiveIndex(rounded)
    }

    // Initialize from current value
    updateFromValue(scrollX.get())

    const unsub = scrollX.on('change', updateFromValue)
    return () => unsub()
  }, [items.length, scrollX])

  // Respond to external initialIndex changes by driving the MotionValue.
  useEffect(() => {
    if (initialIndex !== scrollX.get()) {
      scrollX.set(initialIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex])

  useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  useEffect(() => {
    enableScrollRef.current = enableScroll
  }, [enableScroll])

  useEffect(() => {
    scrollThresholdRef.current = scrollThreshold
  }, [scrollThreshold])

  const jumpToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), items.length - 1)
      scrollX.set(clamped)
    },
    [items.length, scrollX],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Wheel accumulation + rAF throttling (at most once per frame)
    const wheelAccumulatorRef = { current: 0 }
    const lastWheelTimeRef = { current: Date.now() }
    const rafIdRef = { current: 0 as number | 0 }
    const pendingDirectionRef = { current: 0 as -1 | 0 | 1 } // not strictly needed; kept for clarity

    const processWheel = () => {
      rafIdRef.current = 0

      const threshold = scrollThresholdRef.current
      const acc = wheelAccumulatorRef.current

      if (acc > threshold) {
        const currentIndex = Math.round(scrollX.get())
        pendingDirectionRef.current = 1
        jumpToIndex(currentIndex + 1)
        wheelAccumulatorRef.current = 0
      } else if (acc < -threshold) {
        const currentIndex = Math.round(scrollX.get())
        pendingDirectionRef.current = -1
        jumpToIndex(currentIndex - 1)
        wheelAccumulatorRef.current = 0
      } else {
        pendingDirectionRef.current = 0
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (!enableScrollRef.current) return

      const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      if (isVerticalScroll) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastWheelTimeRef.current > 200) wheelAccumulatorRef.current = 0
      lastWheelTimeRef.current = now

      wheelAccumulatorRef.current += e.deltaX

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(processWheel)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [jumpToIndex, scrollX])

  const onDragStart = useCallback(() => {
    isDraggingRef.current = true
    setIsDragging(true)
  }, [])

  const onDrag = useCallback(
    (event: any, info: PanInfo) => {
      const deltaIndex = -info.delta.x / (centerGap * 0.8)
      const current = springX.get()
      scrollX.set(current + deltaIndex)
    },
    [centerGap, springX, scrollX],
  )

  const onDragEnd = useCallback(
    (event: any, info: PanInfo) => {
      // Turn off drag gating BEFORE snapping so the MV subscription can update activeIndex.
      isDraggingRef.current = false
      setIsDragging(false)

      const current = springX.get()
      const velocity = info.velocity.x
      const projected = current - velocity * 0.002

      const targetIndex = Math.round(projected)
      const clampedIndex = Math.min(Math.max(targetIndex, 0), items.length - 1)

      scrollX.set(clampedIndex)
    },
    [items.length, springX, scrollX],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        jumpToIndex(activeIndex - 1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        jumpToIndex(activeIndex + 1)
      }
    },
    [activeIndex, jumpToIndex],
  )

  // ✅ stable handler: no inline closures in map
  const handleCardClick = useCallback(
    (index: number) => {
      const item = items[index]
      if (!item) return

      if (index === activeIndex) {
        onItemClick?.(item, index)
      } else if (enableClickToSnap) {
        jumpToIndex(index)
      }
    },
    [items, activeIndex, enableClickToSnap, jumpToIndex, onItemClick],
  )

  return (
    <motion.div
      ref={containerRef}
      className={`group relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-transparent focus:outline-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${className ?? ''}`}
      style={{ perspective: 1000 }}
      role="region"
      aria-label="Cover Flow"
      tabIndex={0}
      onKeyDown={onKeyDown}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      data-dragging={isDragging ? 'true' : 'false'}
    >
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => (
          <MemoCoverFlowItemCard
            key={item.id}
            item={item}
            index={index}
            scrollX={springX}
            width={itemWidth}
            height={itemHeight}
            stackSpacing={stackSpacing}
            centerGap={centerGap}
            rotation={rotation}
            isActive={index === activeIndex}
            enableReflection={enableReflection}
            enableClickToSnap={enableClickToSnap}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {activeIndex === items.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute left-1/2 z-50 pointer-events-auto"
          // Desktop: your current “arrow to the right” placement
          // Mobile: center it above the last card
          style={{
            // default (mobile): top edge of the active card + a little padding
            top: `calc(50% - ${itemHeight / 2}px - 14px)`,
            x: '-50%',
          }}
        >
          {/* Mobile version */}
          <motion.div className="md:hidden">
            <Link
              href="/events"
              aria-label="See all events"
              className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <span>See all events</span>
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {/* Desktop version (your current behavior) */}
          <motion.div
            className="hidden md:block bg-foreground/20 rounded-full"
            initial={{ x: ctaX - 6 }}
            animate={{ x: ctaX }}
            exit={{ x: ctaX - 6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              // desktop keeps vertical centering like before
              position: 'absolute',
              top: `calc(50% + ${itemHeight / 2}px)`, // cancels parent top for desktop
              transform: 'translateY(-50%)',
            }}
          >
            <Link
              href="/events"
              aria-label="See all events"
              className="inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-4 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-background/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <span>See all events</span>
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </motion.div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-40 transition-opacity duration-300">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeIndex}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">
            {items[activeIndex]?.title}
          </h3>
          {items[activeIndex]?.subtitle && (
            <p className="text-foreground/60 text-sm mt-1 font-medium tracking-wide">
              {items[activeIndex]?.subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* ✅ CSS-only: hide reflection while dragging (no isDragging prop fan-out) */}
      <style jsx>{`
        [data-dragging='true'] :global(.cf-reflection) {
          display: none;
        }
      `}</style>
    </motion.div>
  )
}

interface CardProps {
  item: CoverFlowItem
  index: number
  scrollX: MotionValue<number>
  width: number
  height: number
  stackSpacing: number
  centerGap: number
  rotation: number
  isActive: boolean
  enableReflection: boolean
  enableClickToSnap: boolean
  onCardClick: (index: number) => void
}

function CoverFlowItemCard({
  item,
  index,
  scrollX,
  width,
  height,
  stackSpacing,
  centerGap,
  rotation,
  isActive,
  enableReflection,
  enableClickToSnap,
  onCardClick,
}: CardProps) {
  const position = useTransform(scrollX, (value) => index - value)
  const zIndex = useTransform(position, (pos) => 1000 - Math.abs(pos) * 10)

  // ✅ No per-frame object allocations: separate transforms
  const rotateY = useTransform(position, (pos) => {
    const absPos = Math.abs(pos)
    const isCenter = absPos < 0.5

    if (isCenter) return -pos * (rotation * 2)
    if (pos < -0.5) return rotation
    if (pos > 0.5) return -rotation
    return 0
  })

  const x = useTransform(position, (pos) => {
    const absPos = Math.abs(pos)

    if (pos < 0) {
      const stackIndex = Math.max(0, absPos - 1)
      let xPos = -centerGap - stackIndex * stackSpacing
      if (absPos < 1) xPos = pos * centerGap
      return xPos
    } else {
      const stackIndex = Math.max(0, absPos - 1)
      let xPos = centerGap + stackIndex * stackSpacing
      if (absPos < 1) xPos = pos * centerGap
      return xPos
    }
  })

  const z = useTransform(position, (pos) => {
    const absPos = Math.abs(pos)
    if (absPos > 0.5) return -200
    return Math.abs(pos) * -400
  })

  // ✅ Cheaper than filter: brightness(): overlay opacity
  const absPos = useTransform(position, (p) => Math.abs(p))
  const overlayOpacity = useTransform(absPos, (p) => {
    if (p <= 0.5) return (p / 0.5) * 0.4
    return 0.4
  })

  const handleClick = useCallback(() => {
    onCardClick(index)
  }, [onCardClick, index])

  const cursorClass = isActive || enableClickToSnap ? 'cursor-pointer' : ''

  return (
    <motion.div
      className={`absolute top-1/2 left-1/2 preserve-3d will-change-transform pointer-events-auto ${cursorClass}`}
      style={{
        width,
        height,
        marginTop: -height / 2,
        marginLeft: -width / 2,
        x,
        z,
        rotateY,
        zIndex,
      }}
      onClick={handleClick}
    >
      <div className="relative w-full h-full rounded-xl bg-black">
        <div className="absolute inset-0 rounded-xl border border-white/10 z-20 pointer-events-none" />
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={`${width}px`}
            priority={isActive}
            className="object-cover select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 dark:opacity-20 pointer-events-none z-10" />

          {/* ✅ dim overlay (0 center → 0.4 sides) */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none z-10"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      </div>

      {enableReflection && (
        <div
          className="cf-reflection absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            top: '100%',
            width: width,
            height: height * 0.35,
            marginTop: '2px',
          }}
        >
          <div
            className="relative w-full h-full opacity-40"
            style={{ transform: 'scaleY(-1)' }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes={`${width}px`}
              className="object-cover blur-[1px]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/90 to-transparent" />
          </div>
        </div>
      )}
    </motion.div>
  )
}

function areCardPropsEqual(prev: CardProps, next: CardProps) {
  // MotionValues are stable references; compare by identity.
  if (prev.scrollX !== next.scrollX) return false

  // Layout/behavior props
  if (prev.index !== next.index) return false
  if (prev.width !== next.width) return false
  if (prev.height !== next.height) return false
  if (prev.stackSpacing !== next.stackSpacing) return false
  if (prev.centerGap !== next.centerGap) return false
  if (prev.rotation !== next.rotation) return false
  if (prev.isActive !== next.isActive) return false
  if (prev.enableReflection !== next.enableReflection) return false
  if (prev.enableClickToSnap !== next.enableClickToSnap) return false
  if (prev.onCardClick !== next.onCardClick) return false

  // Item fields (avoid rerender if parent recreates objects with same values)
  const a = prev.item
  const b = next.item
  if (a === b) return true
  return (
    a.id === b.id &&
    a.image === b.image &&
    a.title === b.title &&
    a.subtitle === b.subtitle
  )
}

const MemoCoverFlowItemCard = memo(CoverFlowItemCard, areCardPropsEqual)