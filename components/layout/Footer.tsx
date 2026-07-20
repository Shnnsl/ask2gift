import Link from "next/link";
import { AffiliateDisclosure } from "@/components/shared/AffiliateDisclosure";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" }
];

const trustItems = ["Privacy Friendly", "No Account Required", "Save Your Favorites", "Public Beta"];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80">
      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="max-w-xl">
          <p className="text-lg font-semibold text-ink">ask2gift</p>
          <p className="mt-2 text-sm text-slate-600">Made to help gift-giving feel easier and more personal.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-coral/35 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p>Ask2Gift does not require an account to use the quiz.</p>
              <p>
                Support: <a href="mailto:support@ask2gift.com" className="font-medium text-spruce hover:text-ink">support@ask2gift.com</a>
              </p>
            </div>
          </div>
          <AffiliateDisclosure compact />
        </div>
      </div>
      <div className="border-t border-slate-200/80">
        <div className="container-shell flex flex-col gap-2 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Ask2Gift. Created by Nesil Sahin.</span>
          <span>Thoughtful gift ideas for public-beta exploration.</span>
        </div>
      </div>
    </footer>
  );
}
