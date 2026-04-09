"use client";

import Link from "next/link";
import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";

type MobileNavProps = {
  navItems: Array<{
    href: string;
    label: string;
  }>;
  bookHref: string;
};

export function MobileNav({ navItems, bookHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-low text-primary"
      >
        <span className="text-2xl">{open ? "×" : "☰"}</span>
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-[calc(100%+0.75rem)] rounded-[1.6rem] bg-panel p-5 shadow-soft">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground-muted transition hover:bg-surface-low hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5">
            <CTAButton
              href={bookHref}
              variant="primary"
              external
              className="w-full justify-center"
              eventName="mobile_menu_booking_click"
            >
              Book now
            </CTAButton>
          </div>
        </div>
      ) : null}
    </>
  );
}
