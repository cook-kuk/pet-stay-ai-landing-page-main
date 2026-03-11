import { personalityTypeMap } from '@/data/personality-types'
import type { PersonalitySlug } from '@/types/domain'

export function CompatibilityOverview({ slug = 'clingy-lover' as PersonalitySlug }: { slug?: PersonalitySlug }) {
  const type = personalityTypeMap[slug]
  return (
    <div className='space-y-4'>
      <div className='rounded-[30px] border border-border/70 bg-card p-5'>
        <p className='text-sm font-semibold text-primary/70'>우리 집 궁합</p>
        <h2 className='mt-2 text-xl font-semibold'>{type.name}와 가장 잘 맞는 보호자</h2>
        <div className='mt-4 flex flex-wrap gap-2'>
          {type.compatibleOwnerTypes.map((item) => (
            <span key={item} className='rounded-full bg-secondary px-3 py-2 text-xs font-medium'>{item}</span>
          ))}
        </div>
      </div>
      <div className='rounded-[30px] border border-border/70 bg-card p-5'>
        <p className='text-sm font-semibold'>자주 생기는 마찰 포인트</p>
        <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
          {type.ownerMistakes.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}