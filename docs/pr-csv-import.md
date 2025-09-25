### Title
Admin CSV Import for Clubs and Events (Dry-run + Finalize with Missing Field Prompts)

### Summary
Adds a secure admin CSV import flow that supports two types: clubs and events. Admins can upload a CSV, perform a dry-run to preview parsing and identify missing required fields, specify default values or header mappings to fill gaps, and then finalize the import. This ensures robust parsing and prevents partial, invalid data inserts.

### Changes
- Backend: New `POST /api/import` route (multipart/form-data) supporting `type=clubs|events`, `dryRun`, `defaults` (JSON), `headerMap` (JSON).
- Backend: Validates admin via existing bearer token mechanism (`ADMIN_PASSWORD_HASH` or `DEV_ADMIN_PASSWORD` in development).
- Backend: CSV parsing with quoted field support and header handling; maps `clubSlug`/`clubName` to `clubId` automatically when importing events.
- Backend: Dry-run returns a summary of total rows, missing required fields with row indices, and a small sample of parsed rows.
- Frontend: `AdminPanel` gains a CSV Import section with file picker, type selector, dry-run button, finalize button, and inputs for defaults and simple header maps.
- Utils: Minimal CSV parser (`src/utils/csv.ts`) added for shared parsing logic (route uses an inline-safe version to avoid ESM issues in edge runtimes).
- Client: `ApiClient` extended with `postForm` for multipart uploads.

### Usage
1) Navigate to the admin panel, authenticate with your admin token (Bearer). The UI reads `admin_token` from `localStorage`.
2) Choose Import Type (Events or Clubs), select a `.csv` file.
3) Optionally provide defaults (e.g., default `clubId`), and header mappings when the CSV headers differ (e.g., map `Title` -> `title`).
4) Click Dry-run to preview: you'll see total rows, which rows are missing required fields, and a sample of parsed rows.
5) Add defaults to resolve missing fields (e.g., set a default `clubId` for events) and run Dry-run again until no critical missing fields remain.
6) Click Finalize to persist to the database. The UI will show the number of created rows.

### CSV Formats
Clubs CSV headers (flexible; use headerMap as needed):
- Required: `name`
- Optional: `slug`, `color`

Events CSV headers (flexible; use headerMap as needed):
- Required: `title`, `date`
- Club reference: any of `clubId`, `clubSlug`, or `clubName` (if missing, provide a default `clubId` in the UI). Import resolves `clubSlug` and `clubName` to an existing club.
- Optional: `time`, `description`, `location`

Notes:
- Date should be an ISO-like string (e.g., `2025-10-01`). Time is a string (`HH:mm`) or blank for all-day.
- Quoted fields and commas inside quotes are supported. Escaped quotes are supported via `""`.

### Security
- Uses existing admin auth: Bearer token checked against `ADMIN_PASSWORD_HASH` (bcrypt). In development, `DEV_ADMIN_PASSWORD` can be used, or if unset, requests are allowed with a warning (matching existing API behavior).

### Limitations / Future Enhancements
- Errors on duplicate clubs (same `slug`) are currently skipped silently during finalize to keep the import idempotent; can be expanded to report per-row errors.
- Recurrence import for events is not included in this iteration. Can be added later via additional fields (e.g., `recurrenceFrequency`, `recurrenceInterval`, etc.).
- Header mapping UI is basic (text inputs for common fields). A more general mapping editor could be added.

### Testing
- Verified dry-run and finalize paths for both clubs and events.
- Tested header mapping and default clubId resolution when CSV lacks a club reference.
- Confirmed that invalid/missing required fields are reported in dry-run and prevented from persisting until resolved.

### Env / Migration
- No new environment variables required beyond existing admin auth.
- No schema migration required.

### Screenshots
- AdminPanel: CSV Import section with dry-run summary (not included here).

