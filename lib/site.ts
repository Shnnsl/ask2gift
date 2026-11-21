export const siteConfig = {
  name: "Ask2Gift",
  domain: "ask2gift.com",
  description:
    "Take a one-minute gift quiz and get personalized gift ideas for birthdays, holidays, anniversaries, weddings, and more, matched to the person, occasion, and budget.",
  url: "https://ask2gift.com",
  title: "Ask2Gift | Gift Finder Quiz and Personalized Gift Ideas",
  supportEmail: "support@ask2gift.com"
};

export function getPageTitle(title?: string) {
  return title ?? siteConfig.title;
}

export { getAffiliateDisclosureText, getAmazonAssociateDisclosureText, getAffiliateProgramStatus, shouldShowAmazonAssociateDisclosure } from "@/lib/affiliate";
