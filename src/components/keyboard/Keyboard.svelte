<script>
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Backspace } from '@steeze-ui/heroicons';
  import Key from './Key.svelte';
  import { game } from '../../store';

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
    dispatch('keypress', 'enter');
  }
  function onClickBackspace() {
    dispatch('keypress', 'backspace');
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
        <Key on:click={onClickKey} {key} />
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
