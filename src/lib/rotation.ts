// Deterministic "hand-placed" rotation. The same id always produces the same
// angle on the server and the client, so there are no hydration mismatches.
// Never use Math.random() during render.

/** FNV-1a 32-bit hash. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Returns an angle in degrees with magnitude between `min` and `max`
 * (default 1°–4°) and a sign that is also derived from the id.
 */
export function rotationFor(id: string, min = 1, max = 4): number {
  const h = hash(id);
  const magnitude = min + ((h % 1000) / 1000) * (max - min);
  const sign = (h >> 10) & 1 ? 1 : -1;
  return Math.round(sign * magnitude * 10) / 10;
}
