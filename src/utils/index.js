import { WORDS } from '../constants';

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {Number} min
 * @param {Number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomWord() {
  return WORDS[getRandomInt(0, WORDS.length)].toLowerCase();
}

/**
 * @param {String} currentWord
 */
export function wordExists(currentWord) {
  return WORDS.filter(
    (word) => word.toLowerCase() === currentWord.toLowerCase()
  ).length;
}
