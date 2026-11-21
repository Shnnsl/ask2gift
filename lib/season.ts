/**
 * Seasonal campaign switches. The Christmas campaign turns itself on from
 * November 1 and off after December 25, so nothing needs to be edited by hand.
 */
export function isChristmasSeason(now: Date = new Date()) {
  const month = now.getMonth();
  return month === 10 || (month === 11 && now.getDate() <= 25);
}
