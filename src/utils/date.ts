/**
 * Return date in yyyy-mm-dd format
 * @param date {Date}
 */
export function formatDate(date: Date): string {
  let dd = numToString(date.getDate()),
    mm = numToString(date.getMonth() + 1),
    yy = numToString(date.getFullYear());

  return `${yy}-${mm}-${dd}`;
}

/**
 * Add zero before less than 10 number
 * @param num {Number}
 */
export function numToString(num: number): string {
  return num < 10 ? "0" + num : num.toString();
}
