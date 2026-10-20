// Hash y ruido de valor deterministas: el paisaje es estable entre frames.
export const hash = (x: number, y: number, seed = 0) => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const smooth = (t: number) => t * t * (3 - 2 * t);

export const noise1 = (x: number, seed = 0) => {
  const i = Math.floor(x);
  const f = x - i;
  return hash(i, 0, seed) + (hash(i + 1, 0, seed) - hash(i, 0, seed)) * smooth(f);
};

export const fbm1 = (x: number, seed = 0) =>
  noise1(x, seed) * 0.55 + noise1(x * 2.1, seed + 1) * 0.3 + noise1(x * 4.3, seed + 2) * 0.15;

export const noise2 = (x: number, y: number, seed = 0) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash(xi, yi, seed), b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed), d = hash(xi + 1, yi + 1, seed);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
