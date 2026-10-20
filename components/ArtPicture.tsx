import { getImageProps } from "next/image";

type Shot = { src: string; width: number; height: number };

/** One picture that swaps to the phone screenshot on small screens, so each visitor downloads one image instead of both. */
export function ArtPicture({ wide, narrow, alt, eager = false, priority = false, wideSizes, narrowSizes, breakpoint = 700 }: { wide: Shot; narrow: Shot; alt: string; eager?: boolean; priority?: boolean; wideSizes: string; narrowSizes: string; breakpoint?: number }) {
  const { props: { srcSet: wideSet } } = getImageProps({ src: wide.src, width: wide.width, height: wide.height, alt, sizes: wideSizes });
  const { props: { srcSet: narrowSet, ...rest } } = getImageProps({ src: narrow.src, width: narrow.width, height: narrow.height, alt, sizes: narrowSizes, loading: eager ? "eager" : "lazy", fetchPriority: priority ? "high" : "auto" });
  return <picture>
    <source media={`(min-width: ${breakpoint + 1}px)`} srcSet={wideSet} sizes={wideSizes} />
    <source media={`(max-width: ${breakpoint}px)`} srcSet={narrowSet} sizes={narrowSizes} />
    <img {...rest} alt={alt} />
  </picture>;
}
