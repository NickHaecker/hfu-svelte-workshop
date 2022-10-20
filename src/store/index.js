import { writable } from 'svelte/store';

// WRITABLE STORES
export const tutorialDialog = writable(true);
export const settingsDialog = writable(false);
export const alert = writable(null);

// CUSTOM STORES
export const game = initGameStore();

function initGameStore() {}
