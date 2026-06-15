import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { siteSettings } from "@/lib/content";

const footerLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/booking", label: "Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/impressum", label: "Impressum" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[linear-gradient(180deg,rgba(70,100,51,0.09),rgba(252,249,246,0.9))]">
      <div className="editorial-shell py-14">
        <div className="grid gap-8 rounded-[2rem] bg-white/70 p-8 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="space-y-5">
            <p className="font-heading text-3xl font-extrabold tracking-tight text-primary">
              {siteSettings.siteName}
            </p>
            <p className="max-w-xl text-base leading-7 text-foreground-muted">
              {siteSettings.description}
            </p>
            <div className="space-y-1 text-sm text-foreground-soft">
              <p>{siteSettings.contactEmail}</p>
              <p>{siteSettings.contactWhatsApp} · WhatsApp inquiries</p>
              <p>{siteSettings.contactLocation}</p>
            </div>
            <div className="pt-2">
              <CTAButton href="/booking" variant="primary">
                Choose a time slot
              </CTAButton>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:justify-items-end">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground-muted transition hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 text-sm text-foreground-soft sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteSettings.siteName}. All rights reserved.
          </p>
          <p>
            Booking, payment, and email confirmations currently use placeholder logic pending real
            provider integration.
          </p>
        </div>
      </div>
    </footer>
  );
}
