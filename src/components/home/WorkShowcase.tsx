import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Tile {
  src: string;
  alt: string;
  label: string;
  href: string;
  /** Grid placement; the grid packs densely, so spans never leave holes. */
  className: string;
}

/**
 * A visual strip of finished work, set as an uneven mosaic: one large
 * exterior, a tall floor plan, a wide exterior and a spread of interiors.
 * Each tile links to the service it demonstrates.
 */
const TILES: readonly Tile[] = [
  {
    src: "/home-hero-contemporary-house.webp",
    alt: "Photorealistic render of a contemporary timber-clad house with glazed gables and a terrace",
    label: "Exterior rendering",
    href: "/services/exterior-rendering",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/interior-classic-kitchen-diner-wide.webp",
    alt: "Interior render of a classic kitchen and dining space with a roof lantern",
    label: "Interior visualisation",
    href: "/services/interior-visualisation",
    className: "",
  },
  {
    src: "/floorplan-hero.webp",
    alt: "Furnished 3D floor plan render of a home",
    label: "3D floor plans",
    href: "/services/3d-floor-plans",
    className: "row-span-2",
  },
  {
    src: "/services-hero-dark-timber-house.webp",
    alt: "Render of a contemporary house with a dark metal roof, brick and black timber cladding",
    label: "Exterior rendering",
    href: "/services/exterior-rendering",
    className: "",
  },
  {
    src: "/interior-kitchen-render-island.webp",
    alt: "Kitchen render looking towards a marble island, roof lantern and gold pendant light",
    label: "3D visualisation",
    href: "/services/3d-visualisation",
    className: "",
  },
  {
    src: "/exterior-hero.webp",
    alt: "Photorealistic exterior render of a contemporary home and pool at dusk",
    label: "3D visualisation",
    href: "/services/3d-visualisation",
    className: "col-span-2",
  },
  {
    src: "/interior-classic-dining-room.webp",
    alt: "Interior render of a dining room with a marble table and statement artwork",
    label: "Interior visualisation",
    href: "/services/interior-visualisation",
    className: "",
  },
];

export function WorkShowcase() {
  return (
    <section className="bg-surface-translucent py-10 sm:py-12 lg:py-14" aria-labelledby="work-showcase-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            id="work-showcase-heading"
            title="Our Work in Pictures"
            subtitle="A selection of exterior and interior visuals from our design and visualisation work."
            align="center"
            className="mb-8 lg:mb-10"
          />
        </Reveal>

        <Reveal delay={0.1} amount={0.1}>
          <ul className="grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-4">
            {TILES.map((tile) => (
              <li key={tile.src} className={`group relative overflow-hidden rounded-xl bg-surface-elevated ${tile.className}`}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <Link
                  href={tile.href}
                  className="absolute inset-0 flex items-end justify-between gap-2 p-3 sm:p-4"
                >
                  <span className="text-sm font-medium !text-white sm:text-base">{tile.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{tile.alt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
