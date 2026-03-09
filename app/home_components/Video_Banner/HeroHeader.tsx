import React from 'react';
import BackgroundVideo from './Banner_parts/BackgroundVideo';
import HeroHeading from './Banner_parts/HeroHeading';
import HeroText from './Banner_parts/HeroText';

export default function HeroHeader() {
  const videoUrls = {
    mp4: 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-transcode.mp4',
    webm: 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-transcode.webm'
  };

  const posterUrl = 'https://cdn.prod.website-files.com/61ef5947f465385ddf91bef0/61f0b1cb94ace368d470b71d_GDSC_hero_bg-poster-00001.jpg';

  return (
    <div className="pt-[79px]">
    <BackgroundVideo posterUrl={posterUrl} videoUrls={videoUrls}>
      <header
        id="home"
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] px-4 sm:px-6 md:px-10 py-10"
      >
        <div className="text-center max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto w-full">
          <HeroHeading
            dataWId="8185329b-a277-0f16-fc52-2b2dc10976dc"
            className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight"
          >
            <strong className="bold-text-4">Google Developer Group</strong>
          </HeroHeading>

          <HeroHeading
            className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight"
            dataWId="5c594c49-320a-fda1-35b9-229681bdbc25"
          >
            <strong className="bold-text-4">Arizona State University</strong>
          </HeroHeading>

          <HeroText>
            Community of Software Engineers learning outside the classroom.
          </HeroText>
        </div>
      </header>
    </BackgroundVideo>
    </div>
  );
}