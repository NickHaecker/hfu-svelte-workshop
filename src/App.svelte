<script>
  import { onMount } from 'svelte';
  import SettingsDialog from './components/dialogs/SettingsDialog.svelte';
  import TutorialDialog from './components/dialogs/TutorialDialog.svelte';
  import Header from './components/layout/Header.svelte';
  import Keyboard from './components/keyboard/Keyboard.svelte';
  import { WORDS, ALLOWED_KEYS } from './constants';
  import { getRandomInt } from './utils';

  const solution = WORDS[getRandomInt(0, WORDS.length)];
  const position = { x: 0, y: 0 };
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
    if (!ALLOWED_KEYS.includes(key)) return;
    const { x, y } = position;
    if (key === 'BACKSPACE') {
      grid[y][x] = '';
      position.x = x - 1 > 0 ? x - 1 : 0;
    } else if (key === 'ENTER') {
      if (y > 6) return;
      position.y += 1;
      position.x = 0;
    } else {
      if (grid[y][x] === '') {
        grid[y][x] = key;
      }
      position.x = x + 1 < 5 ? x + 1 : x;
    }
  }

  onMount(() => {
    // Add listener for keypressed keys on the physical keyboard.
    document.addEventListener('keydown', ({ key }) => {
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
        <div
          class="col-span-1 flex h-14 w-14 items-center justify-center rounded-lg  border border-red-500 text-2xl font-semibold"
        >
          {key}
        </div>
      {/each}
    </div>
  {/each}
</div>

<Keyboard on:keypress={onUpdateKeyboard} />

<TutorialDialog />
<SettingsDialog />
