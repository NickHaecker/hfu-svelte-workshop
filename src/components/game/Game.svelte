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
<div class="grid">
  {#each grid as row, y}
    <div class="grid__row">
      {#each row as key, x}
        <div class="grid__col">
          {#if key}
            <span
              transition:scale={{ duration: 200, easing: cubicInOut }}
              class="grid__col__key
                {position.y > y && solution.charAt(x) === key.toUpperCase()
                ? 'grid__col__key--green'
                : position.y > y && solution.includes(key.toUpperCase())
                ? 'grid__col__key--orange'
                : position.y > y
                ? 'grid__col__key--gray'
                : ''}"
            >
              {key}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  <div class="details">
    {#if won}
      <BaseAlert green>
        <span>Gewonnen 🎉</span>
        <button on:click={resetGame}>
          <Icon src={ArrowUturnLeft} theme="solid" />
        </button>
      </BaseAlert>
    {/if}

    {#if lost}
      <BaseAlert red>
        <span>Das Wort war {solution}</span>
        <button on:click={resetGame}>
          <Icon src={ArrowUturnLeft} theme="solid" />
        </button>
      </BaseAlert>
    {/if}
  </div>
</div>

<Keyboard on:keypress={onUpdateKeyboard} />

<style>
  .grid {
    display: grid;
    margin: 3rem auto;
    max-width: var(--max-w-xs);
    gap: 0.5rem;
  }
  .grid__row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    place-items: center;
  }
  .grid__col {
    grid-column: span 1 / span 1;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: var(--rounded-lg);
    background-color: var(--red-50);
  }
  .grid__col__key {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded-lg);
    font-size: 24px;
    font-weight: 600;
    border: 1px var(--red-500) solid;
  }
  .grid__col__key--green {
    border: none;
    color: white;
    background-color: var(--green-500);
  }
  .grid__col__key--orange {
    border: none;
    color: white;
    background-color: var(--orange-500);
  }
  .grid__col__key--gray {
    border: none;
    background-color: var(--gray-200);
  }
  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
  }
  .details button {
    margin-left: 0.5rem;
  }
</style>
