import React from "react";
import FeatureCard, { type FeatureCardType } from "./feature_card";


const defaultCards: FeatureCardType[] = [
  {
    title: "Hands-on Workshops",
    description:
      "Hands-on Workshops get your feet wet with different tools, languages and platforms every few weeks.",
    image: {
      src: "/images/workshop.jpg",
      alt: "People collaborating at a workshop",
      width: 1200,
      height: 900,
    },
  },
  {
    title: "Résumé Reviews",
    description:
      "Polish the one pager that companies look at for 6 seconds. Come to the résumé review to gain a different perspective on your résumé, and get some tips!",
    image: {
      src: "/images/resume.jpg",
      alt: "Person reviewing a résumé on a laptop",
      width: 1200,
      height: 900,
    },
  },
  {
    title: "Build & Showcase",
    description:
      "Build great things for yourselves or others, with others. Showcase what you've accomplished and all of your great work at the end!",
    image: {
      src: "/images/build&show.jpg",
      alt: "Speaker presenting to an audience",
      width: 1200,
      height: 900,
    },
  },
];

const defaultParagraphs: string[] = [
  "Software Engineering is a broad, rapidly-changing industry — and navigating where and how to start learning can be cumbersome. " +
    "Google Developer Group @ ASU is a community of software engineers looking to learn beyond the classroom. " +
    "We help you identify your passion in the broad field of Software Engineering, and help you learn those technologies to prepare you for the industry ahead.",
];
export default function AboutClubSection({
  heading = "About the Club",
  paragraphs = defaultParagraphs,
  cards = defaultCards,
  className = "",
}) {
  return (
    <section className={className} aria-label={heading}>
      {/* Outer container */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Make the about text match the cards row width; pad 20px on both sides */}
        <div className="mx-auto w-full max-w-6xl px-[20px] text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {heading}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
            {paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </div>

        {/* Cards span the same max width (start of card 1 to end of card 3) */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {cards.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}