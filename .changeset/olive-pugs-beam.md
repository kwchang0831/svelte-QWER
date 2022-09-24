---
'@kwchang0831/qwer': minor
'@kwchang0831/svelte-qwer': minor
---

!feat: add special routing rule PostsYearMonthDate

migrate: `QWER.config.js`

```diff
export const UserConfig = {
  ...

+  RoutingRules: {
+    PostsYearMonthDate: false,
+  },
};
```
