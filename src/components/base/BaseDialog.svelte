<script>
  import { Icon } from '@steeze-ui/svelte-icon';
  import { XCircle } from '@steeze-ui/heroicons';

  export let show;

  function onClickClose() {
    show = false;
  }
</script>

{#if show}
  <!-- DIALOG WRAPPER -->
  <div class="absolute inset-0 flex items-center justify-center bg-black/25">
    <!-- DIALOG CONTETN -->
    <div
      class="relative w-full max-w-xl rounded-lg border-2 border-red-500 bg-white p-8 lg:p-10"
    >
      <!-- CLOSE -->
      <button class="absolute top-4 right-4 h-6 w-6" on:click={onClickClose}>
        <Icon src={XCircle} theme="solid" />
      </button>
      <!-- TITLE -->
      <h2 class="mb-4 text-xl font-semibold">
        <slot name="title" />
      </h2>
      <!-- CONTENT -->
      <slot />
    </div>
  </div>
{/if}
