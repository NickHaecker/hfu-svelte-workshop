# Tasks

In this task you will deal with the visual keyboard. The component for the keyboard is located in `./src/components/keyboard`.

## Click Handler & Events

Implement click events for the buttons on the visual keyboard that communicate with the parent component. The following functions are available inside `Keyboard.svelte` for this purpose:

```js
function onClickKey() {}
function onClickEnter() {}
function onClickBackspace() {}
```

Bind the click events to the respective buttons and implement the event dispatcher with the `createEventDispatcher` from svelte. Read more about [component events](https://svelte.dev/tutorial/component-events) in Svelte.

## Conditional Rendering

Currently, the Backspace and Enter buttons are rendered for each line. Only the last line should be rendered. Use [logic / if blocks](https://svelte.dev/tutorial/if-blocks) to implement conditional rendering for these keys.

## Key Component

Implement a reusable component named `Key.svelte` to replace the buttons inside `Keyboard.svelte`. Move the styles with it and find a solution to conditionally bind the correct active class of a key with component props.
