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
    "bg-[linear-gradient(135deg,var(--primary),var(--primary-strong))] text-white shadow-soft hover:brightness-105",
  secondary: "ghost-outline bg-transparent text-secondary hover:bg-white/70",
  tertiary:
    "bg-transparent px-0 text-tertiary underline decoration-transparent underline-offset-4 hover:decoration-current",
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
      ? "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] transition"
      : "inline-flex min-h-12 items-center rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

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
