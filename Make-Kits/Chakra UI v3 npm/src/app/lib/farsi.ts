/** Converts ASCII digits 0–9 to their Eastern Arabic-Indic (Persian) equivalents ۰–۹ */
export const toFarsi = (value: number | string): string =>
  String(value).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
