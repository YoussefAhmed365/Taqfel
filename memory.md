# Memory — Landing Lint Cleanup

Last updated: 2026-11-16T09:05:22+02:00

## What was built

- Cleaned all reported landing ESLint findings across auth, home, UI, i18n,
  route, and auth-service files.
- Replaced internal navigation assignments with Next.js router/Link usage while
  preserving locale paths and the portal handoff.
- Replaced explicit `any` usages with existing message/domain types and narrow
  timer/item types.
- Removed unused imports, variables, and parameters, and refactored the
  two-factor and dashboard state flows to avoid linted synchronous effect
  updates.

## Decisions made

- Kept the portal handoff as a full-page navigation because it targets a
  separate app URL; internal landing routes use Next.js client navigation.
- Preserved dashboard local-storage hydration timing by deferring the initial
  company read through `requestAnimationFrame`.

## Problems solved

- `pnpm --filter landing lint` initially reported 10 errors and 31 warnings.
- The final lint run exits successfully with zero errors and zero warnings.
- The landing TypeScript check also exits successfully.

## Current state

- Landing lint and type validation pass.
- `git diff --check` passes.
- The worktree contains unrelated pre-existing changes; they were not reverted
  or modified as part of this cleanup.

## Next session starts with

- Continue wiring the mock `authService` to actual backend endpoints and verify
  session/cookie handling across the landing and portal apps.

## Open questions

- Decide whether production JWT sessions should be handled by Next.js Middleware
  or shared client-side context/cookies across the landing and portal apps.
- Confirm the final backend authentication and onboarding routes.
