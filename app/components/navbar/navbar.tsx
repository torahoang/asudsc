'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useRef, useState } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

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
  { href: '/events', label: 'Events' },
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

  // fixed spacing between logo and first link (desktop)
  const GAP_BETWEEN_LOGO_AND_NAV_PX = 400;

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

  // Overflow/zoom detection for desktop -> forceCompact
  useEffect(() => {
    if (isMobile) {
      setForceCompact(false);
      return;
    }

    const check = () => {
      const frame = frameRef.current;
      const block = desktopBlockRef.current;
      if (!frame || !block) return;

      const available =
        frame.clientWidth - SIDE_PADDING_PX * 2 - RIGHT_RESERVED_WHEN_COMPACT_PX;

      const required = Math.ceil(block.scrollWidth);
      const overflowing = required > available + 1;

      setForceCompact((prev) => (prev === overflowing ? prev : overflowing));
    };

    check();

    const ro = new ResizeObserver(() => check());
    if (frameRef.current) ro.observe(frameRef.current);
    if (desktopBlockRef.current) ro.observe(desktopBlockRef.current);

    window.addEventListener('resize', check);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', check);
    };
  }, [isMobile]);

  return (
    <div
      data-animation="default"
      data-collapse="small"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="navbar w-nav w-full border-2 relative z-50 h-[79px] bg-white"
    >
      {/* Positioning container */}
      <div ref={frameRef} className="relative w-full h-full">
        {!shouldUseMobileUI ? (
          <DesktopNavbar
            items={NAV_ITEMS}
            desktopLinkClass={desktopLinkClass}
            gapPx={GAP_BETWEEN_LOGO_AND_NAV_PX}
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