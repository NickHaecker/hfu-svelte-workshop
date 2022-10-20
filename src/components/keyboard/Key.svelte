<script>
  export let key = null;
</script>

<button on:click>
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
