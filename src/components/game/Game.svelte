<script>
  import {
    tutorialDialog,
    settingsDialog,
    alert,
  } from './../../store/index.js';
  import { scale } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import BaseAlert from '../base/BaseAlert.svelte';
  import Keyboard from '../keyboard/Keyboard.svelte';
  import { ALLOWED_KEYS } from '../../constants';
  import { wordExists } from '../../utils';
  import { game } from '../../store';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowUturnLeft } from '@steeze-ui/heroicons';

  let usedWords = [];

  /**
   * Triggered when a letter is pressed on the virtual keyboard.
   *
   * @param {object} event
   * @param {string} event.detail
   */
  function onUpdateKeyboard({ detail }) {
    handleKeyPress(detail.toLocaleLowerCase());
  }

  /**
   * Handle any keypress input.
   *
   * @param {string} key
   */
  function handleKeyPress(key) {
    // Skip when keypress is not allowed, game is won or lost
    if (!ALLOWED_KEYS.includes(key) || $game.lost || $game.won) return;

    if (key === 'backspace') {
      game.setGridKey($game.position.x - 1, $game.position.y, '');
      if ($game.position.x - 1 > 0) {
        game.setPosX($game.position.x - 1);
      } else {
        game.setPosX(0);
      }
    } else if (key === 'enter') {
      const currentWord = $game.grid[$game.position.y].join('').toLowerCase();
      if (currentWord === $game.solution) game.setWon(true);
      if (currentWord.length !== 5) {
        alert.update(() => 'Nicht genug Buchstaben');
        return;
      }
      if (!wordExists(currentWord)) {
        alert.update(
          () => `'${currentWord.toUpperCase()}' nicht in der Wortliste`
        );
        return;
      }
      if (usedWords.includes(currentWord)) {
        alert.update(() => `'${currentWord.toUpperCase()}' bereits verwendet`);
        return;
      }
      if ($game.position.y + 1 === 5 && !$game.won) game.setLost(true);
      usedWords = [...usedWords, currentWord];
      if ($game.position.y + 1 < 6) game.setPosY($game.position.y + 1);
      if ($game.position.y + 1 < 6) game.setPosX(0);
      return;
    } else {
      if ($game.grid[$game.position.y][$game.position.x] === '') {
        game.setGridKey($game.position.x, $game.position.y, key);
      }
      if ($game.position.x + 1 < 6) game.setPosX($game.position.x + 1);
    }
  }

  function resetGame() {
    usedWords = [];
    game.reset();
  }

  onMount(() => {
    // Add listener for keypressed keys on the physical keyboard.
    document.addEventListener('keydown', ({ key }) => {
      // Ignore when any dialog is open
      // ...
      if ($settingsDialog || $tutorialDialog) return;
      handleKeyPress(key.toLowerCase());
    });
    tutorialDialog.update(() => true);
  });
</script>

<!-- GRID -->
<div class="grid">
  {#each $game.grid as row, y}
    <div class="grid__row">
      {#each row as key, x}
        <div class="grid__col">
          {#if key}
            <span
              transition:scale={{ duration: 200, easing: cubicInOut }}
              class="grid__col__key
                {$game.position.y > y &&
              $game.solution.charAt(x) === key.toLowerCase()
                ? 'grid__col__key--green'
                : $game.position.y > y &&
                  $game.solution.includes(key.toLowerCase())
                ? 'grid__col__key--orange'
                : $game.position.y > y
                ? 'grid__col__key--gray'
                : ''}"
            >
              {key === 'ß' ? key : key.toUpperCase()}
            </span>
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  <div class="details">
    {#if $game.won}
      <BaseAlert green>
        <span>Gewonnen 🎉</span>
        <button on:click={resetGame}>
          <Icon src={ArrowUturnLeft} theme="solid" />
        </button>
      </BaseAlert>
    {/if}

    {#if $game.lost}
      <BaseAlert red>
        <span>Das Wort war '{$game.solution.toUpperCase()}'</span>
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
