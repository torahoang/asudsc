import ImageComponent from "../../imageHolder";

export default function GetInvolvedImage({
  illustrationSrc,
  illustrationAlt,
}: {
  illustrationSrc: string;
  illustrationAlt: string;
}) {
  return (
    <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
      <div className="relative w-full max-w-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <ImageComponent
            src={illustrationSrc}
            alt={illustrationAlt}
            width={1200}
            height={900}
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}