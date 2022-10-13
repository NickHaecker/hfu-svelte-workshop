<script>
  import SettingsDialog from './components/dialogs/SettingsDialog.svelte';
  import TutorialDialog from './components/dialogs/TutorialDialog.svelte';
  import Header from './components/layout/Header.svelte';
  import Game from './components/game/Game.svelte';
  import Alert from './components/alerts/Alert.svelte';
</script>

<Header />
<Alert />
<Game />
<TutorialDialog />
<SettingsDialog />
