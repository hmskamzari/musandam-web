@AGENTS.md

# Musandam Net — Next.js Website

Arabic news site for Musandam, Oman. Migrated from a 15-year-old vBulletin forum.

## Stack
- Next.js 16, TypeScript, Tailwind CSS 4
- PostgreSQL (pg pool in lib/db.ts)
- isomorphic-dompurify for HTML sanitization
- Tajawal Arabic font, RTL layout

## Routes
- `/` — Latest news grid (paginated)
- `/category/[slug]` — Articles by category
- `/article/[slug]` — Article detail with HTML content

## Database
```
DATABASE_URL=postgresql://user:pass@localhost:5432/musandam
```
Tables: `categories`, `articles`, `media`

## Images
Migrated vBulletin attachments go in `public/uploads/vb/`
New uploader images served from `https://www.musandam.net/up/uploads/`
