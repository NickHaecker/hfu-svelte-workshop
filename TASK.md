# Task

## Writable Store

In this task, you need to connect the following components to writable stores:

- [`TutorialDialog`](./src/components/dialogs/TutorialDialog.svelte)
- [`SettingsDialog`](./src/components/dialogs/SettingsDialog.svelte)
- [`Game`](./src/components/game/Game.svelte)
- [`Alert`](./src/components/alerts/Alert.svelte)

Learn more about [writable stores in Svelte](https://svelte.dev/tutorial/writable-stores).

### Dialogs notes

We created the reusable dialog component `BaseDialog` which is used for all dialogs. First, try to understand how the dialog rendering is handled.

Currently the dialogs wont show as they have no bindings to any reactive state:

```svelte
<!-- TutorialDialog.svelte -->
<script>
  let tutorialDialog = false; // Forever false
</script>
```

Inside the component `Game`, in the lifecycle hook `onMount` we start a listener for listening to any keystrokes. You should only call the method `handleKeyPress()` when there is no dialog active.

And at the last `TutorialDialog` should be opened while `SettingsDialog` should be closed initially.

### Alert notes

With the `Alert` component it is similar to the dialogs, only that here the value of the writable store contains a message. If there is a message, the alert is displayed (else the value should be `false` or `null`).
