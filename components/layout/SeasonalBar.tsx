import Link from "next/link";
import { isChristmasSeason } from "@/lib/season";

/** Slim announcement bar shown during the Christmas shopping season. */
export function SeasonalBar() {
  if (!isChristmasSeason()) {
    return null;
  }

  return (
    <div className="bg-spruce text-white">
      <div className="container-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-sm">
        <span className="font-medium">Shopping for Christmas?</span>
        <Link
          href="/gift-guides/christmas-gifts"
          className="font-semibold underline decoration-white/50 underline-offset-4 hover:decoration-white"
        >
          See the Christmas gift guide
        </Link>
      </div>
    </div>
  );
}
