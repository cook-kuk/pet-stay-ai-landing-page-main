# PetStay AI

PetStay AI is a mobile-first, product-oriented consumer pet-tech prototype built on Next.js App Router.

## Product Experience
- Viral short-video dog personality test
- 16-type result card and deep type drawer experience
- Interactive upload, analyzing, and result flow
- AI chatbot with branching quick actions and next-step cards
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
- Optional external Claude API gateway for live LLM integration

## Main Structure
- `app/`: route-based public and signed-in app surfaces
- `components/`: app shell, cards, sheets/drawers, shared app UI
- `features/`: product modules by domain
- `constants/`, `types/`, `data/`, `services/`, `store/`, `actions/`, `api/`
- `workers/`: external AI gateway example for secure Claude proxying
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

## Live Claude Mode
The site is statically exported, so the browser should not call Anthropic directly.
Use an external gateway and set:

```bash
NEXT_PUBLIC_AI_GATEWAY_URL=https://your-worker-or-api.example.com
```

If this value is empty, the chatbot uses the built-in smart mock assistant.

A Cloudflare Worker example is included in:
- `workers/anthropic-gateway.ts`

Recommended live setup:
1. Deploy the web app as-is to Cloudflare Pages.
2. Deploy the worker separately with `ANTHROPIC_API_KEY` configured as a secret.
3. Point `NEXT_PUBLIC_AI_GATEWAY_URL` at that worker URL.

## Deployment
Configured for static export.

Cloudflare Pages:
- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`

## Notes
- Auth, payments, real video analysis workers, and long-term memory are still mocked/scaffolded.
- The current prototype is designed to feel app-like and reusable, not just promotional.
- Live Claude support is architecturally prepared without exposing API keys in the client.