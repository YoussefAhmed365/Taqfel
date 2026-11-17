# Memory — Translation Configuration Improvements

Last updated: 2026-11-17T13:15:48+02:00

## What was built

- Portal now uses `/en` and `/ar` as canonical locale routes, with legacy root/dashboard paths redirecting to `/en`.
- Portal language detection now reads the locale path, then `portal_lang` local storage, then the browser language.
- Portal dashboard and shell labels were moved into the existing `common` and `dashboard` i18next namespaces.
- Portal metadata title is translated through the i18next resources.
- Landing auth translations were migrated into the `AUTH` section of `messages/en.json` and `messages/ar.json`.
- Landing auth language state now uses next-intl route locale and navigation instead of independent React state.
- Landing metadata is generated per locale through the `META` message section.
- Landing-to-portal handoffs now open `/<locale>` instead of `?lang=`.
- The unused home `LanguageProvider` wrapper and obsolete standalone auth i18n files were removed.

## Decisions made

- Kept i18next in portal and next-intl in landing.
- Canonical locale URLs are `/en` and `/ar` in both apps.
- Local storage is not treated as shared state between apps; route URLs are the cross-app contract.

## Problems solved

- Auth language switching no longer diverges from the landing URL/server locale.
- Portal refreshes preserve the locale through the path rather than query-string state.
- Portal and landing metadata now follow the active locale.

## Current state

- Portal typecheck, lint, and production build pass.
- Landing typecheck and lint pass.
- Landing production compilation succeeds, but `next build` stops because the installed Next.js version triggers Next.js security-vulnerability upgrade enforcement.
- No security dependency upgrade was performed.

## Next session starts with

- Decide whether to run the requested Next.js security upgrade in the current checkout or a separate Git worktree, then rerun the landing production build.

## Open questions

- Whether to finish migrating remaining hardcoded demo/home strings in landing components into message keys.
- Whether to upgrade Next.js immediately using the security upgrade command.
