"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/constants";

interface ServicesDropdownProps {
  label: string;
  active: boolean;
}

/**
 * "Services" nav item that opens a list of every service on hover or keyboard
 * focus. The label itself still links to the services index, so a click works
 * on touch devices too. A short close delay stops the panel flickering shut as
 * the pointer crosses the gap between the label and the list.
 */
export function ServicesDropdown({ label, active }: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hide();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/services"
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        className={[
          "group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 xl:px-4",
          active || open
            ? "bg-primary-light text-primary"
            : "text-secondary hover:bg-primary-light/60 hover:text-primary",
        ].join(" ")}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span
          aria-hidden="true"
          className={[
            "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-gold xl:inset-x-4",
            "transition-transform duration-300 ease-out",
            active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
        />
      </Link>

      {open ? (
        <div className="absolute left-0 top-full z-50 w-72 pt-2">
          <ul className="overflow-hidden rounded-lg border border-subtle bg-background py-2 shadow-xl">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-secondary transition-colors hover:bg-primary-light/60 hover:text-gold"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
