import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { CommunityLive } from '@/features/community/community-live'

export default function CommunityPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Community' title='같은 유형, 같은 견종, 같은 동네가 연결되는 곳' description='Q&A, 루틴 공유, 산책 메이트, AI 추천 그룹까지 실제 참여형으로 구성했습니다.' />
        <CommunityLive />
      </div>
    </PageShell>
  )
}