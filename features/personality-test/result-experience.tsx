'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BarChart3, Bookmark, MessageCircle, Share2, ShoppingBag, Users } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProductCard } from '@/components/commerce/product-card'
import { personalityTypeMap } from '@/data/personality-types'
import { groups, products, reports, routinePlans } from '@/data/mock-db'
import type { PersonalitySlug } from '@/types/domain'

export function ResultExperience({ slug }: { slug: PersonalitySlug }) {
  const type = personalityTypeMap[slug]
  const [saved, setSaved] = useState(false)
  const matchingProducts = products.filter((product) => product.typeSlugs.includes(slug)).slice(0, 3)
  const matchingGroups = groups.filter((group) => group.slug === slug || group.groupType !== 'type').slice(0, 2)
  const todayPlan = routinePlans[0]

  return (
    <div className='space-y-6'>
      <div className={`overflow-hidden rounded-[32px] bg-gradient-to-br ${type.accent} p-[1px] shadow-xl shadow-primary/10`}>
        <div className='rounded-[31px] bg-card p-5'>
          <div className='flex items-center gap-4'>
            <div className='flex size-20 items-center justify-center rounded-[24px] bg-secondary text-2xl font-semibold'>몽이</div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary/70'>분석 완료</p>
              <h1 className='mt-2 text-3xl font-semibold'>{type.name}</h1>
              <p className='mt-1 text-sm text-muted-foreground'>{type.subtitle}</p>
            </div>
          </div>
          <p className='mt-4 text-sm leading-6 text-muted-foreground'>{type.summary}</p>
          <div className='mt-5 grid gap-3'>
            <div>
              <div className='flex items-center justify-between text-sm font-medium'>
                <span>성향 적합도</span>
                <span>92%</span>
              </div>
              <div className='mt-2 h-2 rounded-full bg-secondary'>
                <div className='h-2 w-[92%] rounded-full bg-primary' />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between text-sm font-medium'>
                <span>혼자 있어도 회복하는 힘</span>
                <span>68%</span>
              </div>
              <div className='mt-2 h-2 rounded-full bg-secondary'>
                <div className='h-2 w-[68%] rounded-full bg-primary/80' />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between text-sm font-medium'>
                <span>보호자 반응 민감도</span>
                <span>88%</span>
              </div>
              <div className='mt-2 h-2 rounded-full bg-secondary'>
                <div className='h-2 w-[88%] rounded-full bg-accent' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Link href='/chat' className='rounded-[24px] bg-primary px-4 py-4 text-center text-sm font-semibold text-primary-foreground'>챗봇으로 설명 듣기</Link>
        <Link href='/dashboard/today' className='rounded-[24px] border border-border bg-card px-4 py-4 text-center text-sm font-semibold'>오늘 루틴 보기</Link>
        <Link href='/compatibility' className='rounded-[24px] border border-border bg-card px-4 py-4 text-center text-sm font-semibold'>궁합 보기</Link>
        <Link href={`/community/type/${slug}`} className='rounded-[24px] border border-border bg-card px-4 py-4 text-center text-sm font-semibold'>같은 유형 커뮤니티</Link>
      </div>

      <div className='grid gap-3'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center justify-between rounded-[26px] border border-border/70 bg-card px-4 py-4 text-left shadow-sm'>
              <div className='flex items-center gap-3'>
                <MessageCircle className='size-4 text-primary' />
                <div>
                  <p className='text-sm font-semibold'>챗봇으로 성향 상담</p>
                  <p className='text-xs text-muted-foreground'>빠른 질문, 다음 행동 추천, 루틴 연결</p>
                </div>
              </div>
              <span className='text-xs font-semibold text-primary'>열기</span>
            </button>
          </SheetTrigger>
          <SheetContent side='bottom' className='mx-auto max-w-md rounded-t-[32px]'>
            <SheetHeader>
              <SheetTitle>성향 챗봇 시작하기</SheetTitle>
              <SheetDescription>오늘 루틴, 집 비움 관리, 귀가 후 리포트, 쇼핑 추천까지 바로 이어집니다.</SheetDescription>
            </SheetHeader>
            <div className='space-y-3 px-4 pb-6 text-sm'>
              {['오늘 루틴 추천', '집비움 관리 팁', '귀가 후 리포트 설명', '쇼핑 추천', '궁합 분석', '커뮤니티 추천'].map((item) => (
                <Link key={item} href='/chat' className='block rounded-[22px] border border-border/70 bg-card px-4 py-4 font-medium'>
                  {item}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center justify-between rounded-[26px] border border-border/70 bg-card px-4 py-4 text-left shadow-sm'>
              <div className='flex items-center gap-3'>
                <Users className='size-4 text-primary' />
                <div>
                  <p className='text-sm font-semibold'>추천 커뮤니티 미리보기</p>
                  <p className='text-xs text-muted-foreground'>같은 유형, 견종, 동네 그룹을 함께 보여줘요.</p>
                </div>
              </div>
              <span className='text-xs font-semibold text-primary'>열기</span>
            </button>
          </SheetTrigger>
          <SheetContent side='bottom' className='mx-auto max-w-md rounded-t-[32px]'>
            <SheetHeader>
              <SheetTitle>추천 커뮤니티</SheetTitle>
              <SheetDescription>AI 추천 그룹 로직 기반으로 현재 타입에 맞는 참여 동선을 보여줍니다.</SheetDescription>
            </SheetHeader>
            <div className='space-y-3 px-4 pb-6'>
              {matchingGroups.map((group) => (
                <Link key={group.id} href={group.groupType === 'type' ? `/community/type/${group.slug}` : group.groupType === 'breed' ? `/community/breed/${group.slug}` : `/community/local/${group.slug}`} className='block rounded-[24px] border border-border/70 bg-card p-4'>
                  <p className='text-sm font-semibold'>{group.name}</p>
                  <p className='mt-1 text-xs text-muted-foreground'>{group.description}</p>
                  <p className='mt-2 text-xs font-semibold text-primary'>{group.memberCount}명 활동 중</p>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center justify-between rounded-[26px] border border-border/70 bg-card px-4 py-4 text-left shadow-sm'>
              <div className='flex items-center gap-3'>
                <ShoppingBag className='size-4 text-primary' />
                <div>
                  <p className='text-sm font-semibold'>쇼핑 추천 보기</p>
                  <p className='text-xs text-muted-foreground'>왜 이 타입에 맞는지 이유까지 함께 안내합니다.</p>
                </div>
              </div>
              <span className='text-xs font-semibold text-primary'>열기</span>
            </button>
          </SheetTrigger>
          <SheetContent side='bottom' className='mx-auto max-w-md rounded-t-[32px]'>
            <SheetHeader>
              <SheetTitle>타입 맞춤 쇼핑</SheetTitle>
              <SheetDescription>현재 결과와 연결된 추천 상품 3개를 먼저 보여줍니다.</SheetDescription>
            </SheetHeader>
            <div className='space-y-3 overflow-y-auto px-4 pb-6'>
              {matchingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className='flex items-center justify-between rounded-[26px] border border-border/70 bg-card px-4 py-4 text-left shadow-sm'>
              <div className='flex items-center gap-3'>
                <BarChart3 className='size-4 text-primary' />
                <div>
                  <p className='text-sm font-semibold'>AI 분석 포인트 보기</p>
                  <p className='text-xs text-muted-foreground'>빈 숫자가 아니라 실제 해석 포인트를 보여줍니다.</p>
                </div>
              </div>
              <span className='text-xs font-semibold text-primary'>열기</span>
            </button>
          </SheetTrigger>
          <SheetContent side='bottom' className='mx-auto max-w-md rounded-t-[32px]'>
            <SheetHeader>
              <SheetTitle>AI 분석 포인트</SheetTitle>
              <SheetDescription>영상에서 잡힌 패턴과 리포트 연결 근거 예시입니다.</SheetDescription>
            </SheetHeader>
            <div className='space-y-3 px-4 pb-6 text-sm'>
              <div className='rounded-[24px] bg-secondary p-4'>현관 대기 12분: 보호자 귀가 예측 민감도가 높음</div>
              <div className='rounded-[24px] bg-secondary p-4'>후각 과제 집중 8분: 진정 전환 루틴 반응이 좋음</div>
              <div className='rounded-[24px] bg-secondary p-4'>귀가 직후 꼬리 반응과 스킨십 요청: 애착형 재회 패턴이 뚜렷함</div>
              <div className='rounded-[24px] border border-dashed border-primary/40 bg-primary/5 p-4 text-muted-foreground'>최근 리포트: {reports[0]?.content}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className='sticky bottom-3 z-20 rounded-[28px] border border-border/70 bg-card/95 p-3 shadow-lg backdrop-blur'>
        <div className='grid grid-cols-2 gap-2'>
          <button onClick={() => setSaved((prev) => !prev)} className='inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold'>
            <Bookmark className='size-4' /> {saved ? '저장됨' : '결과 저장'}
          </button>
          <button className='inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground'>
            <Share2 className='size-4' /> 공유하기
          </button>
        </div>
        <div className='mt-2 rounded-2xl border border-border/70 bg-background px-4 py-3 text-xs text-muted-foreground'>
          오늘 추천 루틴: {todayPlan.items[1]?.title} · 지금 시작하면 귀가 후 리포트 정확도가 더 좋아져요.
        </div>
      </div>
    </div>
  )
}