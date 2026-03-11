import { notFound } from 'next/navigation'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { personalityTypeMap, personalityTypes } from '@/data/personality-types'
import type { PersonalitySlug } from '@/types/domain'

export function generateStaticParams() {
  return personalityTypes.map((type) => ({ slug: type.slug }))
}

export default async function TypeDetailPage({ params }: { params: Promise<{ slug: PersonalitySlug }> }) {
  const { slug } = await params
  const detail = personalityTypeMap[slug]
  if (!detail) notFound()

  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Type detail' title={detail.name} description={detail.subtitle} />
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>보호자가 자주 놓치는 포인트</p>
          <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
            {detail.ownerMistakes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>추천 루틴</p>
          <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
            {detail.routineRecommendations.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  )
}