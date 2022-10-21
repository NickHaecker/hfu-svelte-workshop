<script>
  import { settingsDialog, tutorialDialog } from './../../store/index.js';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Cog8Tooth, QuestionMarkCircle } from '@steeze-ui/heroicons';
  // import { settingsDialog, tutorialDialog } from '/store';

  function onClickTutorial() {
    // ...
    settingsDialog.update(() => false);
    tutorialDialog.update(() => true);
  }
  function onClickSettings() {
    // ...
    settingsDialog.update(() => true);
    tutorialDialog.update(() => false);
  }
</script>

<header class="header">
  <div class="header__container container ">
    <!-- BRANDING -->
    <div class="header__brand">
      <img height="24" width="24" src="/logos/svelte.svg" alt="Svelte Logo" />
      <span>wordle</span>
    </div>

    <!-- ACTIONS -->
    <div class="header__action">
      <button on:click={onClickTutorial}>
        <Icon src={QuestionMarkCircle} theme="solid" />
      </button>
      <button on:click={onClickSettings}>
        <Icon src={Cog8Tooth} theme="solid" />
      </button>
    </div>
  </div>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    border-bottom: 2px var(--red-500) solid;
    height: 4rem;
  }
  .header__container {
    display: flex;
    justify-content: space-between;
  }
  .header__brand {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
  }
  .header__brand img {
    margin-right: 0.125rem;
  }
  .header__action {
    display: flex;
    align-items: center;
  }
  .header__action button {
    margin-left: 0.5rem;
  }
  .header__action button:first-child {
    margin-left: 0;
  }
</style>
