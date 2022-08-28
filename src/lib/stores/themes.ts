import type { Theme } from '$lib/types/themes';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const ThemeLocalStorageKey = 'theme';
export const DefaultTheme = 'dark';

function Theme() {
  const getSystemTheme = () => {
    return browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const getTheme = () => {
    return (
      (browser && !!localStorage.getItem(ThemeLocalStorageKey) && localStorage.getItem(ThemeLocalStorageKey)) ||
      getSystemTheme() ||
      DefaultTheme
    );
  };

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

  const { subscribe, set, update } = writable(getTheme());

  return {
    subscribe,
    get: () => {
      return getTheme();
    },
    get_color: () => {
      const curTheme = getTheme();

      switch (curTheme) {
        case 'light':
          return 'white';
        case 'dark':
          return 'black';
        default:
          return '#FFFFFF';
      }
    },
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
