# PetStay AI

PetStay AI is a production-oriented, mobile-first consumer pet-tech app foundation built on Next.js App Router.

## Product Scope
- Viral dog video personality test
- 16-type result card system
- AI chatbot explanation flow
- Today routine / pre-leave / after-return / 7-day plan
- After-leave and weekly reports
- Owner-dog compatibility
- Type / breed / local community
- Personalized commerce and bundles
- Family sharing and sitter-access scaffolding

## Tech
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- Mock-first service layer
- Prisma schema scaffold for PostgreSQL

## Key Folders
- `app/`: public entry routes and signed-in app routes
- `components/`: app shell, cards, chat, feed, commerce UI
- `features/`: personality test, chatbot, routine, report, compatibility, community, commerce, profiles
- `constants/`: navigation and product-level constants
- `types/`: domain types
- `data/`: personality system and mock app data
- `services/`: mock backend/service abstractions
- `store/`: persisted client app state
- `actions/`: server action scaffold
- `api/`: swappable API abstraction layer
- `prisma/`: schema and seed scaffold
- `db/`: schema notes
- `mocks/`: seed re-exports

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
This repo is configured for static export.

Cloudflare Pages settings:
- Framework preset: `None`
- Build command: `pnpm build`
- Build output directory: `out`

## Notes
- Real auth, payment, video analysis workers, and live AI inference are intentionally mocked/scaffolded.
- The architecture is organized so real services can replace mock service functions later.