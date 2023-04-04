import { UserConfig } from '../../user/config/QWER.config.js';

export const initialize = async () => {
  await Promise.all(
    Object.values(UserConfig.languageConfig).map((lang) => {
      if (lang === 'svelte') {
        return import(`prism-svelte`);
      }

      if (lang) {
        return import(`prismjs/components/prism-${lang}.min.js`);
      }
    }),
  );
};
