# PetStay AI

PetStay AI is a mobile-first, product-oriented consumer pet-tech prototype built on Next.js App Router.

## Product Experience
- Viral short-video dog personality test
- 16-type result card and deep type drawer experience
- Interactive upload, analyzing, and result flow
- AI chatbot with branching quick actions
- Today routine, after-leave reports, weekly progress, saved cards, recommendations
- Compatibility flow with owner selector and share-ready score
- Type / breed / local communities with join previews
- Personalized commerce with type-based products and purpose bundles
- Family sharing and sitter-access surfaces

## Tech
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- Framer Motion
- Mock-first service layer
- Prisma schema scaffold for PostgreSQL

## Main Structure
- `app/`: route-based public and signed-in app surfaces
- `components/`: app shell, cards, sheets/drawers, shared app UI
- `features/`: product modules by domain
- `constants/`, `types/`, `data/`, `services/`, `store/`, `actions/`, `api/`
- `prisma/`: schema and seed scaffold
- `db/`, `mocks/`: integration notes and seed exports

## Local Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Mock Seed Preview
```bash
npm run seed:mock
```

## Deployment
Configured for static export.

Cloudflare Pages:
- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`

## Notes
- Auth, payments, real video analysis workers, and real LLM/chat backends are mocked but structurally separated for future replacement.
- The current prototype is designed to feel app-like and reusable, not just promotional.