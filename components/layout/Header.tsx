import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/gift-guides", label: "Gift guides" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-cream/90 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-4 py-3 sm:py-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ButtonLink href="/quiz" className="px-4 py-2.5 sm:px-6 sm:py-3">
            Find a Gift
          </ButtonLink>
          <details className="group relative md:hidden">
            <summary
              aria-label="Menu"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 bg-white text-ink shadow-sm [&::-webkit-details-marker]:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-full mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-soft"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-ink">
                Contact
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
