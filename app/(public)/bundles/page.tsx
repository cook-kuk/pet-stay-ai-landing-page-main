import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { BundleCard } from '@/components/commerce/bundle-card'
import { bundles } from '@/data/mock-db'

export default function BundlesPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Bundles' title='목적형 번들 모아보기' description='분리불안, 산책 만족도, 귀가 후 진정 등 목적 중심으로 번들을 묶었습니다.' />
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </PageShell>
  )
}