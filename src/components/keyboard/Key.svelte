<script></script>

<button on:click>
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
  button:hover {
    transform: scale(0.95);
    background-color: var(--red-50);
  }
  button:active {
    transform: scale(0.9);
    color: white;
    background-color: var(--red-500);
  }
</style>
