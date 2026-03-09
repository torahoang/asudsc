import Image from 'next/image'

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function ImageComponent({ 
  src, 
  alt, 
  className,
  width,
  height,
  priority = false
}: ImageComponentProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}