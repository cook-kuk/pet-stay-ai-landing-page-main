'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter, Sparkles } from 'lucide-react'
import { groups, posts } from '@/data/mock-db'
import { cn } from '@/lib/utils'

const filters = ['전체', 'Q&A', '루틴 공유', '산책 메이트', 'AI 추천 그룹']

export function CommunityLive() {
  const [selected, setSelected] = useState(filters[0])

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 overflow-x-auto pb-1'>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelected(filter)}
            className={cn('shrink-0 rounded-full px-3 py-2 text-xs font-semibold', selected === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground')}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className='rounded-[28px] border border-dashed border-primary/40 bg-primary/5 p-4'>
        <div className='flex items-center gap-2 text-sm font-semibold'><Sparkles className='size-4 text-primary' /> AI 추천 그룹</div>
        <p className='mt-2 text-sm text-muted-foreground'>최근 저장한 결과 카드와 성수동 위치 기반으로 “껌딱지러버 모임”과 “성수 저녁 산책팟”을 우선 추천하고 있어요.</p>
      </div>
      {groups.map((group) => (
        <div key={group.id} className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-sm font-semibold'>{group.name}</p>
              <p className='mt-1 text-sm text-muted-foreground'>{group.description}</p>
            </div>
            <button className='rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground'>가입</button>
          </div>
          <div className='mt-3 flex items-center gap-2 text-xs text-muted-foreground'>
            <Filter className='size-3.5' /> {group.memberCount}명 · #{group.groupType}
          </div>
          <div className='mt-4 space-y-2'>
            {posts.filter((post) => post.groupId === group.id).slice(0, 2).map((post) => (
              <div key={post.id} className='rounded-[20px] bg-secondary/50 p-3'>
                <p className='text-sm font-semibold'>{post.title}</p>
                <p className='mt-1 text-xs leading-5 text-muted-foreground'>{post.content}</p>
              </div>
            ))}
          </div>
          <Link href={group.groupType === 'type' ? `/community/type/${group.slug}` : group.groupType === 'breed' ? `/community/breed/${group.slug}` : `/community/local/${group.slug}`} className='mt-4 inline-flex text-xs font-semibold text-primary'>그룹 자세히 보기</Link>
        </div>
      ))}
    </div>
  )
}