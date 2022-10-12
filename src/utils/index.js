/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {Number} min
 * @param {Number} max
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}