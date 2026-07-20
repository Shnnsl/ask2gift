export const siteConfig = {
  name: "Ask2Gift",
  domain: "ask2gift.com",
  description:
    "Discover thoughtful gift ideas personalized by recipient, occasion, budget, interests, style, and age with Ask2Gift.",
  url: "https://ask2gift.com",
  title: "Ask2Gift - Personalized Gift Recommendation Engine"
};

export function getPageTitle(title?: string) {
  return title ?? siteConfig.title;
}

export { getAffiliateDisclosureText, getAmazonAssociateDisclosureText, getAffiliateProgramStatus, shouldShowAmazonAssociateDisclosure } from "@/lib/affiliate";
