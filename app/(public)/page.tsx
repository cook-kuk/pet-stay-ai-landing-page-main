import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroHome } from '@/components/app/hero-home'
import { CommerceShowcase } from '@/features/commerce/commerce-showcase'
import { CommunityPreview } from '@/features/community/community-preview'
import { CompatibilityOverview } from '@/features/compatibility/compatibility-overview'
import { TestOverview } from '@/features/personality-test/test-overview'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { bundles, groups, posts, products } from '@/data/mock-db'

export default function HomePage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-8'>
        <HeroHome />
        <TestOverview />
        <section className='space-y-3'>
          <SectionHeader eyebrow='Compatibility' title='보호자-강아지 궁합까지 바로 연결' description='성향 결과를 루틴과 관계 설계로 확장합니다.' />
          <CompatibilityOverview />
          <Link href='/compatibility' className='inline-flex items-center gap-2 text-sm font-semibold text-primary'>궁합 더 보기 <ArrowRight className='size-4' /></Link>
        </section>
        <section className='space-y-3'>
          <SectionHeader eyebrow='Community' title='커뮤니티는 장식이 아니라 리텐션 엔진' description='같은 타입, 같은 견종, 같은 동네의 실제 고민과 팁을 보게 됩니다.' />
          <CommunityPreview groups={groups.slice(0, 2)} posts={posts.slice(0, 2)} />
        </section>
        <section className='space-y-3'>
          <SectionHeader eyebrow='Commerce' title='상황과 타입에 맞는 추천 커머스' description='왜 이 상품이 맞는지 이유 텍스트까지 함께 보여줍니다.' />
          <CommerceShowcase products={products.slice(0, 2)} bundles={bundles.slice(0, 2)} />
        </section>
      </div>
    </PageShell>
  )
}