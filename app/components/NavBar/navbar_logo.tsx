'use client';

import Link from 'next/link';
import ImageComponent from '@/app/components/imageHolder';

type NavbarLogoProps = {
  href?: string;
  className?: string;
};

export default function NavbarLogo({
  href = 'https://www.asudsc.com/',
  className = '',
}: NavbarLogoProps) {
  return (
    <Link
      href={href}
      aria-label="ASU DSC Home"
      className={`brand w-nav-brand flex items-center ${className}`}
    >
      <ImageComponent
        src="/images/dsclogo.svg"
        alt="ASU DSC Logo"
        width={60}
        height={60}
        className="h-14 sm:h-16 md:h-18 w-auto"
        priority
      />
    </Link>
  );
}