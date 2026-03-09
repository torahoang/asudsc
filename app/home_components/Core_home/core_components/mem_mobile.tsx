// file: CoreTeamSectionMobile.tsx
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import ImageComponent from '../../imageHolder';
import type { TeamMember } from './members';

type TeamCardProps = {
  member: TeamMember;
  priority?: boolean;
};

function TeamCardMobile({ member, priority }: TeamCardProps) {
  return (
    <div className="flex w-[9.5rem] flex-col items-center text-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-neutral-300">
        <ImageComponent
          src={member.imageSrc}
          alt={member.imageAlt}
          width={400}
          height={400}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 text-sm font-semibold text-neutral-800">{member.name}</div>

      <div className="mt-1 text-xs leading-snug text-neutral-600">{member.role}</div>
    </div>
  );
}

export type CoreTeamSectionMobileProps = {
  members: TeamMember[];
  mobileSpeedSeconds?: number;
  pauseOnHover?: boolean;

  /** mobile: how many cards shown at once */
  mobileCols?: 2;
  mobileRows?: 2;
};

export default function CoreTeamSectionMobile({
  members,
  mobileSpeedSeconds = 28,
  pauseOnHover = true,
  mobileCols = 2,
  mobileRows = 2,
}: CoreTeamSectionMobileProps) {
  const blockSize = mobileCols * mobileRows; // default 4

  const blocks: TeamMember[][] = useMemo(() => {
    const out: TeamMember[][] = [];
    for (let i = 0; i < members.length; i += blockSize) {
      out.push(members.slice(i, i + blockSize));
    }
    return out.length ? out : [[]];
  }, [members, blockSize]);

  return (
    <div
      className={[
        'flex flex-nowrap sm:hidden',
        'animate-team-infinite-scroll',
        pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
        'motion-reduce:animate-none',
      ].join(' ')}
      style={
        {
          ['--team-scroll-duration' as any]: `${mobileSpeedSeconds}s`,
        } as React.CSSProperties
      }
    >
      {/* First pass */}
      <ul className="flex w-max items-stretch gap-6 pr-6">
        {blocks.map((block, bIdx) => (
          <li key={`m-block-${bIdx}`} className="shrink-0" aria-label={`Mobile block ${bIdx + 1}`}>
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              {block.map((m, idx) => (
                <TeamCardMobile
                  key={`m-${bIdx}-${idx}-${m.name}`}
                  member={m}
                  priority={bIdx === 0 && idx < 4}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Duplicate pass (aria-hidden) */}
      <ul className="flex w-max items-stretch gap-6 pr-6" aria-hidden="true">
        {blocks.map((block, bIdx) => (
          <li key={`m-block-dup-${bIdx}`} className="shrink-0">
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              {block.map((m, idx) => (
                <TeamCardMobile key={`mdup-${bIdx}-${idx}-${m.name}`} member={m} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}