import Link from "next/link";
import ImageComponent from "../../imageHolder";

export type SocialLink = {
  label: string;
  href: string;
  iconSrc: string; // from /public
  iconAlt: string;
};

export default function SocialLinks({ socials }: { socials: SocialLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-4 sm:gap-4 md:gap-6">
      {socials.map((s) => (
        <Link
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className="group inline-flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          <span className="relative h-9 w-9 opacity-80 transition group-hover:opacity-100 sm:h-10 sm:w-10">
            <ImageComponent
              src={s.iconSrc}
              alt={s.iconAlt}
              width={50}
              height={50}
              className="h-6 w-6 object-contain sm:h-7 sm:w-7 md:h-8 md:w-8"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}