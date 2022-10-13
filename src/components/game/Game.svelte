<script>
  import { scale } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import BaseAlert from '../base/BaseAlert.svelte';
  import Keyboard from '../keyboard/Keyboard.svelte';
  import { ALLOWED_KEYS } from '../../constants';
  import { getRandomWord, wordExists } from '../../utils';
  import { settingsDialog, tutorialDialog, alert } from '../../store';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowUturnLeft } from '@steeze-ui/heroicons';

  // Game State
  $: lost = false;
  $: won = false;
  const position = { x: 0, y: 0 };
  let solution = getRandomWord();
  let usedWords = [];
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
    // Skip when keypress is not allowed, game is won or lost
    if (!ALLOWED_KEYS.includes(key) || lost || won) return;

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

      // Won
      if (currentWord === solution) {
        won = true;
      }

      if (currentWord.length !== 5) {
        alert.update(() => 'Nicht genug Buchstaben');
        return;
      }

      if (!wordExists(currentWord)) {
        alert.update(() => `${currentWord} nicht in der Wortliste`);
        return;
      }

      if (usedWords.includes(currentWord)) {
        alert.update(() => `${currentWord} bereits verwendet`);
        return;
      }

      if (y + 1 === 5) {
        lost = true;
      }

      usedWords.push(currentWord);

      position.y = y + 1 < 6 ? y + 1 : y;
      position.x = y + 1 < 5 ? 0 : x;

      return;
    }

    // Handle letters
    if (grid[y][x] === '') {
      grid[y][x] = key;
    }
    position.x = x + 1 < 6 ? x + 1 : x;
  }

  function resetGame() {
    position.x = 0;
    position.y = 0;
    usedWords = [];
    grid.forEach((row, y) => row.forEach((key, x) => (grid[y][x] = '')));
    solution = getRandomWord();
    won = false;
    lost = false;
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

<!-- GRID -->
<div class="mx-auto my-12 grid max-w-xs gap-2">
  {#each grid as row, y}
    <div class="grid grid-cols-5 place-items-center">
      {#each row as key, x}
        <div class="col-span-1 h-14 w-14 overflow-hidden rounded-lg bg-red-50">
          {#if key}
            <span
              transition:scale={{ duration: 200, easing: cubicInOut }}
              class="flex h-full w-full  items-center justify-center rounded-lg  text-2xl font-semibold 
              {position.y > y && solution.charAt(x) === key.toUpperCase()
                ? 'bg-green-500 text-white'
                : position.y > y && solution.includes(key.toUpperCase())
                ? 'bg-orange-500 text-white'
                : 'border border-red-500 bg-white'}"
            >
              {key}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  {#if won}
    <BaseAlert green>
      <span>Gewonnen 🎉</span>
      <button class="ml-2" on:click={resetGame}>
        <Icon class="h-5 w-5" src={ArrowUturnLeft} theme="solid" />
      </button>
    </BaseAlert>
  {/if}

  {#if lost}
    <BaseAlert red>
      <span>Das Wort war {solution}</span>
      <button class="ml-2" on:click={resetGame}>
        <Icon class="h-5 w-5" src={ArrowUturnLeft} theme="solid" />
      </button>
    </BaseAlert>
  {/if}
</div>

<Keyboard on:keypress={onUpdateKeyboard} />
