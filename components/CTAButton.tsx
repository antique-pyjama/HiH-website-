"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  external?: boolean;
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean>;
};

const variantStyles = {
  primary:
    "bg-[linear-gradient(135deg,var(--primary),var(--primary-strong))] text-white shadow-soft hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "ghost-outline bg-white/70 text-primary hover:-translate-y-0.5 hover:bg-white",
  tertiary:
    "bg-transparent px-0 text-secondary underline decoration-[rgba(143,76,46,0.16)] underline-offset-6 hover:decoration-current",
} as const;

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external,
  eventName = "cta_click",
  eventPayload,
}: CTAButtonProps) {
  const baseStyles =
    variant === "tertiary"
      ? "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] transition duration-200"
      : "inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

  const classes = cn(baseStyles, variantStyles[variant], className);
  const isExternal = external ?? (href.startsWith("http") || href.startsWith("mailto:"));

  const handleClick = () => {
    trackEvent(eventName, {
      href,
      ...eventPayload,
    });
  };

  if (isExternal) {
    return (
      <a href={href} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={handleClick}>
      {children}
    </Link>
  );
}
