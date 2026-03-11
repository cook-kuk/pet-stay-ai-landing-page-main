import { AppFrame } from '@/components/app/app-frame'
import { BundleCard } from '@/components/commerce/bundle-card'
import { ProductCard } from '@/components/commerce/product-card'
import { SectionHeader } from '@/components/shared/section-header'
import { bundles, recommendations, products } from '@/data/mock-db'

export default function DashboardRecommendationsPage() {
  return (
    <AppFrame title='추천' backHref='/dashboard'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Recommended next' title='몽이를 위한 추천' description='루틴, 커뮤니티, 쇼핑, 프리미엄 리포트를 하나의 추천 레일로 묶었습니다.' />
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className='rounded-[24px] border border-border/70 bg-card p-4 text-sm text-muted-foreground'>
            {String(recommendation.payload.title ?? recommendation.payload.reason ?? recommendation.payload.productId ?? recommendation.payload.groupId)}
          </div>
        ))}
        <ProductCard product={products[1]} />
        <BundleCard bundle={bundles[0]} />
      </div>
    </AppFrame>
  )
}