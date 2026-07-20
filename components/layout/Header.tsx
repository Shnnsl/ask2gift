import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/layout/Logo";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/favorites", label: "Favorites" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-cream/90 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/quiz">Find a Gift</ButtonLink>
        </div>
      </div>
    </header>
  );
}
