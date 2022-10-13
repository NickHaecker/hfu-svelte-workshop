<script>
  import { onMount } from 'svelte';
  import { alert } from '../../store';
  import { scale } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import BaseAlert from '../base/BaseAlert.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { XCircle } from '@steeze-ui/heroicons';

  let progress = 100;
  let interval = null;

  $: if ($alert) {
    progress = 100;
    interval = createInterval();
  }

  function createInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      progress -= 1;
      if (progress === 0) {
        closeAlert();
      }
    }, 50);
    return interval;
  }

  function closeAlert() {
    progress = 0;
    clearInterval(interval);
    alert.update(() => null);
  }

  onMount(() => {
    createInterval();
  });
</script>

{#if $alert}
  <div
    class="absolute top-2 left-1/2 inline-block -translate-x-1/2"
    transition:scale={{ duration: 200, easing: cubicInOut }}
  >
    <BaseAlert red>
      <span>{$alert}</span>
      <div
        class="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-red-500"
        style={`transform: scaleX(${progress}%)`}
      />
      <button class="translate-x-1" on:click={closeAlert}>
        <Icon class="h-5 w-5" src={XCircle} theme="solid" />
      </button>
    </BaseAlert>
  </div>
{/if}
