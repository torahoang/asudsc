// app/components/HeroHeader.tsx
import React from 'react';
import BackgroundVideo from './BackgroundVideo';
import HeroHeading from './HeroHeading';
import HeroText from './HeroText';

export default function HeroHeader() {
  const videoUrls = {
    mp4: 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-transcode.mp4',
    webm: 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-transcode.webm'
  };

  const posterUrl = 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-poster-00001.jpg';

  return (
    <BackgroundVideo posterUrl={posterUrl} videoUrls={videoUrls}>
      <header 
        id="home" 
        className="hero-overlay"
        style={{ 
          position: 'relative', 
          zIndex: 1,
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          data-w-id="8185329b-a277-0f16-fc52-2b2dc10976db"
          className="centered-container w-container"
          style={{
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          <HeroHeading dataWId="8185329b-a277-0f16-fc52-2b2dc10976dc">
            <strong className="bold-text-3">Google Developer Group</strong>
          </HeroHeading>

          <HeroHeading 
            className="mask"
            dataWId="5c594c49-320a-fda1-35b9-229681bdbc25"
          >
            <strong className="bold-text-5">Arizona State University</strong>
          </HeroHeading>

          <HeroText>
            Community of Software Engineers learning outside the classroom.
          </HeroText>
        </div>
      </header>
    </BackgroundVideo>
  );
}