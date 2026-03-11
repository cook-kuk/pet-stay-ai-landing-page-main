'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, HeartHandshake, Share2 } from 'lucide-react'
import { personalityTypes } from '@/data/personality-types'
import { cn } from '@/lib/utils'

const ownerTypes = ['다정한 공감형', '루틴 철저형', '주말 액티비티형', '차분한 관찰형', '가족 중심형']

export function CompatibilityExperience() {
  const [selectedOwner, setSelectedOwner] = useState(ownerTypes[0])
  const [selectedDog, setSelectedDog] = useState(personalityTypes[1].slug)

  const score = useMemo(() => {
    const ownerScore = ownerTypes.indexOf(selectedOwner) * 4 + 76
    const dogScore = personalityTypes.findIndex((type) => type.slug === selectedDog)
    return Math.min(98, ownerScore + (dogScore % 5))
  }, [selectedDog, selectedOwner])

  const dog = personalityTypes.find((type) => type.slug === selectedDog) ?? personalityTypes[0]
  const top3 = dog.compatibleDogTypes.slice(0, 3).map((slug) => personalityTypes.find((type) => type.slug === slug)?.name)

  return (
    <div className='space-y-5'>
      <div className='rounded-[32px] border border-border/70 bg-card p-5 shadow-sm'>
        <p className='text-sm font-semibold text-primary/70'>보호자 선택</p>
        <div className='mt-3 flex flex-wrap gap-2'>
          {ownerTypes.map((owner) => (
            <button
              key={owner}
              onClick={() => setSelectedOwner(owner)}
              className={cn('rounded-full px-3 py-2 text-xs font-semibold', selectedOwner === owner ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground')}
            >
              {owner}
            </button>
          ))}
        </div>
        <p className='mt-5 text-sm font-semibold text-primary/70'>강아지 성향 선택</p>
        <div className='mt-3 grid grid-cols-2 gap-2'>
          {personalityTypes.slice(0, 8).map((type) => (
            <button
              key={type.slug}
              onClick={() => setSelectedDog(type.slug)}
              className={cn('rounded-[20px] border px-3 py-3 text-left text-xs font-medium', selectedDog === type.slug ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-card text-muted-foreground')}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className='rounded-[32px] bg-gradient-to-br from-rose-100 via-orange-50 to-white p-5 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-semibold text-primary/70'>궁합 점수</p>
            <h2 className='mt-2 text-4xl font-semibold'>{score}점</h2>
          </div>
          <div className='rounded-full bg-card px-4 py-2 text-xs font-semibold text-primary'>shareable card</div>
        </div>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>현재 조합은 {selectedOwner} 보호자와 {dog.name} 성향이 만나 안정감과 애정 표현 균형이 좋은 편이에요.</p>
      </div>

      <div className='grid gap-3'>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <div className='flex items-center gap-2 text-sm font-semibold'><HeartHandshake className='size-4 text-primary' /> 추천 상호작용 스타일</div>
          <p className='mt-3 text-sm text-muted-foreground'>귀가 후 바로 흥분을 키우기보다 30초 차분한 체크인 후 스킨십으로 연결하면 궁합 체감이 훨씬 좋아져요.</p>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>충돌 포인트</p>
          <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
            <li>• 일정이 자주 바뀌면 불안 신호가 커질 수 있어요.</li>
            <li>• 귀가 직후 과한 반응은 흥분 누적을 만들 수 있어요.</li>
            <li>• 혼자 있는 연습 없이 애정만 높이면 의존도가 올라갈 수 있어요.</li>
          </ul>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>우리 집에 맞는 성향 TOP3</p>
          <div className='mt-3 flex flex-wrap gap-2'>
            {top3.map((item) => item ? <span key={item} className='rounded-full bg-secondary px-3 py-2 text-xs font-semibold'>{item}</span> : null)}
          </div>
          <p className='mt-3 text-sm text-muted-foreground'>내가 강아지라면 {selectedOwner === '다정한 공감형' ? '사랑직진러' : '루틴마스터'}에 가까워요.</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <button className='rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground'>궁합 카드 저장</button>
          <button className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold'><Share2 className='size-4' /> 공유하기</button>
        </div>
        <button className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold'>더 잘 맞는 유형 보기 <ArrowUpRight className='size-4' /></button>
      </div>
    </div>
  )
}