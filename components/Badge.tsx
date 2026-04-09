import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-high px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
      {children}
    </span>
  );
}
