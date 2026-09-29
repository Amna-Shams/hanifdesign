/**
 * Small shared helpers.
 */

type ClassValue = string | number | null | undefined | false | ClassValue[];

/**
 * Join conditional class names, dropping anything falsy.
 *
 * @example cn("px-4", isActive && "text-gold") // "px-4 text-gold"
 */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) out.push(nested);
    } else {
      out.push(String(value));
    }
  }

  return out.join(" ");
}

/** Strip a leading "+44"/"0" and spaces so a number is safe to dial or link. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * A `wa.me` deep link, which wants the number in international form with no
 * punctuation: "+44 7901 646 719" -> "https://wa.me/447901646719".
 *
 * Kept next to `toTelHref` because the two always need to agree: a WhatsApp
 * link pointed at a number other than the one published on the page is worse
 * than no link at all.
 */
export function toWhatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("0") ? digits.slice(1) : digits}`;
}
