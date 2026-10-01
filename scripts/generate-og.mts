/**
 * Generates public/og-image.jpg — the social share card.
 *
 * Built programmatically rather than hand-designed so the branding stays tied to
 * the real logo and the site's actual typefaces. The headline is "Hanif Design &
 * Consultancy", matching the registered logo artwork, the site metadata and the
 * footer — the previous card said "Hanif Planning & Design", which appeared
 * nowhere else in the project.
 *
 * Palette sampled from the existing card and the logo so the replacement is
 * visually continuous: navy #0a2540 base, gold #f2a823 accent, slate #567087.
 *
 * Usage: npx tsx generate-og.mts
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const W = 1200;
const H = 630;

const NAVY = "#0a2540";
const GOLD = "#f2a823";
const WHITE = "#ffffff";
const SLATE = "#567087";

/**
 * The site loads Poppins and Inter via next/font, but those are compiled into
 * the CSS and not available as font files at generation time. Fetch the same
 * weights from Google Fonts once and cache them under .og-fonts/ so the card
 * renders in the real brand typefaces rather than a fallback.
 */
const FONT_DIR = ".og-fonts";
const FONT_FILES: Record<string, string> = {
  "poppins-700.ttf":
    "https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf",
  "inter-400.ttf":
    "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf",
};

if (!existsSync(FONT_DIR)) mkdirSync(FONT_DIR);

async function font(name: string): Promise<string> {
  const path = join(FONT_DIR, name);
  if (!existsSync(path)) {
    const res = await fetch(FONT_FILES[name]);
    if (!res.ok) throw new Error(`could not download ${name}: HTTP ${res.status}`);
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  }
  return readFileSync(path).toString("base64");
}

const poppins700 = await font("poppins-700.ttf");
const inter400 = await font("inter-400.ttf");

const face = (b64: string, family: string, weight: number) => `
  <style><![CDATA[
  @font-face {
    font-family: '${family}';
    src: url(data:font/ttf;base64,${b64}) format('truetype');
    font-weight: ${weight};
  }
  ]]></style>`;

/**
 * The logo is stored as WebP, which librsvg (the SVG rasteriser sharp uses)
 * cannot decode inside `<image>`. Re-encode to PNG first — PNG is lossless from
 * this source, so the plate still shows the exact registered artwork.
 */
const logoPng = await sharp("public/logo.webp").png().toBuffer();
const logoB64 = logoPng.toString("base64");

/** Faint blueprint grid, matching the site-wide wallpaper. */
const grid = Array.from({ length: H / 30 }, (_, y) =>
  Array.from({ length: W / 30 }, (_, x) =>
    x % 4 === 0 || y % 4 === 0
      ? `<rect x="${x * 30}" y="${y * 30}" width="30" height="30" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>`
      : ""
  ).join("")
).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${face(poppins700, "Poppins", 700)}
  ${face(inter400, "Inter", 400)}

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d2c4d"/>
      <stop offset="55%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#071c30"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.35" r="0.6">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${grid}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Top brand rule -->
  <rect x="0" y="0" width="${W}" height="7" fill="${GOLD}"/>

  <!-- Logo plate: the logo art is black on white, so it is mounted on white -->
  <g transform="translate(88 196)">
    <rect x="0" y="0" width="300" height="240" rx="16" fill="#ffffff"/>
    <image href="data:image/png;base64,${logoB64}"
           x="26" y="34" width="248" height="172"
           preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Wordmark -->
  <g transform="translate(452 196)">
    <text x="0" y="58" font-family="Poppins" font-weight="700" font-size="52"
          fill="${WHITE}" letter-spacing="-0.5">Hanif Design</text>
    <text x="0" y="118" font-family="Poppins" font-weight="700" font-size="52"
          fill="${GOLD}" letter-spacing="-0.5">&amp; Consultancy</text>

    <rect x="0" y="146" width="76" height="5" fill="${GOLD}"/>

    <text x="0" y="200" font-family="Inter" font-weight="400" font-size="25"
          fill="#d7e0ea">Planning consultancy · Birmingham</text>
  </g>

  <!-- Service strip -->
  <text x="452" y="470" font-family="Inter" font-weight="400" font-size="21"
        fill="#b9c6d4">Planning Applications · Permitted Development · Appeals</text>
  <text x="452" y="504" font-family="Inter" font-weight="400" font-size="21"
        fill="#b9c6d4">Design &amp; Access Statements · Pre-Application Advice</text>

  <!-- Trust line -->
  <rect x="88" y="536" width="4" height="34" fill="${GOLD}"/>
  <text x="106" y="561" font-family="Inter" font-weight="400" font-size="22"
        fill="${GOLD}">30+ Years Experience · 500+ Projects Delivered</text>

  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="${SLATE}" fill-opacity="0.5"/>
</svg>`;

const out = await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toBuffer();

writeFileSync("public/og-image.jpg", out);
const meta = await sharp(out).metadata();
console.log(
  `wrote public/og-image.jpg  ${meta.width}x${meta.height}  ${(out.length / 1024).toFixed(1)} KB`
);
