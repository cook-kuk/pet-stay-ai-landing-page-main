import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroHome } from '@/components/app/hero-home'
import { ReviewStrip } from '@/components/app/review-strip'
import { FamilySharingCard } from '@/components/app/family-sharing-card'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { PersonalizedCommerce } from '@/features/commerce/personalized-commerce'
import { CommunityLive } from '@/features/community/community-live'
import { CompatibilityExperience } from '@/features/compatibility/compatibility-experience'
import { TestOverview } from '@/features/personality-test/test-overview'
import { TypeGrid } from '@/features/personality-test/type-grid'

export default function HomePage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-8'>
        <HeroHome />
        <TestOverview />
        <section className='space-y-3'>
          <SectionHeader eyebrow='16 types' title='모든 유형 카드는 바로 열어볼 수 있어요' description='성향을 감정적으로 기억하게 만들고, 동시에 루틴/챗봇/커뮤니티/쇼핑으로 이어지게 했습니다.' />
          <TypeGrid />
        </section>
        <section className='space-y-3'>
          <SectionHeader eyebrow='Compatibility' title='궁합은 더 깊은 제품 흐름이 됩니다' description='보호자 성향 선택, 궁합 점수, 충돌 포인트, 추천 루틴, 공유 카드까지 연결됩니다.' />
          <CompatibilityExperience />
          <Link href='/compatibility' className='inline-flex items-center gap-2 text-sm font-semibold text-primary'>궁합 더 보기 <ArrowRight className='size-4' /></Link>
        </section>
        <section className='space-y-3'>
          <SectionHeader eyebrow='Community' title='커뮤니티는 살아 있는 리텐션 엔진' description='같은 유형/견종/동네 그룹과 Q&A, 루틴 공유 피드를 함께 볼 수 있습니다.' />
          <CommunityLive />
        </section>
        <section className='space-y-3'>
          <SectionHeader eyebrow='Commerce' title='추천 이유가 보이는 개인화 커머스' description='타입 기반 추천과 목적형 번들을 실제 쇼핑 동선처럼 강화했습니다.' />
          <PersonalizedCommerce />
        </section>
        <FamilySharingCard />
        <section className='space-y-3'>
          <SectionHeader eyebrow='Trust' title='사용 이유가 느껴지는 리뷰와 근거' description='실제 사용 시나리오, AI 분석 포인트, 공유 가치가 보여야 제품이 진짜처럼 느껴집니다.' />
          <ReviewStrip />
        </section>
      </div>
    </PageShell>
  )
}