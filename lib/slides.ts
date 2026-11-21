import type { Slide } from "@/components/home/HeroSlideshow";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

/**
 * Photos for the home page slideshow, in the order they play.
 * All are free to use under the Unsplash License.
 *
 * To use your own photo, put the file in public/slides and set
 * `src` to its path, for example "/slides/birthday.jpg".
 */
export const heroSlides: Slide[] = [
  {
    src: unsplash("photo-1549465220-1a8b9238cd48"),
    label: "Birthdays",
    alt: "A present wrapped in pink paper and tied with a yellow bow",
    href: "/gift-guides/birthday-gifts"
  },
  {
    src: unsplash("photo-1669028089674-e95d3ba3161c"),
    label: "Christmas",
    alt: "Wrapped gifts under a Christmas tree",
    href: "/gift-guides/christmas-gifts"
  },
  {
    src: unsplash("photo-1766918780914-5df4a5a98c44"),
    label: "Baby showers",
    alt: "Baby clothes hanging on a rack",
    href: "/gift-guides/baby-shower-gifts"
  },
  {
    src: unsplash("photo-1513885535751-8b9238bd345a"),
    label: "Weddings",
    alt: "Wrapped gifts with ribbon",
    href: "/gift-guides/wedding-gifts"
  },
  {
    src: unsplash("photo-1607344645866-009c320b63e0"),
    label: "Anniversaries",
    alt: "Wrapped gifts with ribbon",
    href: "/gift-guides/anniversary-gifts"
  }
];
