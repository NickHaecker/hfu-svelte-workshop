<script>
  import { settingsDialog } from './../../store/index.js';
  import BaseDialog from '../base/BaseDialog.svelte';

  let sD = false;
  settingsDialog.subscribe((v) => {
    sD = v;
  });
</script>

<BaseDialog bind:show={sD}>
  <span slot="title">Settings</span>
  <div slot="default">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi placeat
    dolor est quo, animi aperiam asperiores hic repudiandae quidem corporis
    veritatis incidunt optio nisi at laudantium nihil iste nesciunt
    perspiciatis.
  </div>
</BaseDialog>
