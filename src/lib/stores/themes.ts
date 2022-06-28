import type { Theme } from '$types/themes';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const ThemeLocalStorageKey = 'theme';
export const DefaultTheme = 'dark';

const SystemPreferTheme: Theme =
  browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const SavedTheme: Theme =
  (browser && !!localStorage.getItem(ThemeLocalStorageKey) && localStorage.getItem(ThemeLocalStorageKey)) ||
  SystemPreferTheme ||
  DefaultTheme;

function Theme() {
  const { subscribe, set, update } = writable(SavedTheme);

  const setTheme = (theme: Theme) => {
    if (browser) {
      switch (theme) {
        case 'dark':
          window.document.body.classList.add('dark');
          window.document.body.classList.remove('light');
          localStorage.setItem(ThemeLocalStorageKey, 'dark');
          break;
        case 'light':
          window.document.body.classList.add('light');
          window.document.body.classList.remove('dark');
          localStorage.setItem(ThemeLocalStorageKey, 'light');
          break;
      }
      set(theme);
    }
  };

  return {
    subscribe,
    dark: () => {
      setTheme('dark');
    },
    light: () => {
      setTheme('light');
    },
    toggle: () =>
      update((theme) => {
        const updateTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(updateTheme);
        return updateTheme;
      }),
  };
}

export const theme = Theme();
