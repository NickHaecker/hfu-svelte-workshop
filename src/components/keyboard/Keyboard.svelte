<script>
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Backspace } from '@steeze-ui/heroicons';
  import Key from './Key.svelte';

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

<div class="flex flex-col items-center space-y-1">
  <!-- KEYBOARD ROWS -->
  {#each rows as row, index}
    <!-- EACH KEYBOARD ROW -->
    <div class="flex flex-nowrap space-x-1">
      <!-- ENTER KEY ON LAST ROW -->
      {#if index === 2}
        <Key on:click={onClickEnter}>Enter</Key>
      {/if}

      <!-- KEYS -->
      {#each row as key}
        <Key on:click={onClickKey}>{key}</Key>
      {/each}

      <!-- BACKSPACE KEY ON LAST ROW -->
      {#if index === 2}
        <Key on:click={onClickBackspace}>
          <Icon src={Backspace} theme="solid" class="h-6 w-6" />
        </Key>
      {/if}
    </div>
  {/each}
</div>
