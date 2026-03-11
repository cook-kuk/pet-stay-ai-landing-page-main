import Link from 'next/link'
import { ArrowRight, Flame, Lock, MessageCircle, ShoppingBag, Users } from 'lucide-react'
import { DashboardHighlight, PersonalitySlug, Product } from '@/types/domain'
import { dashboardShortcuts } from '@/constants/navigation'
import { ResultCard } from '@/components/cards/result-card'
import { StatCard } from '@/components/cards/stat-card'
import { ProductCard } from '@/components/commerce/product-card'
import { SectionHeader } from '@/components/shared/section-header'
import { ReviewStrip } from '@/components/app/review-strip'
import { FamilySharingCard } from '@/components/app/family-sharing-card'

export function DashboardOverview({ highlights, resultSlug, products }: { highlights: DashboardHighlight[]; resultSlug: PersonalitySlug; products: Product[] }) {
  return (
    <div className='space-y-6'>
      <section className='rounded-[32px] bg-gradient-to-br from-amber-200 via-orange-100 to-white p-5'>
        <p className='text-sm font-semibold text-primary/70'>오늘의 홈</p>
        <h1 className='mt-2 text-3xl font-semibold leading-tight'>몽이를 위한 오늘 루틴, 귀가 후 리포트, 저장된 추천이 한 번에 보여요.</h1>
        <div className='mt-4 flex flex-wrap gap-2'>
          <span className='inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm'><Flame className='size-3.5 text-primary' /> 5일 연속 루틴 달성</span>
          <span className='inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm'><MessageCircle className='size-3.5 text-primary' /> AI 챗봇 3회 사용</span>
        </div>
      </section>
      <section className='grid grid-cols-2 gap-3'>
        {highlights.map((highlight) => (
          <StatCard key={highlight.title} title={highlight.title} value={highlight.value} caption={highlight.caption} />
        ))}
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Retention' title='왜 내일도 돌아오게 될까?' description='오늘의 루틴과 이번 주 변화, 저장한 결과 카드와 추천을 한곳에 묶었습니다.' />
        <div className='grid gap-3'>
          <Link href='/dashboard/today' className='rounded-[24px] border border-border/70 bg-card px-4 py-4 shadow-sm'>
            <p className='text-sm font-semibold'>오늘의 루틴</p>
            <p className='mt-1 text-sm text-muted-foreground'>외출 전 분리 연습과 귀가 후 진정 인사가 오늘 우선 과제예요.</p>
          </Link>
          <Link href='/dashboard/reports' className='rounded-[24px] border border-border/70 bg-card px-4 py-4 shadow-sm'>
            <p className='text-sm font-semibold'>귀가 후 AI 리포트</p>
            <p className='mt-1 text-sm text-muted-foreground'>초반 12분 현관 대기 후 후각 매트 집중. 지난주보다 안정 시간이 빨라졌어요.</p>
          </Link>
          <Link href='/dashboard/recommendations' className='rounded-[24px] border border-border/70 bg-card px-4 py-4 shadow-sm'>
            <p className='text-sm font-semibold'>추천 커뮤니티 + 최근 본 상품</p>
            <p className='mt-1 text-sm text-muted-foreground'>껌딱지러버 모임과 진정 노즈워크 매트를 다시 이어서 볼 수 있어요.</p>
          </Link>
        </div>
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Saved result' title='최근 성향 결과' description='저장, 공유, 커뮤니티 연결이 모두 결과 카드에서 이어집니다.' />
        <ResultCard slug={resultSlug} />
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Recent commerce' title='최근 본 추천 상품' description='타입 기반 추천과 목적형 번들을 장바구니 준비 단계까지 연결했습니다.' />
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <FamilySharingCard />
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
          <div className='flex items-center gap-2 font-semibold text-foreground'><Lock className='size-4 text-primary' /> 프리미엄 확장 예정</div>
          심화 리포트, 장기 변화 추적, 서비스 마켓플레이스, 가족 세부 권한 관리를 이어붙일 자리를 남겨뒀어요.
        </div>
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Trust' title='베타 사용자 반응' description='텍스트만 예쁜 랜딩이 아니라 다시 열게 되는 이유를 실제 사용 시나리오로 뒷받침합니다.' />
        <ReviewStrip />
      </section>
      <div className='sticky bottom-3 z-20 rounded-[28px] border border-border/70 bg-card/95 p-3 shadow-lg backdrop-blur'>
        <div className='grid grid-cols-3 gap-2'>
          <Link href='/chat' className='inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-3 py-3 text-xs font-semibold text-primary-foreground'><MessageCircle className='size-4' />챗봇</Link>
          <Link href='/community' className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 text-xs font-semibold'><Users className='size-4' />커뮤니티</Link>
          <Link href='/shop' className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 text-xs font-semibold'><ShoppingBag className='size-4' />쇼핑</Link>
        </div>
      </div>
    </div>
  )
}