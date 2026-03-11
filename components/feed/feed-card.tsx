import type { CommunityPost } from '@/types/domain'

export function FeedCard({ post, groupName }: { post: CommunityPost; groupName: string }) {
  return (
    <article className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
      <div className='flex items-center justify-between text-xs text-muted-foreground'>
        <span>{groupName}</span>
        <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
      </div>
      <h3 className='mt-3 text-base font-semibold'>{post.title}</h3>
      <p className='mt-2 text-sm leading-6 text-muted-foreground'>{post.content}</p>
    </article>
  )
}