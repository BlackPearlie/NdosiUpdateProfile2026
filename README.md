# NDOSI Playwright Profile Upload

This repository contains a Playwright test that automates uploading a profile picture to the NDOSI automation site and validates related API endpoints.

## Setup

1. Add the following GitHub repository secrets under **Settings > Secrets and variables > Actions**:
	- `BASE_URL`: the application URL, for example `https://ndosisimplifiedautomation.vercel.app/`
	- `NDOSI_USERNAME`: the test account email
	- `NDOSI_PASSWORD`: the test account password
2. Install dependencies locally:

```bash
npm ci
npm run prepare
```

## Running Tests Locally

```bash
npx playwright test
```

For a CI-style headless run:

```bash
# macOS/Linux
CI=true npx playwright test

# Windows PowerShell
$env:CI = 'true'; npx playwright test
```

Generate the Allure report after a test run:

```bash
npm run report:allure
npx allure open allure-report
```

The Allure dashboard includes the overall pass percentage, passed/failed/flaky counts, duration, retries, test steps, endpoint attachments, and failure details.

## Test Coverage

The upload test:

- Logs in and navigates to the profile page.
- Uploads the configured profile image and saves the change.
- Validates the `POST https://www.ndosiautomation.co.za/APIDEV/profile/image` response.
- Requires `success: true` and the message `Profile image uploaded successfully`.
- Captures all `fetch` and `XHR` API responses used during the UI flow.
- Logs each endpoint and validates that its status code is below `400`.

The known `GET https://www.ndosiautomation.co.za/APIDEV/student/today` response currently returns `404`. It is logged as a non-blocking endpoint because it is unrelated to profile-image upload; all other captured endpoint failures remain test failures.

## Configuration

- `BASE_URL`, `NDOSI_USERNAME`, `NDOSI_PASSWORD`, and `PROFILE_PICTURE` can be supplied as environment variables.
- Defaults are defined in `src/utils/testData.ts`.
- The Playwright browser runs headed locally and in CI; CI uses `xvfb-run` to provide a virtual display.

## CI / GitHub Actions

The workflow is in `.github/workflows/ci.yml`. It runs on pushes to `main` and nightly at 00:00 SAST (22:00 UTC), uses Node 20, and runs the headed browser through `xvfb-run` on the Ubuntu runner.

## Artifacts

- HTML report: uploaded as `playwright-report` artifact
- Allure report: uploaded as `allure-report` artifact with pass percentage and test history data
