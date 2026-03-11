import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { CompatibilityOverview } from '@/features/compatibility/compatibility-overview'

export default function CompatibilityPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Compatibility' title='보호자-강아지 궁합 분석' description='타입별 마찰 포인트와 상호작용 팁을 앱 로직으로 연결합니다.' />
        <CompatibilityOverview />
      </div>
    </PageShell>
  )
}