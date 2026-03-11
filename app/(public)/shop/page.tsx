import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { PersonalizedCommerce } from '@/features/commerce/personalized-commerce'

export default function ShopPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Commerce' title='개인화 추천 쇼핑' description='유형 기반 추천과 목적형 번들이 추천 이유와 함께 노출됩니다.' />
        <PersonalizedCommerce />
      </div>
    </PageShell>
  )
}