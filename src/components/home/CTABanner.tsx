import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function CTABanner() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-surface-translucent overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, gold 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
          Have a project in mind?
        </h2>
        <p className="text-secondary text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Let&apos;s work together to create something extraordinary. We&apos;re here to help you turn your ideas into reality.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button variant="secondary" size="lg" className="border-hairline-tint text-primary hover:bg-surface-elevated hover:text-primary" asChild>
            <Link href="/quote">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}