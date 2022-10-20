<script>
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Backspace } from '@steeze-ui/heroicons';
  import { game } from '../../store';

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
  }
  function onClickEnter() {
    dispatch('keypress', 'enter');
  }
  function onClickBackspace() {
    dispatch('keypress', 'backspace');
  }
</script>

<div class="keyboard">
  <!-- KEYBOARD ROWS -->
  {#each rows as row}
    <!-- EACH KEYBOARD ROW -->
    <div class="keyboard__row">
      <!-- ENTER KEY ON LAST ROW -->
      <button on:click={onClickEnter}>Enter</button>

      <!-- KEYS -->
      {#each row as key}
        <button
          class="
            {hits.includes(key.toLowerCase()) ? 'highlight--hit' : ''}
            {closeHits.includes(key.toLowerCase()) ? 'highlight--close' : ''}
            {flops.includes(key.toLowerCase()) ? 'highlight--flop' : ''}
          "
          on:click={onClickKey}
        >
          <span>{key}</span>
        </button>
      {/each}

      <!-- BACKSPACE KEY ON LAST ROW -->
      <button on:click={onClickBackspace}>
        <Icon src={Backspace} theme="solid" />
      </button>
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
  button {
    height: 3.5rem;
    min-width: 2.75rem;
    border-radius: var(--rounded-lg);
    border: 1px var(--red-500) solid;
    padding: 0 1rem;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 100ms linear;
  }
  button:not(.highlight--flop, .highlight--hit, .highlight--close):hover {
    transform: scale(0.95);
    background-color: var(--red-50);
  }

  button:not(.highlight--hit, .highlight-close):active {
    transform: scale(0.9);
    color: white;
    background-color: var(--red-500);
  }
  .highlight--close {
    color: white;
    background-color: var(--orange-500);
  }
  .highlight--hit {
    color: white;
    background-color: var(--green-500);
  }
  .highlight--flop {
    background-color: var(--gray-200);
  }
  .highlight--flop,
  .highlight--hit,
  .highlight--close {
    cursor: default;
    border: none;
  }
</style>
