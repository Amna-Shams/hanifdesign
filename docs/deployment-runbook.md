# Deployment & Launch Runbook

Owner-facing checklist for taking this site live. Everything here needs account
access or a decision — nothing is a code change.

---

## 1. Accounts and access required

| Item | Checklist ref | Who | Status |
|---|---|---|---|
| Hosting account (Vercel recommended) | #155 | Owner | ☐ |
| Domain registrar access | #156 | Owner | ☐ |
| Google Search Console property | #71, #127 | Owner | ☐ |
| Resend account + verified sending domain | #142, #149 | Owner | ☐ |
| (Optional) Google Analytics 4 property | #126 | Owner | ☐ |

## 2. Domain configuration

Before the site goes live, decide the **canonical host**. The site ships a
redirect that normalises everything to one host, configured from
`NEXT_PUBLIC_SITE_URL`.

```bash
# The host you want to be canonical. Everything else 308-redirects to it.
NEXT_PUBLIC_SITE_URL=https://hanifplanning.co.uk
```

- If you want `www.` canonical, set `https://www.hanifplanning.co.uk` instead.
- Set the domain's primary in the registrar to match, so the other variant
  resolves to the same place and the redirect handles it.

DNS records to create at the registrar:

| Type | Name | Value |
|---|---|---|
| A / ALIAS | `@` | Host's assigned IP (Vercel: `76.76.21.21`) |
| CNAME | `www` | Host's assigned domain (`cname.vercel-dns.com`) |

- [ ] #155 Production domain connected
- [ ] #156 DNS configured (A + CNAME above)
- [ ] #157 SSL active — let the host provision it; do not self-sign
- [ ] #158 www/non-www resolves to one canonical host (handled by config)
- [ ] #159 HTTP → HTTPS 308 (handled by config)

> The redirect rules are in `next.config.ts` and are skipped in development.
> They were tested live: `www` → apex returns 308, the apex returns 200 (no loop),
> and `x-forwarded-proto: http` returns 308 to https.

## 3. Environment variables

Copy `.env.example` into the hosting dashboard. **All three are read by the app.**

| Variable | Required | Consequence if missing |
|---|---|---|
| `DATABASE_URL` | Only if a DB is reintroduced | Currently unused — no DB in use |
| `RESEND_API_KEY` | **Yes, for forms to work** | Contact and quote return HTTP 503 and tell the visitor to email directly |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Defaults to `https://hanifplanning.co.uk`; drives metadata, canonicals, sitemap and redirect targets |

- [ ] #160 Environment variables set for production
- [ ] #162 Production database/API configured (Resend verified domain + key)

> **Do not commit a `.env` file.** `.env*` is already gitignored. Hand over
> credentials through the hosting dashboard or a password manager, never a
> document or email (see #165).

## 4. Pre-launch smoke test

Run against the deployed URL, not localhost:

- [ ] #171 Console errors — open every page, check DevTools
- [ ] #172 Broken links — click every internal link
- [ ] #173 404 page — visit a bogus URL, confirm a real 404 + branded page
- [ ] #174 SEO metadata — unique title + description per route
- [ ] #175 Sitemap — `/sitemap.xml` returns 200 with all routes
- [ ] #176 Forms — submit the contact form with a real address; confirm the email arrives
- [ ] #177 Mobile layout — check 320px and landscape
- [ ] #178 Performance — run Lighthouse / PageSpeed on the live URL
- [ ] #179 Favicon + social preview — check the og:image card
- [ ] #180 Final client approval

## 5. Known open items carried into launch

1. **Email delivery is unverified.** `RESEND_API_KEY` is unset, so both forms
   return 503 by design. This must be tested with a real submission (#142, #149).
2. **No analytics.** Zero third-party scripts is deliberate (best performance and
   privacy position), but it means no traffic data until #126 is decided.
3. **Competitor gap: no published fees.** Most competitors publish an indicative
   price range; we do not. Worth resolving before launch — see
   `docs/benchmark-research.md` §5.

## 6. Backup and recovery

The site is fully static output plus two stateless API routes — there is no
database and no file uploads, so **there is nothing on the server to lose**. That
is the single largest recovery risk reduction available and should be stated
plainly to the client.

| Item | Ref | Position |
|---|---|---|
| Website/server backup | #163 | ☐ Platform snapshot (Vercel: automatic, no action). Repo is the source of truth |
| Media/uploads backup | #164 | ☐ `public/` is committed to git, so images are versioned with the code |
| Client credentials handover | #165 | ☐ Use hosting dashboard + password manager. Never email or commit |
| Database backup | #166 | N/A — no database in use |
| Restore process | #167 | ☐ Documented below |

**Restore procedure**

1. `git clone` the repository.
2. `npm ci`
3. Set `NEXT_PUBLIC_SITE_URL` and `RESEND_API_KEY` in `.env.local`.
4. `npm run build && npm run start` — or push and let the host deploy.
5. Verify `/`, one service page, one project page, and a form submission.

Estimated time to a working site from the repository: **under 15 minutes.**

## 7. Go-live

- [ ] #181 Go live

Sequence:

1. Complete every box in §2–§4.
2. Submit `https://hanifplanning.co.uk/sitemap.xml` in Search Console.
3. Send the client the live URL and the §5 open items.
4. Keep the previous site reachable until the client confirms the new one.