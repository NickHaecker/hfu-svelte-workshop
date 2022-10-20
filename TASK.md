## Custom Store

All game state currently resides in the `Game.svelte` component and is passed through props to the child components. With a growing app, passing state across multiple components can quickly become hard to maintain.

Your task is to implement a [custom store](https://svelte.dev/tutorial/custom-stores) for the game logic inside the `initGameStore` function in `./src/store/index.js`.

The components `Game.svelte` and `Keyboard.svelte` should get all its game state your custom store.

## Implement `getRandomWord`

You may have noticed that the `getRandomWord` function always returns the same word "braun" as default. Implement the logic in which `getRandomWord` always outputs a random word from the wordlist. The wordlist is available in `./src/utils/index.js` in the `getRandomWord` function as `WORDS` constant.

```js
import { WORDS } from '../constants';

export function getRandomWord() {
  // Put your logic here
}
```
