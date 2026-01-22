// app/components/BackgroundVideo.tsx
import React from 'react';

interface BackgroundVideoProps {
  posterUrl: string;
  videoUrls: { mp4: string; webm: string; };
  children?: React.ReactNode;
  height?: string; // Add this
}

export default function BackgroundVideo({ posterUrl, videoUrls, children, height  }: BackgroundVideoProps) {
  return (
    <div
      data-poster-url={posterUrl}
      data-video-urls={`${videoUrls.mp4},${videoUrls.webm}`}
      data-autoplay="true"
      data-loop="true"
      data-wf-ignore="true"
      className="background-video w-background-video w-background-video-atom"
        style={{ 
            position: 'relative',
            width: '100%',
            minHeight: height, // Use prop
            overflow: 'hidden',
            borderRadius: '400px'
      }}
    >
      <video
        id="fd8c5bdd-ea2b-c93c-102a-3a9bceff88e9-video"
        autoPlay
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        style={{
          backgroundImage: `url("${posterUrl}")`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src={videoUrls.mp4} data-wf-ignore="true" type="video/mp4" />
        <source src={videoUrls.webm} data-wf-ignore="true" type="video/webm" />
      </video>
      {children}
    </div>
  );
}