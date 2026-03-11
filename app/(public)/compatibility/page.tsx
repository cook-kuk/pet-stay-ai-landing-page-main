import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { CompatibilityExperience } from '@/features/compatibility/compatibility-experience'

export default function CompatibilityPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Compatibility' title='보호자-강아지 궁합을 실제 제품 흐름으로' description='성향 선택, 궁합 점수, 추천 상호작용, 충돌 포인트, 공유 카드까지 모두 앱처럼 연결합니다.' />
        <CompatibilityExperience />
      </div>
    </PageShell>
  )
}