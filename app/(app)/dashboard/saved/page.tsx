import { AppFrame } from '@/components/app/app-frame'
import { ResultCard } from '@/components/cards/result-card'
import { ProductCard } from '@/components/commerce/product-card'
import { SectionHeader } from '@/components/shared/section-header'
import { products } from '@/data/mock-db'

export default function DashboardSavedPage() {
  return (
    <AppFrame title='저장함' backHref='/dashboard'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Saved cards' title='저장한 결과 카드' description='공유하거나 다시 읽고 싶은 성향 카드를 저장해두는 영역입니다.' />
        <ResultCard slug='clingy-lover' />
        <SectionHeader eyebrow='Saved products' title='저장한 상품' description='최근 찜한 추천 상품을 바로 이어서 볼 수 있어요.' />
        <ProductCard product={products[0]} />
      </div>
    </AppFrame>
  )
}