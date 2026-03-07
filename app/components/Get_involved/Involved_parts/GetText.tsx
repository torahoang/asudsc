import ActionButton from "./ActionButton";
import SocialLinks, { SocialLink } from "./SocialLinks";

export default function GetInvolvedText({
  heading,
  title,
  description,
  discordHref,
  sunDevilCentralHref,
  socials,
}: {
  heading: string;
  title: string;
  description: string;
  discordHref: string;
  sunDevilCentralHref: string;
  socials: SocialLink[];
}) {
  return (
    <div className="order-2 space-y-6 lg:order-1">
      <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {heading}
      </h2>

      <p className="max-w-xl text-base leading-7 text-slate-600">
        <span className="font-semibold text-slate-900">{title}</span>{" "}
        {description}
      </p>

      {/* Keep these two buttons unchanged */}
      <div className="flex flex-wrap gap-4 pt-2">
        <ActionButton href={discordHref} variant="primary">
          Join our Discord
        </ActionButton>

        <ActionButton href={sunDevilCentralHref} variant="secondary">
          Join on SunDevilCentral
        </ActionButton>
      </div>

      <SocialLinks socials={socials} />
    </div>
  );
}