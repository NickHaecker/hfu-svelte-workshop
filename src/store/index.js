import { writable } from 'svelte/store';

export const tutorialDialog = writable(true);
export const settingsDialog = writable(false);
export const alert = writable(null);
