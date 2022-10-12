<script>
  import { scale } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  import { onMount } from 'svelte';
  import SettingsDialog from './components/dialogs/SettingsDialog.svelte';
  import TutorialDialog from './components/dialogs/TutorialDialog.svelte';
  import Header from './components/layout/Header.svelte';
  import Keyboard from './components/keyboard/Keyboard.svelte';
  import { WORDS, ALLOWED_KEYS } from './constants';
  import { getRandomInt } from './utils';
  import { settingsDialog, tutorialDialog } from './store';

  const solution = WORDS[getRandomInt(0, WORDS.length)];
  const position = { x: 0, y: 0 };
  const usedWords = [];
  const grid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  /**
   * Triggered when a letter is pressed on the virtual keyboard.
   *
   * @param {object} event
   * @param {string} event.detail
   */
  function onUpdateKeyboard({ detail }) {
    handleKeyPress(detail);
  }

  /**
   * Handle any keypress input.
   *
   * @param {string} key
   */
  function handleKeyPress(key) {
    console.log(key);
    // Skip when keypress is not allowed
    if (!ALLOWED_KEYS.includes(key)) return;

    // Destructure position
    const { x, y } = position;

    // Handle backspace
    if (key === 'BACKSPACE') {
      grid[y][x - 1] = '';
      position.x = x - 1 > 0 ? x - 1 : 0;
      return;
    }

    // Handle enter
    if (key === 'ENTER') {
      const currentWord = grid[y].join('').toUpperCase();

      if (currentWord.length !== 5) {
        alert('Not enough letters');
        return;
      }

      if (!WORDS.filter((word) => word.toUpperCase() === currentWord).length) {
        alert(`${currentWord.toUpperCase()} not in word list`);
        return;
      }

      if (usedWords.includes(currentWord.toUpperCase())) {
        alert(`${currentWord.toUpperCase()} already used`);
        return;
      }

      usedWords.push(currentWord);

      position.y = y + 1 < 5 ? y + 1 : y;
      position.x = y + 1 < 5 ? 0 : x;

      return;
    }

    // Handle letters
    if (grid[y][x] === '') {
      grid[y][x] = key;
    }
    position.x = x + 1 < 6 ? x + 1 : x;
  }

  onMount(() => {
    // Add listener for keypressed keys on the physical keyboard.
    document.addEventListener('keydown', ({ key }) => {
      // Ignore when any dialog is open
      if ($tutorialDialog || $settingsDialog) return;
      handleKeyPress(key.toUpperCase());
    });
  });
</script>

<Header />

<!-- GRID -->
<div class="mx-auto my-12 grid max-w-xs gap-2">
  {#each grid as row}
    <div class="grid grid-cols-5 place-items-center">
      {#each row as key}
        <div class="col-span-1 h-14 w-14 overflow-hidden rounded-lg bg-red-50">
          {#if key}
            <span
              transition:scale={{ duration: 200, easing: cubicInOut }}
              class="flex h-full w-full  items-center justify-center rounded-lg border border-red-500 bg-white text-2xl font-semibold"
            >
              {key}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>

<Keyboard on:keypress={onUpdateKeyboard} />

<TutorialDialog />
<SettingsDialog />
