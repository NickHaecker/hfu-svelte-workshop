<script>
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Backspace } from '@steeze-ui/heroicons';
  import { game } from '../../store';
  import { createEventDispatcher } from 'svelte';
  import Key from './Key.svelte';

  const dispatch = createEventDispatcher();

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  let hits = [];
  let closeHits = [];
  let flops = [];

  // Listen to changes in game data to update used keys visually
  $: {
    if ($game.position.y > 0) {
      const y = $game.position.y - 1;
      // Check row for hits
      const currentRow = $game.grid[y];
      currentRow.forEach((key, index) => {
        const isHit = $game.solution[index] === key;
        const isCloseHit =
          $game.solution.includes(key) && $game.solution[index] !== key;

        if (isHit) {
          // Check if key already marked as hit to avoid duplicates
          if (!hits.includes(key)) {
            // Include key to hits
            hits = [...hits, key];
            // Remove key from close hits if available
            closeHits = closeHits.filter((hit) => hit !== key);
            // Remove key from flops if available
            flops = flops.filter((hit) => hit !== key);
          }
        } else if (isCloseHit) {
          // Check if key already marked as close hit to avoid duplicates
          if (!closeHits.includes(key) && !hits.includes(key)) {
            // Include key to close hits
            closeHits = [...closeHits, key];
            // Remove key from flops if available
            flops = flops.filter((hit) => hit !== key);
          }
        } else {
          // Include key to flops
          flops = [...flops, key];
        }
      });
    } else {
      // Clear data
      hits = [];
      closeHits = [];
      flops = [];
    }
  }

  function onClickKey(event) {
    dispatch('keypress', event.target.innerText);
    // Dispatch "keypress" event with klicked value to parent component "Game"
  }
  function onClickEnter(event) {
    dispatch('keypress', 'enter');
    // Dispatch "keypress" event with value "enter" to parent component "Game"
  }
  function onClickBackspace(event) {
    dispatch('keypress', 'backspace');
    // Dispatch "keypress" event with value "backspace" to parent component "Game"
  }
</script>

<div class="keyboard">
  <!-- KEYBOARD ROWS -->
  {#each rows as row, i}
    <!-- EACH KEYBOARD ROW -->
    <div class="keyboard__row">
      <!-- ENTER KEY ON LAST ROW -->
      {#if i === rows.length - 1}
        <Key on:click={onClickEnter}>Enter</Key>
      {/if}

      <!-- KEYS -->
      {#each row as key}
        <Key
          hits={hits.includes(key.toLowerCase())}
          closeHits={closeHits.includes(key.toLowerCase())}
          flops={flops.includes(key.toLowerCase())}
          on:click={onClickKey}
        >
          <span>{key}</span></Key
        >
      {/each}

      <!-- BACKSPACE KEY ON LAST ROW -->
      {#if i === rows.length - 1}
        <Key on:click={onClickBackspace}>
          <Icon src={Backspace} theme="solid" /></Key
        >
      {/if}
    </div>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .keyboard > * ~ * {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  .keyboard__row {
    display: flex;
    flex-wrap: nowrap;
  }
  :global(.keyboard__row > * ~ *) {
    margin-left: 0.125rem;
    margin-right: 0.125rem;
  }
</style>
