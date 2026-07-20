export type AffiliateProgramStatus = "disabled" | "applying" | "approved";

export const affiliateProgramStatus: AffiliateProgramStatus = "applying";

const GENERIC_DISCLOSURE =
  "Ask2Gift may use affiliate links. If you purchase through one of these links, Ask2Gift may earn a commission at no additional cost to you.";
const AMAZON_ASSOCIATE_DISCLOSURE = "As an Amazon Associate I earn from qualifying purchases.";

export function isAffiliateEnabled() {
  return affiliateProgramStatus !== "disabled";
}

export function getAffiliateProgramStatus(): AffiliateProgramStatus {
  return affiliateProgramStatus;
}

export function getAffiliateDisclosureText() {
  return GENERIC_DISCLOSURE;
}

export function getAmazonAssociateDisclosureText() {
  return AMAZON_ASSOCIATE_DISCLOSURE;
}

export function shouldShowAmazonAssociateDisclosure() {
  return affiliateProgramStatus === "approved";
}

export function hasAmazonAssociateTag() {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim();
  return Boolean(tag);
}

export function buildOutboundProductUrl(url?: string) {
  if (!url) {
    return null;
  }

  return url;
}

export function getOutboundLinkRel() {
  if (affiliateProgramStatus === "approved" && hasAmazonAssociateTag()) {
    return "sponsored noopener noreferrer";
  }

  return "noopener noreferrer";
}
