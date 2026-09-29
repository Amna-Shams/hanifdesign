"use client";

import { Suspense, useEffect, useId, useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  NEWSLETTER_MESSAGES,
  NEWSLETTER_STATUS_PARAM,
  isNewsletterStatus,
  type NewsletterStatus,
} from "@/lib/newsletter";

type Phase =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "done"; status: NewsletterStatus };

const ERROR_STATES: NewsletterStatus[] = ["invalid", "error"];

/**
 * Newsletter signup, progressively enhanced.
 *
 * Without JavaScript the form posts normally and the API redirects back with
 * `?newsletter=<status>`, which this component reads on mount. With JavaScript
 * the submit is intercepted so the visitor gets inline feedback without a page
 * reload. Either path lands on the same messages.
 */
export function NewsletterForm() {
  // `useSearchParams` opts a route into client rendering, so the component that
  // reads it sits behind a Suspense boundary. The fallback is the same form, so
  // there is no visual change and the static HTML still ships a working form.
  return (
    <Suspense fallback={<NewsletterFormBody />}>
      <NewsletterFormWithStatus />
    </Suspense>
  );
}

function NewsletterFormWithStatus() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get(NEWSLETTER_STATUS_PARAM);

  return <NewsletterFormBody initialStatus={isNewsletterStatus(urlStatus) ? urlStatus : null} />;
}

function NewsletterFormBody({ initialStatus = null }: { initialStatus?: NewsletterStatus | null }) {
  const inputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>(
    initialStatus ? { state: "done", status: initialStatus } : { state: "idle" }
  );

  // Strip the status param once it has been read so a refresh does not replay an
  // old message, and so the URL stays clean for sharing.
  useEffect(() => {
    if (!initialStatus) return;
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.hash
    );
  }, [initialStatus]);

  const message =
    phase.state === "done" ? NEWSLETTER_MESSAGES[phase.status] : null;
  const failed = phase.state === "done" && ERROR_STATES.includes(phase.status);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase.state === "submitting") return;

    setPhase({ state: "submitting" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json().catch(() => null);
      const status: NewsletterStatus =
        payload && isNewsletterStatus(payload.status)
          ? payload.status
          : response.ok
            ? "subscribed"
            : "error";

      setPhase({ state: "done", status });
      if (response.ok) setEmail("");
    } catch {
      setPhase({ state: "done", status: "error" });
    }
  }

  const submitting = phase.state === "submitting";

  return (
    <form onSubmit={onSubmit} action="/api/newsletter" method="post" noValidate={false}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={message ? statusId : undefined}
          aria-invalid={failed || undefined}
          className="min-w-0 flex-1 rounded-lg border border-subtle bg-surface-elevated px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {/* Announced by screen readers when the outcome changes. */}
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`mt-2 flex items-start gap-1.5 text-xs ${
          failed ? "text-red-300" : "text-emerald-300"
        } ${message ? "" : "sr-only"}`}
      >
        {message ? (
          <>
            {failed ? (
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>{message}</span>
          </>
        ) : null}
      </p>
    </form>
  );
}
