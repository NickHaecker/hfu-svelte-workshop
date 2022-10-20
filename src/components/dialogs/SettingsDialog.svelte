<script>
  import BaseDialog from '../base/BaseDialog.svelte';

  let settingsDialog = false;
</script>

<BaseDialog bind:show={settingsDialog}>
  <span slot="title">Settings</span>
  <div slot="default">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi placeat
    dolor est quo, animi aperiam asperiores hic repudiandae quidem corporis
    veritatis incidunt optio nisi at laudantium nihil iste nesciunt
    perspiciatis.
  </div>
</BaseDialog>
