import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { CommunityPreview } from '@/features/community/community-preview'
import { groups, posts } from '@/data/mock-db'

export default function CommunityPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Community' title='같은 타입, 같은 견종, 같은 동네와 연결되는 커뮤니티' description='질문, 후기, 산책 모임, AI 추천 그룹까지 모두 앱 안에서 이어져요.' />
        <CommunityPreview groups={groups} posts={posts} />
      </div>
    </PageShell>
  )
}