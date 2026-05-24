# Sura Portfolio

Next.js + TypeScript + Tailwind CSS portfolio scaffold with Sanity CMS, Vercel-ready routing, SEO helpers, contact/revalidation API routes, and UI tokens inspired by `docs/DESIGN.md`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run sanity
```

Local app: `http://127.0.0.1:3000`

Sanity Studio route: `/admin`

## Environment

Copy `.env.example` to `.env.local` when real service values are ready.

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-24
SANITY_REVALIDATE_SECRET=
SANITY_READ_TOKEN=
RESEND_API_KEY=
CONTACT_RECEIVER_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Structure

```txt
app/                  App Router pages, API routes, SEO files
components/           Layout, section, project, and UI components
lib/                  Sanity client, queries, SEO, validators, utilities
sanity/               Studio structure and schema documents
types/                Shared TypeScript content types
docs/                 Design reference, project plan, and phase handoff docs
```

## Design Direction

Use `docs/DESIGN.md` as the source of truth for color, typography, spacing, surfaces, and button/card behavior. The page layout follows an Air-style product/workflow rhythm: strong headline, clear CTA, clean light surfaces, project evidence, and minimal decoration.

## Deploy Handoff

The local foundation is ready for deployment. To go live, create or connect a GitHub repository, import the project into Vercel, add the environment variables from `.env.example`, then use the preview deployment before configuring the production domain.
