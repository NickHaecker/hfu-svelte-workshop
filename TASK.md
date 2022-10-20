# Task

This task is a little more complex than the others. You need to have an understanding about reactivity and the store.

Helpful resources:

- [Component Props](https://svelte.dev/tutorial/declaring-props)
- [Reactivity](https://svelte.dev/tutorial/reactive-declarations)
- [Store bindings](https://svelte.dev/tutorial/store-bindings)

## Highlighting

In Wordle, we want letters that have already been used to be visible. It is also important to note whether a letter is in the right place, in the wrong place, or does not exist in the word at all.

This highlighting is already implemented in the game grid and will now be implemented for the visual keyboard.

We already perpared you the CSS classes `.highlight-hit`, `.highlight-close` and `.highlight-flop` inside `Key.svelte` to only focus on the logic.

You can access game state from the custom store `game`.

We are very excited to see your solution!
