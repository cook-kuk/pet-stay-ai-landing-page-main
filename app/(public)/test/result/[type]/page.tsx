import { notFound } from 'next/navigation'
import { PageShell } from '@/components/shared/page-shell'
import { personalityTypeMap, personalityTypes } from '@/data/personality-types'
import { ResultExperience } from '@/features/personality-test/result-experience'
import type { PersonalitySlug } from '@/types/domain'

export function generateStaticParams() {
  return personalityTypes.map((type) => ({ type: type.slug }))
}

export default async function TestResultPage({ params }: { params: Promise<{ type: PersonalitySlug }> }) {
  const { type } = await params
  const detail = personalityTypeMap[type]
  if (!detail) notFound()

  return (
    <PageShell className='px-4 py-5'>
      <ResultExperience slug={type} />
    </PageShell>
  )
}