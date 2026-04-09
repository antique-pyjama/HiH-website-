import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { MobileNav } from "@/components/MobileNav";
import { siteSettings } from "@/lib/content";

const navItems = [
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/information", label: "FAQ / Information" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="editorial-shell pt-4">
        <div className="glass-panel flex items-center justify-between rounded-[1.6rem] px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="font-heading text-lg font-extrabold tracking-tight text-primary sm:text-xl"
          >
            {siteSettings.siteName}
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
            <CTAButton
              href={siteSettings.primaryBookingUrl}
              variant="primary"
              external
              eventName="header_booking_click"
            >
              Book now
            </CTAButton>
          </div>

          <div className="lg:hidden">
            <MobileNav navItems={navItems} bookHref={siteSettings.primaryBookingUrl} />
          </div>
        </div>
      </div>
    </header>
  );
}
