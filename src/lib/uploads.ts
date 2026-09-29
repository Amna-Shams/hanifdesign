/**
 * Uploaded-file handling for the quote form.
 *
 * Attachments are delivered by email (see the Resend call in the quote route),
 * which avoids standing up object storage for a handful of drawings per enquiry.
 * The bytes are streamed straight into that email; nothing is stored on the site.
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB per file
export const MAX_FILES = 5;

export const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".dwg"] as const;

export const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/vnd.dwg",
  "image/x-dwg",
  "application/acad",
  "application/octet-stream", // DWG from some browsers has no useful MIME type
] as const;

export type AttachmentMeta = {
  filename: string;
  size: number;
  type: string;
};

export type RejectedFile = {
  filename: string;
  reason: string;
};

export function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lower.endsWith(extension));
}

/**
 * Resolves the attachments a visitor actually attached, rejecting anything that
 * fails validation. Returns the accepted files and a per-file reason list so the
 * form can tell the visitor precisely what was dropped.
 */
export function collectUploads(
  entries: FormDataEntryValue[],
): { accepted: File[]; rejected: RejectedFile[] } {
  const accepted: File[] = [];
  const rejected: RejectedFile[] = [];
  let seenSlots = 0;

  for (const entry of entries) {
    if (typeof entry === "string") continue;

    seenSlots += 1;
    if (seenSlots > MAX_FILES) {
      rejected.push({ filename: entry.name, reason: `Only the first ${MAX_FILES} files are sent` });
      continue;
    }

    if (entry.size === 0) continue; // empty file input placeholder
    if (entry.size > MAX_FILE_BYTES) {
      rejected.push({ filename: entry.name, reason: "Larger than the 10MB limit" });
      continue;
    }
    if (!hasAllowedExtension(entry.name)) {
      rejected.push({
        filename: entry.name,
        reason: `Unsupported type (${ALLOWED_EXTENSIONS.join(", ")})`,
      });
      continue;
    }

    accepted.push(entry);
  }

  return { accepted, rejected };
}

export function toMeta(file: File): AttachmentMeta {
  return { filename: file.name, size: file.size, type: file.type || "application/octet-stream" };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
