"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Large image with previous/next arrows and a clickable thumbnail strip. */
export function ExteriorGallery({ images }: { images: readonly { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (delta: number) => setIndex((current) => (current + delta + count) % count);

  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1b1b1b] shadow transition-colors hover:bg-white";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="relative aspect-[3/2] overflow-hidden bg-[#eee]">
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover"
        />
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${arrow} left-3`}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${arrow} right-3`}>
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative block aspect-[3/2] w-full overflow-hidden bg-[#eee] transition-opacity ${
                i === index ? "opacity-100 ring-2 ring-[#b8865b]" : "opacity-60 hover:opacity-90"
              }`}
            >
              <Image src={image.src} alt="" fill sizes="(min-width: 896px) 290px, 33vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
