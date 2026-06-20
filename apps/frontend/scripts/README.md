# scripts

## push-content-types.mjs

Pushes the project's Optimizely content-type definitions
(`src/components/cms/**/*.opti-type.json`) to the **GA `/v1`** CMS Management API.

```bash
yarn push:types            # create/update all content types
yarn push:types --dry-run  # show the plan (create vs update), no writes
```

### Why this exists instead of `opti-cms types:push`

The bundled `@remkoj/optimizely-cms-cli` (5.3.x) `types:push` doesn't work against
this instance:

- it targets the **deprecated `/preview3`** endpoint and the legacy content-type
  model, which the current API rejects, and
- it fires one OAuth request **per type concurrently** (~40 at once), which trips
  undici's connect timeout and fails most pushes.

This script talks to `/v1` directly, **sequentially**, in the wire model the API
actually accepts (`baseType: "_component"`, `richText`, `isLocalized`/`isRequired`,
non-reserved property groups, `enum: [ { value, displayName } ]`).

The proper long-term fix is the `@remkoj/optimizely-*` **6.x** toolkit (targets
`/v1`) plus `types:pull` to regenerate the files — deferred because 6.x requires a
Next.js 16 + React 19 upgrade.

### Credentials

Read from `process.env` first, then `apps/frontend/.env.local`:

- `OPTIMIZELY_CMS_CLIENT_ID`
- `OPTIMIZELY_CMS_CLIENT_SECRET`
- `OPTIMIZELY_CMS_API_BASE` (optional, default `https://api.cms.optimizely.com`)

### Behavior

- Idempotent: `GET` each type, then `POST` to create or `PATCH` (merge-patch) to update.
- Exits non-zero if any type fails.
- Note: the API **blocks breaking changes** (property type/removal) on existing
  in-use types without a data-loss override, and may 500 on some legacy
  content-reference validation shapes. New types and non-breaking edits push cleanly;
  a full re-sync of all legacy types is a v6 `types:pull` concern.
