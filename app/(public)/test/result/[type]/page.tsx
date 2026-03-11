import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ResultCard } from '@/components/cards/result-card'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { personalityTypeMap, personalityTypes } from '@/data/personality-types'
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
      <div className='space-y-6'>
        <ResultCard slug={type} />
        <SectionHeader eyebrow='Why this type' title='핵심 성향 포인트' description={detail.summary} />
        <div className='rounded-[30px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>혼자 있을 때 보이는 신호</p>
          <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
            {detail.aloneTimeSignals.map((signal) => (
              <li key={signal}>• {signal}</li>
            ))}
          </ul>
        </div>
        <div className='grid gap-3'>
          <Link href='/chat' className='rounded-2xl bg-primary px-4 py-4 text-center text-sm font-semibold text-primary-foreground'>AI 챗봇으로 이어가기</Link>
          <Link href='/dashboard/saved' className='rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold'>결과 카드 저장하기</Link>
        </div>
      </div>
    </PageShell>
  )
}