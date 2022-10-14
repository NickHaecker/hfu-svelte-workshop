<script>
  export let red = false;
  export let green = false;
</script>

<div class="alert {green ? 'alert--green' : ''} {red ? 'alert--red' : ''}">
  <slot />
</div>

<style>
  .alert {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    display: inline-flex;
    align-items: center;
    overflow: hidden;
    border-radius: var(--rounded-lg);
    padding: 0.5rem 1rem;
  }

  .alert--green {
    border: 1px solid var(--green-500);
    background-color: var(--green-50);
  }
  .alert--red {
    border: 1px solid var(--red-500);
    background-color: var(--red-50);
  }
</style>
