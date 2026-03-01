import React from 'react';

interface BackgroundVideoProps {
  posterUrl: string;
  videoUrls: { mp4: string; webm: string; };
  children?: React.ReactNode;
}

export default function BackgroundVideo({ posterUrl, videoUrls, children }: BackgroundVideoProps) {
  return (
    <div
      data-poster-url={posterUrl}
      data-video-urls={`${videoUrls.mp4},${videoUrls.webm}`}
      data-autoplay="true"
      data-loop="true"
      data-wf-ignore="true"
      className="relative w-full overflow-hidden"
      style={{ borderRadius: 'clamp(400px, 5vw, 400px)' }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        data-wf-ignore="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ backgroundImage: `url("${posterUrl}")` }}
      >
        <source src={videoUrls.mp4} type="video/mp4" />
        <source src={videoUrls.webm} type="video/webm" />
      </video>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}