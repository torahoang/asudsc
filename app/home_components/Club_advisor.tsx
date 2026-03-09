import ImageComponent from "./imageHolder";

export type Advisor = {
  name: string;
  title: string; // e.g. "Club Advisor"
  imageSrc: string;
  imageAlt: string;
};

const DEFAULT_ADVISORS: Advisor[] = [
  {
    name: "Professor Adil Ahmad",
    title: "Club Advisor",
    imageSrc: "/images/team/Adil.png",
    imageAlt: "Professor Adil Ahmad",
  },
];

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Image holder */}
      <div className="relative">
        <div className="h-35 w-35 overflow-hidden rounded-full border-2 border-neutral-500/70 sm:h-56 sm:w-56">
          <ImageComponent
            src={advisor.imageSrc}
            alt={advisor.imageAlt}
            width={250}
            height={250}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="mt-8 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-xl">
        {advisor.name}
      </h3>
      <p className="mt-2 text-base text-neutral-600 sm:text-lg">
        {advisor.title}
      </p>
    </div>
  );
}

export default function ClubAdvisorsSection({
  advisors = DEFAULT_ADVISORS,
  heading = "Club Advisors",
  className = "",
}: {
  advisors?: Advisor[];
  heading?: string;
  className?: string;
}) {
  return (
    <section className={`w-full ${className}`}>
      {/* Container encapsulating the whole thing */}
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-14 flex flex-col items-center justify-center gap-12">
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.name} advisor={advisor} />
          ))}
        </div>
      </div>
    </section>
  );
}