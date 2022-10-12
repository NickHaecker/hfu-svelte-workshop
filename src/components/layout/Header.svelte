<script>
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Cog8Tooth, QuestionMarkCircle } from '@steeze-ui/heroicons';
  import { settingsDialog, tutorialDialog } from '../../store';

  function onClickTutorial() {
    tutorialDialog.update(() => true);
  }
  function onClickSettings() {
    settingsDialog.update(() => true);
  }
</script>

<header class="flex h-16 items-center border-b-2 border-red-500">
  <div class="container mx-auto flex justify-between space-x-6">
    <!-- BRANDING -->
    <div class="flex items-center">
      <img class="h-6 w-6" src="/logos/svelte.svg" alt="Svelte Logo" />
      <span class="text-lg font-semibold">wordle</span>
    </div>

    <!-- ACTIONS -->
    <div class="flex items-center space-x-2">
      <button on:click={onClickTutorial}>
        <Icon src={QuestionMarkCircle} theme="solid" class="h-6 w-6 " />
      </button>
      <button on:click={onClickSettings}>
        <Icon src={Cog8Tooth} theme="solid" class="h-6 w-6 " />
      </button>
    </div>
  </div>
</header>
