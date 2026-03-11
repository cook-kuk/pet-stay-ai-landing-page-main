import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { CommerceShowcase } from '@/features/commerce/commerce-showcase'
import { bundles, products } from '@/data/mock-db'

export default function ShopPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Commerce' title='타입 기반 추천 상품' description='왜 이 상품이 지금 필요한지 이유 텍스트까지 함께 보여줍니다.' />
        <CommerceShowcase products={products} bundles={bundles} />
      </div>
    </PageShell>
  )
}