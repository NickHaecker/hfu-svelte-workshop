<script>
  import { tutorialDialog } from './../../store/index.js';
  // import { tutorialDialog } from 'src/store';
  import BaseDialog from '../base/BaseDialog.svelte';

  let tD = false;
  tutorialDialog.subscribe((v) => {
    tD = v;
  });
</script>

<BaseDialog bind:show={tD}>
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
