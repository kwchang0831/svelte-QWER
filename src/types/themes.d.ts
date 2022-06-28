export type Theme = 'dark' | 'light' | string;
export declare const LocalStorageKey = 'theme';
export declare const DefaultTheme = 'dark';

declare function toggleTheme(): void;

import { SvelteComponentTyped } from 'svelte';

export type Theme = 'dark' | 'light';

export interface DarkModeProps {
  /**
   * The current theme.
   * @default "dark"
   */
  theme?: Theme;

  /**
   * Specify a custom local storage key
   * to store the current theme.
   * @default "theme"
   */
  key?: string;
}

export default class DarkMode extends SvelteComponentTyped<
  DarkModeProps,
  { change: CustomEvent<Theme> },
  Record<string, unknown>
> {}
