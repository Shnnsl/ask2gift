import { giftIcons, pickGiftIcon } from "@/lib/giftIcons";
import type { GiftIcon } from "@/lib/giftIcons";

interface GiftIllustrationProps {
  title: string;
  category: string;
  className?: string;
}

/** Line illustration of the kind of gift, chosen from the gift's title and category. */
export function GiftIllustration({ title, category, className = "h-12 w-12" }: GiftIllustrationProps) {
  const icon: GiftIcon = giftIcons[pickGiftIcon(title, category)];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icon.rects?.map(([x, y, width, height, radius]) => (
        <rect key={`r${x}-${y}`} x={x} y={y} width={width} height={height} rx={radius} />
      ))}
      {icon.circles?.map(([cx, cy, r]) => (
        <circle key={`c${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
      {icon.paths?.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
