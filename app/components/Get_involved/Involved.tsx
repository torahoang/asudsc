import GetInvolvedImage from "./GetImage";
import GetInvolvedText from "./GetText";
import type { SocialLink } from "./SocialLinks";

interface GetInvolvedSectionProps {
  heading?: string;
  title?: string;
  description?: string;

  discordHref?: string;
  sunDevilCentralHref?: string;

  instagramHref?: string;
  xHref?: string;
  facebookHref?: string;
  mediumHref?: string;
  linkedinHref?: string;
  youtubeHref?: string;

  illustrationSrc?: string;
  illustrationAlt?: string;
}

export default function GetInvolvedSection({
  heading = "Get Involved",
  title = "Google Developer Group @ ASU",
  description = "is free and open to all students of Arizona State University. Engage with our club through Discord and Sun Devil Central. Follow us on Instagram and Twitter/X.",

  discordHref = "https://discord.com/invite/E8rZATvPD8",
  sunDevilCentralHref = "https://sundevilcentral.eoss.asu.edu/GDSC/club_signup",

  instagramHref = "https://www.instagram.com/asu.dsc/",
  xHref = "https://x.com/asudsc",
  facebookHref = "https://www.facebook.com/asudsc",
  linkedinHref = "https://www.linkedin.com/company/asudsc/posts/?feedView=all",
  youtubeHref = "https://www.youtube.com/@asudsc/streams",

  illustrationSrc = "/images/heroimage.png",
  illustrationAlt = "Community illustration",
}: GetInvolvedSectionProps) {
  const socials: SocialLink[] = [
    {
      label: "Instagram",
      href: instagramHref,
      iconSrc: "/images/insta.png",
      iconAlt: "Instagram",
    },
    {
      label: "X",
      href: xHref,
      iconSrc: "/images/twitter.png",
      iconAlt: "X",
    },
    {
      label: "Facebook",
      href: facebookHref,
      iconSrc: "/images/fb.png",
      iconAlt: "Facebook",
    },
    {
      label: "Email",
      href: linkedinHref, // (kept as you had it)
      iconSrc: "/images/email.png",
      iconAlt: "Email",
    },
    {
      label: "LinkedIn",
      href: linkedinHref,
      iconSrc: "/images/linkedin.png",
      iconAlt: "LinkedIn",
    },
    {
      label: "YouTube",
      href: youtubeHref,
      iconSrc: "/images/yticon.png",
      iconAlt: "YouTube",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <GetInvolvedText
            heading={heading}
            title={title}
            description={description}
            discordHref={discordHref}
            sunDevilCentralHref={sunDevilCentralHref}
            socials={socials}
          />

          <GetInvolvedImage
            illustrationSrc={illustrationSrc}
            illustrationAlt={illustrationAlt}
          />
        </div>
      </div>
    </section>
  );
}