import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AdUnit } from "./AdUnit";
import { PeelMark } from "./PeelMark";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { APP_NAME } from "@/lib/constants";
import { CONTACT_EMAIL } from "@/lib/seo";

const HEADER_LINKS = [
  { to: "/how-to", label: "How to" },
  { to: "/product-photos", label: "Products" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to tool
      </a>
      <header className="border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-tight">
            <PeelMark size={28} />
            {APP_NAME}
          </Link>
          <nav className="flex max-w-[70%] items-center gap-1 overflow-x-auto text-sm" aria-label="Primary">
            {HEADER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex min-h-11 items-center px-2 text-muted hover:text-ink sm:px-3"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
          <AdUnit slot="footer" />
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">{APP_NAME}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                On-device background removal. The photo stays in this tab. Transparent PNG or a solid fill.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Guides</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <Link to="/how-to" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    How to peel a photo
                  </Link>
                </li>
                <li>
                  <Link to="/transparent-png" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Transparent PNG
                  </Link>
                </li>
                <li>
                  <Link to="/white-background" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    White background
                  </Link>
                </li>
                <li>
                  <Link to="/product-photos" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Product photos
                  </Link>
                </li>
                <li>
                  <Link to="/portraits" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Portraits
                  </Link>
                </li>
                <li>
                  <Link to="/limits" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Limits and hard cases
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Site</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <Link to="/faq" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="inline-flex min-h-11 items-center text-muted hover:text-ink">
                    Terms
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-ink"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <SoftAgencyCta />
          <p className="font-mono text-xs text-muted">Photo stays in this tab · U²-NetP · Apache-2.0 weights</p>
        </div>
      </footer>
    </div>
  );
}
