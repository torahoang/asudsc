//courtesy of https://github.com/ashishgogula/coverflow.git 
"use client"
import React from "react";
import { CoverFlow, type CoverFlowItem } from "./coverflow";

const EventItems: CoverFlowItem[] = [
  //spring 2025
  { id: 1, image: "/images/Events/pro-web-scraping-go.png", title: "Feb 26th, 2026" },
  { id: 2, image: "/images/Events/semantic-search-engine.png", title: "Feb 12th, 2026" },
  //fall 2025
  { id: 3, image: "/images/Events/gdg-x-swe-n8n.png", title: "Nov 13th, 2025" },
  { id: 4, image: "/images/Events/introduction-to-firebase.png", title: "Nov 10th, 2025" },
  { id: 5, image: "/images/Events/internship-panel.png", title: "Nov 6th, 2025" },
  { id: 6, image: "/images/Events/cracking-ml-interviews.png", title: "Oct 27th, 2025" },
  { id: 7, image: "/images/Events/dev-portfolio-nextjs-vercel.png", title: "Oct 23rd, 2025" },
  { id: 8, image: "/images/Events/swaroop-mishra-fireside-chat.png", title: "Oct 16th, 2025" },
  { id: 9, image: "/images/Events/vibe-coding-101-cursor.png", title: "Oct 9th, 2025" },
  { id: 10, image: "/images/Events/google-at-asu.png", title: "Oct 2nd, 2025" },
  { id: 11, image: "/images/Events/info-session-fall-2025.png", title: "Sep 24th, 2025" },
  // spring 2025
  { id: 12, image: "/images/Events/ai-agent-vertex-ai.png", title: "Apr 17th, 2025" },
  { id: 13, image: "/images/Events/serverless-web-applications.png", title: "Mar 27th, 2025" },
  { id: 14, image: "/images/Events/intel-speaker-event.png", title: "Feb 27th, 2025" },
  { id: 15, image: "/images/Events/mobile-app-development.png", title: "Feb 13th, 2025" },
  { id: 16, image: "/images/Events/wireside-chat-3.png", title: "Feb 6th, 2025" },
  { id: 17, image: "/images/Events/introduction-to-backend.png", title: "Jan 30th, 2025" },
  // fall 2024
  // { id: 18, image: "/images/Events/amazon-data-scientist-speaker.png", title: "Nov 7th, 2024" },
  // { id: 19, image: "/images/Events/web-dev-frontend-basics.png", title: "Oct 31st, 2024" },
  // { id: 20, image: "/images/Events/wireside-chat-2.png", title: "Oct 24th, 2024" },
  // { id: 21, image: "/images/Events/google-cloud-hero.png", title: "Oct 16th, 2024" },
  // { id: 22, image: "/images/Events/wireside-chat-1.png", title: "Oct 3rd, 2024" },
  // { id: 23, image: "/images/Events/introduction-to-figma.png", title: "Sep 26th, 2024" },
  // { id: 24, image: "/images/Events/waymo-info-session.png", title: "Sep 3rd, 2024" },
  // //spring 2024
  // { id: 25, image: "/images/Events/intro-nextjs-vercel.png", title: "Apr 5th, 2024" },
  // { id: 26, image: "/images/Events/intro-to-apis.png", title: "Mar 22nd, 2024" },
  // { id: 27, image: "/images/Events/intro-to-containers.png", title: "Feb 26th, 2024" },
  // { id: 28, image: "/images/Events/firebase-x-gemini.png", title: "Feb 19th, 2024" },
  // //fall 2023
  // { id: 29, image: "/images/Events/paypal-meet-greet.png", title: "Oct 18th, 2023" },
  // { id: 30, image: "/images/Events/intro-to-android.png", title: "Sep 29th, 2023" },
  // { id: 31, image: "/images/Events/intro-to-machine-learning.png", title: "Nov 3rd, 2023" },
  // { id: 32, image: "/images/Events/intro-to-flutter.png", title: "Nov 17th, 2023" },
  // //spring 2023
  // { id: 33, image: "/images/Events/dsa-resume-review.png", title: "Mar 24th, 2023" },
  // // fall 2022
  // { id: 34, image: "/images/Events/intro-to-ios.png", title: "Nov 17th, 2022" },
  // //spring 2022
  // { id: 35, image: "/images/Events/intro-to-git.png", title: "Apr 1st, 2022" },
  // { id: 36, image: "/images/Events/linux-and-python.png", title: "Mar 18th, 2022" },
  // { id: 37, image: "/images/Events/react-web-development.png", title: "Feb 25th, 2022" },
  // { id: 38, image: "/images/Events/intro-to-nodejs.png", title: "Feb 18th, 2022" },
];

export default function CoverFlowDemo() {
  return (
    <div className="w-full">
      <h2 className="mb-3 text-center text-4xl font-semibold">
        Check out our events!
      </h2>

      <div className="h-[400px] w-full border-b border-border/40">
        <CoverFlow
          items={EventItems}
          itemWidth={250}
          itemHeight={250}
          initialIndex={0}
          enableScroll={true}
          centerGap={180}
          stackSpacing={60}
          enableReflection={true}
        />
      </div>
    </div>
  );
}