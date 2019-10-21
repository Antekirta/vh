export const toFixed = (
  n: number | string | undefined,
  symbolsCount: number
): string | undefined => {
  if (!n) return;

  n = +n;

  return n.toFixed(symbolsCount);
};
