import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { MobileNav } from "@/components/MobileNav";
import { siteSettings } from "@/lib/content";

const navItems = [
  { href: "/tours", label: "Tours" },
  { href: "/booking", label: "Booking" },
  { href: "/about", label: "About" },
  { href: "/information", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="editorial-shell pt-4">
        <div className="glass-panel flex items-center justify-between rounded-[1.7rem] border border-white/50 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xs font-bold uppercase tracking-[0.22em] text-white">
              HIH
            </span>
            <span className="hidden sm:block">
              <span className="block font-heading text-lg font-extrabold tracking-tight text-primary">
                {siteSettings.siteName}
              </span>
              <span className="block text-xs uppercase tracking-[0.24em] text-foreground-soft">
                Muslim-friendly Hamburg walks
              </span>
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-primary sm:hidden">
              {siteSettings.siteName}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground-muted transition hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <CTAButton href="/booking" variant="primary" eventName="header_booking_click">
              Book a tour
            </CTAButton>
          </div>

          <div className="lg:hidden">
            <MobileNav navItems={navItems} bookHref="/booking" />
          </div>
        </div>
      </div>
    </header>
  );
}
