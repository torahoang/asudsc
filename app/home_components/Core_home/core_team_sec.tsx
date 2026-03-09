// file: CoreTeamSection.tsx
'use client';
import React, { useMemo } from 'react';
import CoreTeamSectionMobile from './core_components/mem_mobile';
import CoreTeamSectionDesktop from './core_components/mem_desktop';
import type { TeamMember } from './core_components/members';
import { defaultCoreTeamMembers } from './core_components/members';

export type CoreTeamSectionProps = {
  title?: string;
  members?: TeamMember[];
  className?: string;

  /** desktop + mobile have separate speeds now */
  desktopSpeedSeconds?: number;
  mobileSpeedSeconds?: number;

  pauseOnHover?: boolean;

  /** mobile: how many cards shown at once */
  mobileCols?: 2;
  mobileRows?: 2;
};

export default function CoreTeamSection({
  title = 'Meet the Core Team of 2026',
  members,
  className = '',
  desktopSpeedSeconds = 45,
  mobileSpeedSeconds = 28,
  pauseOnHover = true,
  mobileCols = 2,
  mobileRows = 2,
}: CoreTeamSectionProps) {
  const data: TeamMember[] = useMemo(() => members ?? defaultCoreTeamMembers, [members]);

  return (
    <section className={`w-full ${className}`}>
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-800 sm:text-4xl">
          {title}
        </h2>

        {/* Track */}
        <div
          className={[
            'mt-10 w-full',
            'inline-flex flex-nowrap overflow-hidden',
            '[mask-image:_linear-gradient(to_right,transparent_0,_black_72px,_black_calc(100%-72px),transparent_100%)]',
          ].join(' ')}
        >
          <CoreTeamSectionMobile
            members={data}
            mobileSpeedSeconds={mobileSpeedSeconds}
            pauseOnHover={pauseOnHover}
            mobileCols={mobileCols}
            mobileRows={mobileRows}
          />

          <CoreTeamSectionDesktop
            members={data}
            desktopSpeedSeconds={desktopSpeedSeconds}
            pauseOnHover={pauseOnHover}
          />
        </div>
      </div>

      {/* Keyframes (no tailwind config needed) */}
      <style jsx>{`
        @keyframes team-infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        :global(.animate-team-infinite-scroll) {
          animation: team-infinite-scroll var(--team-scroll-duration, 26s) linear infinite;
        }
      `}</style>
    </section>
  );
}