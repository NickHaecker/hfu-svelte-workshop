<script>
  import { tutorialDialog, settingsDialog } from './../../store/index.js';
  import { fade, scale } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { XCircle } from '@steeze-ui/heroicons';

  export let show;

  function onClickClose() {
    $tutorialDialog = false;
    $settingsDialog = false;
    show = false;
  }
</script>

{#if show}
  <!-- DIALOG WRAPPER -->
  <div transition:fade={{ duration: 200, easing: cubicInOut }} class="dialog">
    <!-- DIALOG CONTENT -->
    <div
      transition:scale={{ duration: 200, easing: cubicInOut }}
      class="dialog__content"
    >
      <!-- CLOSE -->
      <button class="dialog__close" on:click={onClickClose}>
        <Icon src={XCircle} theme="solid" />
      </button>

      <!-- TITLE -->
      <h2 class="dialog__title">
        <slot name="title" />
      </h2>

      <!-- CONTENT -->
      <slot />
    </div>
  </div>
{/if}

<style>
  .dialog {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 25%);
  }
  .dialog__content {
    position: relative;
    max-width: var(--max-w-xl);
    border-radius: var(--rounded-lg);
    border: 2px var(--red-500) solid;
    background-color: white;
    padding: 2rem;
    width: 100%;
  }
  .dialog__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  .dialog__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
</style>
