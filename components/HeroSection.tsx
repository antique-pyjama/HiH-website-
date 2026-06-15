import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
  tertiaryCta: {
    href: string;
    label: string;
  };
  imageSrc: string;
  imageAlt: string;
  asideLabel: string;
  asideValue: string;
  highlights: string[];
  metrics: Array<{
    label: string;
    value: string;
  }>;
};

export function HeroSection({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  tertiaryCta,
  imageSrc,
  imageAlt,
  asideLabel,
  asideValue,
  highlights,
  metrics,
}: HeroSectionProps) {
  return (
    <section className="editorial-shell pb-12 pt-4 sm:pb-16">
      <div className="relative overflow-hidden rounded-[2.3rem] bg-surface-low px-6 py-10 sm:px-10 sm:py-14 lg:min-h-[760px] lg:px-14 lg:py-16">
        <div className="absolute inset-0">
          {/* TODO: Replace this hero placeholder with founder-selected warm Hamburg skyline imagery. */}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(47,66,35,0.84),rgba(70,100,51,0.66)_42%,rgba(252,249,246,0.12)_100%)]" />
        </div>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <div className="max-w-4xl pt-8 sm:pt-14">
            <p className="eyebrow text-white/70">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.93] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              {title}
              <span className="mt-2 block font-light italic text-white/86">{accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/86 backdrop-blur-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CTAButton href={primaryCta.href} variant="primary" className="sm:min-w-[220px]">
                {primaryCta.label}
              </CTAButton>
              <CTAButton
                href={secondaryCta.href}
                variant="secondary"
                className="border-white/18 bg-white/10 text-white hover:bg-white/18 sm:min-w-[190px]"
              >
                {secondaryCta.label}
              </CTAButton>
              <CTAButton
                href={tertiaryCta.href}
                variant="secondary"
                className="border-white/18 bg-transparent text-white hover:bg-white/10 sm:min-w-[200px]"
              >
                {tertiaryCta.label}
              </CTAButton>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
              <div className="rounded-[1.65rem] bg-white/70 p-6">
                <p className="eyebrow text-secondary">{asideLabel}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary">
                  {asideValue}
                </h2>
                <p className="mt-3 text-base leading-7 text-foreground-muted">
                  Guided walking tours designed for Muslim travellers who want local insight,
                  smoother planning, and a more comfortable way to discover Hamburg.
                </p>
                <div className="mt-6 space-y-4">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between rounded-[1.25rem] bg-surface-low px-4 py-4"
                    >
                      <span className="text-sm uppercase tracking-[0.16em] text-foreground-soft">
                        {metric.label}
                      </span>
                      <span className="text-base font-semibold tracking-tight text-primary">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
