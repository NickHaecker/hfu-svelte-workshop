import { getRandomWord } from '../utils';
import { writable } from 'svelte/store';

// WRITABLE STORES
export const tutorialDialog = writable(true);
export const settingsDialog = writable(false);
export const alert = writable(null);

// CUSTOM STORES
export const game = initGameStore();

function initGameStore() {
  const getDefaultState = () => ({
    lost: false,
    won: false,
    position: { x: 0, y: 0 },
    solution: getRandomWord(),
    grid: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
  });

  const { subscribe, set, update } = writable(getDefaultState());

  return {
    subscribe,
    setGridKey: (x, y, key) =>
      update((state) => {
        const grid = state.grid;
        grid[y][x] = key;
        return {
          ...state,
          grid,
        };
      }),
    setPosX: (num) =>
      update((state) => {
        const position = state.position;
        position.x = num;
        return {
          ...state,
          position,
        };
      }),
    setPosY: (num) =>
      update((state) => {
        const position = state.position;
        position.y = num;
        return {
          ...state,
          position,
        };
      }),
    setWon: (bool) => update((state) => ({ ...state, won: bool })),
    setLost: (bool) => update((state) => ({ ...state, lost: bool })),
    reset: () => set(getDefaultState()),
  };
}
