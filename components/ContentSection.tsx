import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  tone?: "default" | "muted" | "forest" | "sand";
  headingLevel?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
};

const toneStyles = {
  default: "bg-transparent",
  muted: "bg-surface-low",
  forest: "bg-primary",
  sand: "bg-[rgba(143,76,46,0.08)]",
} as const;

export function ContentSection({
  id,
  eyebrow,
  title,
  description,
  action,
  tone = "default",
  headingLevel = "h2",
  className,
  children,
}: ContentSectionProps) {
  const isDark = tone === "forest";
  const HeadingTag = headingLevel;

  return (
    <section id={id} className={cn("section-space", toneStyles[tone], className)}>
      <div className="editorial-shell">
        {eyebrow || title || description || action ? (
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className={cn("eyebrow mb-4", isDark ? "text-white/70" : "text-secondary")}>
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <HeadingTag
                  className={cn(
                    "text-4xl font-extrabold tracking-tight sm:text-5xl",
                    isDark ? "text-white" : "text-primary",
                  )}
                >
                  {title}
                </HeadingTag>
              ) : null}
              {description ? (
                <p
                  className={cn(
                    "mt-5 max-w-2xl text-lg leading-8",
                    isDark ? "text-white/76" : "text-foreground-muted",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
