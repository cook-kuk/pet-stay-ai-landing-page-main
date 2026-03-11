import { FeedCard } from '@/components/feed/feed-card'
import type { CommunityGroup, CommunityPost } from '@/types/domain'

export function CommunityPreview({ groups, posts }: { groups: CommunityGroup[]; posts: CommunityPost[] }) {
  return (
    <div className='space-y-4'>
      <div className='grid gap-3'>
        {groups.map((group) => (
          <div key={group.id} className='rounded-[24px] border border-border/70 bg-card p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold'>{group.name}</p>
                <p className='mt-1 text-sm text-muted-foreground'>{group.description}</p>
              </div>
              <div className='rounded-full bg-secondary px-3 py-1 text-xs font-semibold'>{group.memberCount}명</div>
            </div>
          </div>
        ))}
      </div>
      <div className='space-y-3'>
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} groupName={groups.find((group) => group.id === post.groupId)?.name ?? '추천 그룹'} />
        ))}
      </div>
    </div>
  )
}