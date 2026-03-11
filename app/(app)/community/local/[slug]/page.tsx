import { notFound } from 'next/navigation'
import { AppFrame } from '@/components/app/app-frame'
import { CommunityPreview } from '@/features/community/community-preview'
import { groups, posts } from '@/data/mock-db'

export function generateStaticParams() {
  return groups.filter((group) => group.groupType === 'local').map((group) => ({ slug: group.slug }))
}

export default async function CommunityLocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const targetGroups = groups.filter((group) => group.groupType === 'local' && group.slug === slug)
  if (!targetGroups.length) notFound()
  const targetPosts = posts.filter((post) => targetGroups.some((group) => group.id === post.groupId))
  return (
    <AppFrame title='동네 산책 모임' backHref='/community'>
      <CommunityPreview groups={targetGroups} posts={targetPosts} />
    </AppFrame>
  )
}