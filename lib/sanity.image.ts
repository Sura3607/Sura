import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/lib/sanity.client";

const builder = imageUrlBuilder({ dataset, projectId });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
