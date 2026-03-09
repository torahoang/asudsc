// file: CoreTeamSectionDesktop.tsx
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ImageComponent from '../../imageHolder';
import type { TeamMember } from './members';

type TeamCardProps = {
  member: TeamMember;
  priority?: boolean;
};

function TeamCardDesktop({ member, priority }: TeamCardProps) {
  return (
    <div className="flex w-[15.5rem] flex-col items-center text-center sm:w-[16.5rem]">
      <div className="relative h-44 w-44 overflow-hidden rounded-full ring-2 ring-neutral-300 sm:h-48 sm:w-48">
        <ImageComponent
          src={member.imageSrc}
          alt={member.imageAlt}
          width={400}
          height={400}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 text-xl font-semibold text-neutral-800">{member.name}</div>

      <div className="mt-2 text-sm leading-relaxed text-neutral-600">{member.role}</div>
    </div>
  );
}

export type CoreTeamSectionDesktopProps = {
  members: TeamMember[];
  desktopSpeedSeconds?: number;
  pauseOnHover?: boolean;
};

export default function CoreTeamSectionDesktop({
  members,
  desktopSpeedSeconds = 45,
  pauseOnHover = true,
}: CoreTeamSectionDesktopProps) {
  return (
    <div
      className={[
        'hidden sm:flex flex-nowrap',
        'animate-team-infinite-scroll',
        pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
        'motion-reduce:animate-none',
      ].join(' ')}
      style={
        {
          ['--team-scroll-duration' as any]: `${desktopSpeedSeconds}s`,
        } as React.CSSProperties
      }
    >
      {/* First pass */}
      <ul className="flex w-max items-stretch gap-10 pr-10">
        {members.map((m, idx) => (
          <li key={`d-${idx}-${m.name}`} className="shrink-0">
            <TeamCardDesktop member={m} priority={idx < 4} />
          </li>
        ))}
      </ul>

      {/* Duplicate pass (aria-hidden) */}
      <ul className="flex w-max items-stretch gap-10 pr-10" aria-hidden="true">
        {members.map((m, idx) => (
          <li key={`ddup-${idx}-${m.name}`} className="shrink-0">
            <TeamCardDesktop member={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}