import React from "react";
import ImageComponent from "../imageHolder";

export type FeatureCardType = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
  };
};

export default function FeatureCard({ card }: { card: FeatureCardType }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100 shadow-sm ring-1 ring-black/5">
        <div className="relative aspect-[4/3] w-full">
          <ImageComponent
            src={card.image.src}
            alt={card.image.alt}
            width={card.image.width}
            height={card.image.height}
            priority={card.image.priority ?? false}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        {card.description}
      </p>
    </article>
  );
}