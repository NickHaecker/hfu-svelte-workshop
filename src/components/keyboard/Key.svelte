<script>
  export let key = null;
  export let hit = false;
  export let close = false;
  export let flop = false;
</script>

<button
  class={hit
    ? 'highlight--hit'
    : close
    ? 'highlight--close'
    : flop
    ? 'highlight--flop'
    : ''}
  on:click
>
  {#if key}
    <span>{key}</span>
  {/if}
  <slot />
</button>

<style>
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
  button:not(.highlight--green, .highlight-orange):hover {
    transform: scale(0.95);
    background-color: var(--red-50);
  }
  button:not(.highlight--green, .highlight-orange):active {
    transform: scale(0.9);
    color: white;
    background-color: var(--red-500);
  }
  button.highlight--close {
    cursor: default;
    border: none;
    color: white;
    background-color: var(--orange-500);
  }
  button.highlight--hit {
    cursor: default;
    border: none;
    color: white;
    background-color: var(--green-500);
  }
  button.highlight--flop {
    cursor: default;
    border: none;
    background-color: var(--gray-200);
  }
</style>
