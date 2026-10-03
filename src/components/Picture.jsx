import { imageInfo, imageSrcSet, imageUrl } from "../images";

// Responsive image: AVIF with a WebP fallback, sized by `sizes`.
// Extra props (loading, fetchPriority, ...) are passed to the <img>.
const Picture = ({ name, alt, sizes, className, ...imgProps }) => {
  const { width, height } = imageInfo(name);

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={imageSrcSet(name, "avif")}
        sizes={sizes}
      />
      <img
        className={className}
        src={imageUrl(name)}
        srcSet={imageSrcSet(name, "webp")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        decoding="async"
        {...imgProps}
      />
    </picture>
  );
};

export default Picture;
