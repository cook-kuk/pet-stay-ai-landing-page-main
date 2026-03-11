import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { personalityTypes } from '@/data/personality-types'

export default function TypesPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='16 types' title='16가지 성향 전체 보기' description='타입별 특징, 혼자 있을 때 신호, 루틴, 쇼핑 추천까지 구조화했습니다.' />
        <div className='grid gap-3'>
          {personalityTypes.map((type) => (
            <Link key={type.slug} href={`/types/${type.slug}`} className='rounded-[28px] border border-border/70 bg-card p-5'>
              <p className='text-sm font-semibold'>{type.name}</p>
              <p className='mt-2 text-sm text-muted-foreground'>{type.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  )
}