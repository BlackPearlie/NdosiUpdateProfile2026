# NDOSI Playwright Profile Upload

This repository contains a Playwright test that automates uploading a profile picture to the NDOSI automation site and validates related API endpoints.

Setup

1. Create repository and push these files (commit multiple times during development).
2. Add repository Secrets in GitHub: `BASE_URL`, `NDOSI_USERNAME`, `NDOSI_PASSWORD`.
3. Install dependencies locally:

```bash
npm ci
npm run prepare
```

Running tests locally

```bash
npx playwright test
```

What to update

- Update selectors in `src/selectors.ts` to match the target application.
- Update `BASE_URL` and credentials as GitHub secrets or environment variables.

CI / GitHub Actions

Workflows are in `.github/workflows/ci.yml`. Tests run on push to `main` and nightly at 00:00 SAST (cron schedule uses 22:00 UTC).

Artifacts

- HTML report: uploaded as `playwright-report` artifact
- `endpoints.json`: JSON log of API endpoints observed during the test

Notes

- The test captures non-GET network responses during the upload flow and asserts their status codes are < 400. Adjust filtering logic in `tests/upload-profile.spec.ts` if your app uses different request patterns.
- Replace selectors in `src/selectors.ts` with the app-specific ones before running.

-- commit: second update to README for repo push
