import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { personalityTypeMap } from '@/data/personality-types'
import type { PersonalitySlug } from '@/types/domain'

export function ResultCard({ slug }: { slug: PersonalitySlug }) {
  const type = personalityTypeMap[slug]
  return (
    <div className={`overflow-hidden rounded-[32px] bg-gradient-to-br ${type.accent} p-[1px] shadow-xl shadow-primary/10`}>
      <div className='rounded-[31px] bg-card/95 p-5'>
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary/60'>16가지 성향</p>
            <h3 className='text-2xl font-semibold'>{type.name}</h3>
            <p className='text-sm text-muted-foreground'>{type.subtitle}</p>
          </div>
          <Link href={`/test/result/${type.slug}`} className='rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground'>
            자세히
          </Link>
        </div>
        <p className='mt-4 text-sm leading-6 text-muted-foreground'>{type.summary}</p>
        <div className='mt-4 flex flex-wrap gap-2'>
          {type.tags.map((tag) => (
            <span key={tag} className='rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'>
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/community/type/${type.slug}`} className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary'>
          같은 타입 커뮤니티 보기 <ArrowRight className='size-4' />
        </Link>
      </div>
    </div>
  )
}