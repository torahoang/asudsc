// Create the functional component

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string; // Optional CSS class
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, className }) => {
  return (
    // Return the standard HTML image element within the component's render
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default ImageComponent;
