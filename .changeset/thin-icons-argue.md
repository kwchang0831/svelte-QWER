---
'@kwchang0831/svelte-qwer': patch
---

!updated: add origins and other settings to giscus

    + !breaking: Required to migrate `/usr/config/site.ts`
    + !breaking: Local dev will no longer loads giscus. Giscus will only load if the window.origin === site.url
