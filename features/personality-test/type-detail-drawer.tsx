'use client'

import Link from 'next/link'
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { personalityTypes } from '@/data/personality-types'
import type { PersonalitySlug } from '@/types/domain'

export function TypeDetailDrawer({ slug, triggerLabel }: { slug: PersonalitySlug; triggerLabel?: string }) {
  const type = personalityTypes.find((item) => item.slug === slug)
  if (!type) return null

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground'>
          {triggerLabel ?? `${type.name} 더보기`}
        </button>
      </DrawerTrigger>
      <DrawerContent className='mx-auto max-w-md rounded-t-[32px] border-border bg-background'>
        <DrawerHeader className='text-left'>
          <DrawerTitle className='text-2xl'>{type.name}</DrawerTitle>
          <DrawerDescription>{type.subtitle}</DrawerDescription>
        </DrawerHeader>
        <div className='space-y-5 overflow-y-auto px-4 pb-2 text-sm leading-6 text-muted-foreground'>
          <section>
            <p className='font-semibold text-foreground'>한줄 요약</p>
            <p className='mt-2'>{type.summary}</p>
          </section>
          <section>
            <p className='font-semibold text-foreground'>행동 특징</p>
            <div className='mt-2 flex flex-wrap gap-2'>
              {type.traits.map((trait) => (
                <span key={trait} className='rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'>
                  {trait}
                </span>
              ))}
            </div>
          </section>
          <section>
            <p className='font-semibold text-foreground'>혼자 있을 때 보이는 신호</p>
            <ul className='mt-2 space-y-1'>
              {type.aloneTimeSignals.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className='font-semibold text-foreground'>보호자가 자주 하는 실수</p>
            <ul className='mt-2 space-y-1'>
              {type.ownerMistakes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className='font-semibold text-foreground'>추천 루틴 3가지</p>
            <ul className='mt-2 space-y-1'>
              {type.routineRecommendations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className='font-semibold text-foreground'>잘 맞는 놀이 방식</p>
            <ul className='mt-2 space-y-1'>
              {type.playRecommendations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className='font-semibold text-foreground'>추천 아이템</p>
            <ul className='mt-2 space-y-1'>
              {type.shoppingRecommendations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
          <section>
            <p className='font-semibold text-foreground'>같은 유형 보호자 팁</p>
            <p className='mt-2'>첫 10분 루틴을 고정하고, 오늘 잘 된 행동을 한 줄로 남기면 다음 리포트 체감이 훨씬 좋아져요.</p>
          </section>
        </div>
        <DrawerFooter>
          <div className='grid grid-cols-3 gap-2'>
            <Link href='/chat' className='rounded-2xl bg-primary px-3 py-3 text-center text-xs font-semibold text-primary-foreground'>챗봇 상담</Link>
            <Link href={`/shop/type/${type.slug}`} className='rounded-2xl border border-border bg-card px-3 py-3 text-center text-xs font-semibold'>쇼핑 추천</Link>
            <Link href={`/community/type/${type.slug}`} className='rounded-2xl border border-border bg-card px-3 py-3 text-center text-xs font-semibold'>커뮤니티</Link>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}