import { getAffiliateDisclosureText, getAmazonAssociateDisclosureText, shouldShowAmazonAssociateDisclosure } from "@/lib/affiliate";

interface AffiliateDisclosureProps {
  className?: string;
  compact?: boolean;
}

export function AffiliateDisclosure({ className = "", compact = false }: AffiliateDisclosureProps) {
  const disclosureText = shouldShowAmazonAssociateDisclosure()
    ? getAmazonAssociateDisclosureText()
    : getAffiliateDisclosureText();

  return (
    <div className={`rounded-[1.5rem] border border-slate-200/80 bg-slate-50 text-slate-600 ${compact ? "p-4 text-sm" : "p-5 text-sm sm:p-6"} ${className}`.trim()}>
      <p className="font-semibold text-ink">Affiliate disclosure</p>
      <p className="mt-2">{disclosureText}</p>
    </div>
  );
}
