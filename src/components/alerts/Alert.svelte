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
  <div class="alert" transition:scale={{ duration: 200, easing: cubicInOut }}>
    <BaseAlert red>
      <span>{$alert}</span>
      <div class="alert__progress" style={`transform: scaleX(${progress}%)`} />
      <button class="alert__close" on:click={closeAlert}>
        <Icon src={XCircle} theme="solid" />
      </button>
    </BaseAlert>
  </div>
{/if}

<style>
  .alert {
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .alert__progress {
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform-origin: left;
    background-color: var(--red-500);
  }
  .alert__close {
    transform: translateX(0.5rem);
  }
</style>
