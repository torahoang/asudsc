'use client';

import NavItemLink from './nav_itemlink';
import NavbarLogo from './navbar_logo';

type NavItem = {
  href: string;
  label: string;
  strong?: boolean;
  current?: boolean;
};

type DesktopNavbarProps = {
  items: NavItem[];
  desktopLinkClass: string;
  gapPx: number;
  desktopBlockRef: React.RefObject<HTMLDivElement | null>;
};

export default function DesktopNavbar({
  items,
  desktopLinkClass,
  gapPx,
  desktopBlockRef,
}: DesktopNavbarProps) {
  return (
    <div
      ref={desktopBlockRef}
      className={[
        'hidden md:flex items-center',
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'min-w-0',
      ].join(' ')}
      style={{ columnGap: `${gapPx}px` }}
    >
      <NavbarLogo className="-ml-10" />

      <nav role="navigation" className="flex items-center gap-3 min-w-0">
        {items.map((item) => (
          <NavItemLink
            key={item.href}
            href={item.href}
            variant="desktop"
            desktopLinkClass={desktopLinkClass}
            isCurrent={!!item.current}
          >
            {item.strong ? (
              <strong className="bold-text-6">{item.label}</strong>
            ) : (
              item.label
            )}
          </NavItemLink>
        ))}
      </nav>
    </div>
  );
}