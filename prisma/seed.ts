import { seedSummary } from '../data/mock-db'

async function main() {
  console.log('Seed preview ready for Prisma integration')
  console.log(JSON.stringify(seedSummary, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})