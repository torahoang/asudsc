'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type NavItemLinkProps = {
  href: string;
  children: ReactNode;
  variant: 'desktop' | 'mobile';
  onClick?: () => void;
  isCurrent?: boolean;
  desktopLinkClass?: string;
  mobileItemClass?: string;
};

export default function NavItemLink({
  href,
  children,
  variant,
  onClick,
  isCurrent = false,
  desktopLinkClass = '',
  mobileItemClass = '',
}: NavItemLinkProps) {
  const className =
    variant === 'desktop'
      ? `${desktopLinkClass} ${isCurrent ? 'w--current' : ''}`.trim()
      : mobileItemClass;

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}