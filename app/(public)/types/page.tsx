import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { TypeGrid } from '@/features/personality-test/type-grid'

export default function TypesPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='16 personalities' title='16가지 성향 전체 탐색' description='모든 유형 카드를 바로 눌러 상세 바텀시트를 열고, 결과/쇼핑/커뮤니티로 이어갈 수 있어요.' />
        <TypeGrid />
      </div>
    </PageShell>
  )
}