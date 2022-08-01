import { writable } from 'svelte/store';

export const videoPlayers = (() => {
  const { subscribe } = writable();

  return {
    subscribe,
  };
})();
