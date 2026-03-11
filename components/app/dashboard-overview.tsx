import Link from 'next/link'
import { ArrowRight, Flame, Lock } from 'lucide-react'
import { dashboardShortcuts } from '@/constants/navigation'
import { ResultCard } from '@/components/cards/result-card'
import { StatCard } from '@/components/cards/stat-card'
import { ProductCard } from '@/components/commerce/product-card'
import { SectionHeader } from '@/components/shared/section-header'
import type { DashboardHighlight, PersonalitySlug, Product } from '@/types/domain'

export function DashboardOverview({ highlights, resultSlug, products }: { highlights: DashboardHighlight[]; resultSlug: PersonalitySlug; products: Product[] }) {
  return (
    <div className='space-y-6'>
      <section className='rounded-[32px] bg-gradient-to-br from-amber-200 via-orange-100 to-white p-5'>
        <p className='text-sm font-semibold text-primary/70'>오늘의 홈</p>
        <h1 className='mt-2 text-3xl font-semibold leading-tight'>몽이를 위한 오늘 루틴, 리포트, 추천을 한 번에 확인해요.</h1>
        <div className='mt-4 inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm'>
          <Flame className='size-3.5 text-primary' /> 5일 연속 루틴 달성 중
        </div>
      </section>
      <section className='grid grid-cols-2 gap-3'>
        {highlights.map((highlight) => (
          <StatCard key={highlight.title} title={highlight.title} value={highlight.value} caption={highlight.caption} />
        ))}
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Saved result' title='최근 성향 결과' description='결과 카드를 저장하고 공유 흐름까지 바로 이어집니다.' />
        <ResultCard slug={resultSlug} />
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Recommended shop' title='최근 본 추천 상품' description='성향 기반 추천과 목적형 번들을 쇼핑 동선에 맞게 연결했어요.' />
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <section className='grid gap-3'>
        {dashboardShortcuts.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className='flex items-center justify-between rounded-[24px] border border-border/70 bg-card px-4 py-4 shadow-sm'>
              <div className='flex items-center gap-3'>
                <span className='rounded-2xl bg-secondary p-3 text-primary'><Icon className='size-4' /></span>
                <span className='text-sm font-semibold'>{item.label}</span>
              </div>
              <ArrowRight className='size-4 text-muted-foreground' />
            </Link>
          )
        })}
        <div className='rounded-[24px] border border-dashed border-primary/40 bg-primary/5 px-4 py-4 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2 font-semibold text-foreground'><Lock className='size-4 text-primary' /> 프리미엄 예정 기능</div>
          주간 리포트 심화 해석, 가족 공유 권한 세분화, 파트너 서비스 연동이 들어갈 자리예요.
        </div>
      </section>
    </div>
  )
}