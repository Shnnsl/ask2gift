import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-spruce">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-spruce text-xs font-bold text-white">
        a2g
      </span>
      <span>ask2gift</span>
    </Link>
  );
}
