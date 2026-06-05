# Static deployment

johndusel.com is served as a **fully static site**. The client's content is
frozen (he's no longer composing posts), so the Django CMS is only needed at
**build time** as a content source. Next.js fetches the content via
`getStaticProps`/`getStaticPaths` and bakes it into HTML; the deployed result is
plain files behind Caddy's `file_server` — no Django, no DB, no containers at
runtime.

## What still has to exist

- **S3 bucket `johndusel.com`** (us-east-2): post-body images are absolute URLs
  like `https://s3.us-east-2.amazonaws.com/johndusel.com/production/images/...`,
  baked into the content. As long as the bucket stays public, images just work.
  Nothing else in AWS is needed.
- **A DB backup** to build from. Production SQLite backups live on the flexion
  NAS: `/mnt/{mirror1,storage}/Websites/johndusel.com/backups/db/johndusel_db_*.backup.sqlite3`.
- The **MailerLite** newsletter form (in `Hero.tsx`) posts directly to MailerLite
  — external, works fine on a static site.

## How it's wired for static

- `frontend/next.config.js`: `output: "export"` + `images: { unoptimized: true }`.
- `getStaticPaths` uses `fallback: false` (all pages known at build time).
- No `pages/api`, no `getServerSideProps` — nothing requires a runtime server.

## Build it (on any machine)

Prereqs: `uv` (backend), `node`/`npm` (frontend).

```bash
# 1. Grab a DB backup (once), e.g. from the flexion NAS:
scp flexion:/mnt/mirror1/Websites/johndusel.com/backups/db/johndusel_db_20260317.backup.sqlite3 /tmp/jd.sqlite3

# 2. Build the static site (starts a build-time backend, exports, stops it):
just build-static /tmp/jd.sqlite3      # or: scripts/build-static.sh /tmp/jd.sqlite3

# 3. Preview locally:
just preview-static                    # http://localhost:8081
```

Output is `frontend/out/`.

## Deploy to Hetzner

The site is served by the shared Caddy on the Hetzner box via the `deploy`
tooling's static-site flow (`PROJECT_TYPE=static`, atomic `releases/` + `current`
symlink). Ship `frontend/out/` as a new release, then point DNS:

- Caddy site block reverse-serves the release dir with `try_files {path} {path}.html {path}/ /404.html`
  (Next export emits extensionless routes as `<route>.html`).
- **DNS:** `johndusel.com` is on **Namecheap** — point the apex (and `www`) at the
  Hetzner IP `178.156.203.110`. Caddy fetches TLS automatically once DNS resolves.

## Editing content later

Content is frozen, but if the client ever needs a change:

1. Bring the backend up locally with the latest DB, edit via Django admin.
2. Re-run `just build-static` and redeploy `frontend/out/`.
3. The Django backend never has to be publicly hosted again.
