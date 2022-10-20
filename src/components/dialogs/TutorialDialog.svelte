<script>
  import BaseDialog from '../base/BaseDialog.svelte';

  let tutorialDialog = false;
</script>

<BaseDialog bind:show={tutorialDialog}>
  <span slot="title">How To Play</span>
  <div slot="default">
    <p>Errate das Wordle in 6 Versuchen.</p>
    <ul>
      <li>Jeder Versuch muss ein gültiges Wort mit 5 Buchstaben sein.</li>
      <li>
        Die Farbe der Kacheln ändert sich, um zu zeigen, wie nahe du dem Wort
        dem Wort.
      </li>
    </ul>
  </div>
</BaseDialog>
