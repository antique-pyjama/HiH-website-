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
  imageSrc: string;
  imageAlt: string;
  asideLabel: string;
  asideValue: string;
};

export function HeroSection({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  asideLabel,
  asideValue,
}: HeroSectionProps) {
  return (
    <section className="editorial-shell pb-12 pt-4 sm:pb-16">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-surface-low px-6 py-10 sm:px-10 sm:py-14 lg:min-h-[720px] lg:px-14 lg:py-16">
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(70,100,51,0.72),rgba(70,100,51,0.48)_35%,rgba(252,249,246,0.1)_100%)]" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl pt-8 sm:pt-14">
            <p className="eyebrow text-white/70">{eyebrow}</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              {title}
              <span className="mt-2 block font-light italic text-white/82">{accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/78 sm:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CTAButton href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </CTAButton>
              <CTAButton
                href={secondaryCta.href}
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                {secondaryCta.label}
              </CTAButton>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="rounded-[2rem] bg-white/12 px-8 py-8 text-right backdrop-blur-md">
              <p className="text-[112px] font-extrabold leading-none tracking-[-0.06em] text-white/16">
                {asideValue}
              </p>
              <p className="eyebrow -mt-4 text-white/70">{asideLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
