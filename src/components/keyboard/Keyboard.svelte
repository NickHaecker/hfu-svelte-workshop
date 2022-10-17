<script>
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Backspace } from '@steeze-ui/heroicons';
  import Key from './Key.svelte';
  import { game } from '../../store';

  let hits = [];
  let closeHits = [];
  let flops = [];

  /**
   * Listen to changes in game data to update used keys visually.
   */
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

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const dispatch = createEventDispatcher();

  function onClickKey(event) {
    dispatch('keypress', event.target.innerText);
  }
  function onClickEnter() {
    dispatch('keypress', 'ENTER');
  }
  function onClickBackspace() {
    dispatch('keypress', 'BACKSPACE');
  }
</script>

<div class="keyboard">
  <!-- KEYBOARD ROWS -->
  {#each rows as row, index}
    <!-- EACH KEYBOARD ROW -->
    <div class="keyboard__row">
      <!-- ENTER KEY ON LAST ROW -->
      {#if index === 2}
        <Key on:click={onClickEnter} key="Enter" />
      {/if}

      <!-- KEYS -->
      {#each row as key}
        <Key
          on:click={onClickKey}
          close={closeHits.includes(key.toLowerCase())}
          hit={hits.includes(key.toLowerCase())}
          flop={flops.includes(key.toLowerCase())}
          {key}
        />
      {/each}

      <!-- BACKSPACE KEY ON LAST ROW -->
      {#if index === 2}
        <Key on:click={onClickBackspace}>
          <Icon src={Backspace} theme="solid" />
        </Key>
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
