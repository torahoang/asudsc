'use client';

import NavbarLogo from './navbar_logo';
import NavItemLink from './nav_itemlink';

type NavItem = {
  href: string;
  label: string;
  strong?: boolean;
};

type MobileNavbarProps = {
  items: NavItem[];
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  mobileItemClass: string;
};

export default function MobileNavbar({
  items,
  isMenuOpen,
  onToggleMenu,
  mobileItemClass,
}: MobileNavbarProps) {
  return (
    <>
      {/* Logo left */}
      <NavbarLogo className="absolute left-4 h-full" />

      {/* Hamburger */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-1.5 p-2 z-50"
        onClick={onToggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onToggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <nav
          role="navigation"
          className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md z-50"
        >
          <div className="w-full flex flex-col gap-3 px-4 py-4">
            {items.map((item) => (
              <NavItemLink
                key={item.href}
                href={item.href}
                variant="mobile"
                mobileItemClass={mobileItemClass}
                onClick={onToggleMenu}
              >
                {item.strong ? (
                  <strong className="text-black tracking-wide">
                    {item.label}
                  </strong>
                ) : (
                  <span className="text-black tracking-wide">{item.label}</span>
                )}
              </NavItemLink>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}