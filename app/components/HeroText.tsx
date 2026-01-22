// app/components/HeroText.tsx
import React from 'react';

interface HeroTextProps {
  children: React.ReactNode;
}

export default function HeroText({ children }: HeroTextProps) {
  return (
    <div className="mask">
      <div
        data-w-id="8185329b-a277-0f16-fc52-2b2dc10976ec"
        style={{
          transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
          transformStyle: 'preserve-3d',
          fontFamily: "'Product Sans', sans-serif"
        }}
        className="text-block"
      >
        {children}
      </div>
    </div>
  );
}