<script>
  import { tutorialDialog } from '../../store';
  import BaseDialog from '../base/BaseDialog.svelte';
</script>

<BaseDialog bind:show={$tutorialDialog}>
  <span slot="title">How To Play</span>
  <div slot="default">
    <p>Guess the Wordle in 6 tries.</p>
    <ul>
      <li>Each guess must be a valid 5-letter word.</li>
      <li>
        The color of the tiles will change to show how close your guess was to
        the word.
      </li>
    </ul>
    <hr />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci placeat
      esse at?
    </p>
  </div>
</BaseDialog>
