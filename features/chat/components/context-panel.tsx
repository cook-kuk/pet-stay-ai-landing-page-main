'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, Database, Sparkles } from 'lucide-react'
import type { CoachContextSnapshot } from '@/features/chat/types'

export function ContextPanel({ snapshot }: { snapshot: CoachContextSnapshot }) {
  return (
    <Collapsible className='rounded-[28px] border border-border/70 bg-card/90 shadow-sm'>
      <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-5 py-4 text-left'>
        <div className='flex items-center gap-3'>
          <span className='inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <Database className='size-5' />
          </span>
          <div>
            <p className='text-sm font-semibold'>현재 참고 중인 정보</p>
            <p className='text-xs text-muted-foreground'>Claude가 답변에 반영하는 개인화 맥락을 한눈에 볼 수 있어요.</p>
          </div>
        </div>
        <ChevronDown className='size-4 text-muted-foreground' />
      </CollapsibleTrigger>
      <CollapsibleContent className='space-y-4 border-t border-border/60 px-5 py-5'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <ContextItem label='반려견 이름' value={snapshot.petName} />
          <ContextItem label='최근 성향 결과' value={snapshot.personalityName} />
          <ContextItem label='최근 업로드 영상 결과' value={snapshot.latestVideoResult} />
          <ContextItem label='최근 루틴 상태' value={snapshot.routineStatus} />
          <ContextItem label='최근 리포트 요약' value={snapshot.latestReportSummary} />
          <ContextItem label='저장한 추천 상품' value={snapshot.savedProductSummary} />
          <ContextItem label='가족 공유 상태' value={snapshot.familySharingSummary} />
          <ContextItem label='이번 주 변화' value={snapshot.weeklyProgress} />
        </div>
        <div className='rounded-2xl bg-secondary/50 p-4'>
          <div className='flex items-center gap-2'>
            <Sparkles className='size-4 text-primary' />
            <p className='text-sm font-semibold'>최근 기억 중인 질문</p>
          </div>
          <div className='mt-3 flex flex-wrap gap-2'>
            {snapshot.recentPromptMemory.map((item) => (
              <Badge key={item} variant='secondary'>
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-2xl border border-border/70 bg-background/70 p-4'>
      <p className='text-[11px] font-semibold text-muted-foreground'>{label}</p>
      <p className='mt-2 text-sm leading-6'>{value}</p>
    </div>
  )
}