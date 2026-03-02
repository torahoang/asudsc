import React from 'react';

interface HeroHeadingProps {
  children: React.ReactNode;
  className?: string;
  dataWId?: string;
}

export default function HeroHeading({ children, className = '', dataWId }: HeroHeadingProps) {
  return (
    <div className="mask overflow-hidden">
      <h1
        data-w-id={dataWId}
        style={{
          transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
          transformStyle: 'preserve-3d',
          fontFamily: "'Product Sans', sans-serif"
        }}
        className={`heading break-words w-full ${className}`}
      >
        {children}
      </h1>
    </div>
  );
}