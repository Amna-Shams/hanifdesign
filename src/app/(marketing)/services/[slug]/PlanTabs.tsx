"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Hammer, House, LayoutGrid, Palette, Play, Rotate3d, Sofa } from "lucide-react";

export type TabKind = "slider" | "tour" | "plan";
export type TabIcon = "sofa" | "palette" | "hammer" | "house" | "rotate" | "grid";

export interface PlanTab {
  id: string;
  label: string;
  icon: TabIcon;
  kind: TabKind;
  title: string;
  text: string;
  /** Slider: the photo used for both halves. Tour: the panorama. Plan: the render. */
  image: string;
  alt: string;
}

const ICONS = {
  sofa: Sofa,
  palette: Palette,
  hammer: Hammer,
  house: House,
  rotate: Rotate3d,
  grid: LayoutGrid,
} as const;

function BeforeAfter({ image, alt }: { image: string; alt: string }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-4xl select-none overflow-hidden bg-[#eee]">
      <Image src={image} alt={alt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
      {/* "Before" half. Placeholder treatment: the same photo, desaturated. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover grayscale brightness-95"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px bg-white shadow"
        style={{ left: `${position}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setPosition(Number(event.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function Tour({ image, alt }: { image: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-4xl overflow-hidden bg-black">
      {loaded ? (
        <div className="absolute inset-0 cursor-grab overflow-x-auto active:cursor-grabbing">
          <div className="relative h-full w-[260%]">
            <Image src={image} alt={alt} fill sizes="260vw" className="object-cover" />
          </div>
        </div>
      ) : (
        <>
          <Image src={image} alt={alt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover opacity-80" />
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#1b1b1b]">
              <Play className="h-6 w-6 translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
              Click to load 360° view
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export function PlanTabs({
  tabs,
  defaultId,
  ariaLabel,
}: {
  tabs: readonly PlanTab[];
  defaultId: string;
  ariaLabel: string;
}) {
  const [activeId, setActiveId] = useState(defaultId);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[tabs.length - 1];

  return (
    <div>
      {/* Tab bar */}
      <div className="bg-[#4a4a4a]">
        <div role="tablist" aria-label={ariaLabel} className="mx-auto flex max-w-5xl flex-wrap justify-center">
          {tabs.map((tab) => {
            const Icon = ICONS[tab.icon];
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="plan-panel"
                type="button"
                onClick={() => setActiveId(tab.id)}
                className="relative flex min-h-11 w-1/3 flex-col items-center gap-2 px-2 pb-6 pt-7 text-[0.7rem] font-semibold uppercase leading-tight tracking-wide !text-white transition-opacity hover:opacity-80 sm:w-auto sm:min-w-[7.5rem] sm:flex-1"
              >
                <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-center">{tab.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-1/2 h-0 w-0 -translate-x-1/2 border-x-[14px] border-b-[14px] border-x-transparent border-b-white"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel */}
      <div
        id="plan-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="bg-white px-4 py-14 sm:px-6 sm:py-20"
      >
        <h2 className="text-center font-heading text-2xl font-light uppercase tracking-wide sm:text-[1.75rem]">
          {active.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[0.8125rem]">{active.text}</p>

        <div className="mt-10">
          {active.kind === "slider" && <BeforeAfter key={active.id} image={active.image} alt={active.alt} />}
          {active.kind === "tour" && <Tour key={active.id} image={active.image} alt={active.alt} />}
          {active.kind === "plan" && (
            <div className="relative mx-auto aspect-[3/2] w-full max-w-4xl bg-white">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
