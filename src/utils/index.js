import { WORDS } from '../constants';

export function getRandomWord() {
  return 'braun';
}

/**
 * @param {String} currentWord
 */
export function wordExists(currentWord) {
  return WORDS.filter(
    (word) => word.toLowerCase() === currentWord.toLowerCase()
  ).length;
}
