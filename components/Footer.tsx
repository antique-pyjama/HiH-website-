import Link from "next/link";
import { siteSettings } from "@/lib/content";

const footerLinks = [
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/impressum", label: "Impressum" },
];

export function Footer() {
  return (
    <footer className="bg-[rgba(70,100,51,0.08)]">
      <div className="editorial-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="font-heading text-2xl font-extrabold tracking-tight text-primary">
              {siteSettings.siteName}
            </p>
            <p className="max-w-xl text-base leading-7 text-foreground-muted">
              {siteSettings.description}
            </p>
            <p className="text-sm text-foreground-soft">
              {siteSettings.contactEmail} · {siteSettings.contactLocation}
            </p>
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
        <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(196,200,187,0.3)] pt-6 text-sm text-foreground-soft sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteSettings.siteName}. All rights reserved.
          </p>
          <p>Built for Vercel-ready launch with direct FareHarbor booking links.</p>
        </div>
      </div>
    </footer>
  );
}
