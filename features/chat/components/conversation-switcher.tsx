'use client'

import { useState } from 'react'
import { Clock3, MessageSquareMore, PencilLine, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { CoachConversation } from '@/features/chat/types'
import { cn } from '@/lib/utils'

export function ConversationSwitcher({
  conversations,
  activeConversationId,
  onSelect,
  onCreate,
  onRename,
}: {
  conversations: CoachConversation[]
  activeConversationId: string | null
  onSelect: (conversationId: string) => void
  onCreate: () => void
  onRename: (conversationId: string, title: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold'>대화별 기록</p>
          <p className='text-xs text-muted-foreground'>질문이 섞이지 않게 코칭 세션별로 따로 저장돼요.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
            <MessageSquareMore className='size-4' /> 전체 보기
          </Button>
          <Button size='sm' onClick={onCreate}>
            <Plus className='size-4' /> 새 대화
          </Button>
        </div>
      </div>

      <div className='flex gap-3 overflow-x-auto pb-1'>
        {conversations.slice(0, 5).map((conversation) => (
          <button
            key={conversation.id}
            type='button'
            onClick={() => onSelect(conversation.id)}
            className={cn(
              'min-w-[220px] rounded-[24px] border px-4 py-4 text-left shadow-sm transition',
              conversation.id === activeConversationId
                ? 'border-primary/30 bg-primary/5'
                : 'border-border/70 bg-card/95 hover:bg-secondary/30'
            )}
          >
            <div className='flex items-center justify-between gap-2'>
              <p className='line-clamp-1 text-sm font-semibold'>{conversation.title}</p>
              <span className='rounded-full bg-secondary px-2 py-1 text-[10px] text-secondary-foreground'>
                {conversation.messages.length}개 메시지
              </span>
            </div>
            <p className='mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground'>{conversation.preview}</p>
            <div className='mt-3 flex items-center gap-1 text-[11px] text-muted-foreground'>
              <Clock3 className='size-3.5' /> {formatRelative(conversation.updatedAt)}
            </div>
          </button>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='bottom' className='max-h-[82vh] rounded-t-[32px] p-0'>
          <SheetHeader className='border-b border-border/70 pb-4'>
            <div className='mx-auto mb-2 h-1.5 w-12 rounded-full bg-border/80' />
            <SheetTitle>대화 기록</SheetTitle>
            <SheetDescription>질문 주제별로 나눠서 다시 열어볼 수 있어요.</SheetDescription>
          </SheetHeader>
          <div className='space-y-3 overflow-y-auto px-4 pb-8 pt-3'>
            <Button className='w-full' onClick={() => { onCreate(); setOpen(false) }}>
              <Plus className='size-4' /> 새 대화 시작
            </Button>
            {conversations.map((conversation) => (
              <HistoryCard
                key={conversation.id}
                conversation={conversation}
                active={conversation.id === activeConversationId}
                onSelect={() => {
                  onSelect(conversation.id)
                  setOpen(false)
                }}
                onRename={(title) => onRename(conversation.id, title)}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

function HistoryCard({
  conversation,
  active,
  onSelect,
  onRename,
}: {
  conversation: CoachConversation
  active: boolean
  onSelect: () => void
  onRename: (title: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(conversation.title)

  return (
    <Card className={cn('rounded-[24px] py-0', active ? 'border-primary/30 bg-primary/5' : 'border-border/70 bg-card/95')}>
      <CardHeader>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0 flex-1'>
            {editing ? (
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className='w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm outline-none'
              />
            ) : (
              <CardTitle className='line-clamp-1 text-sm'>{conversation.title}</CardTitle>
            )}
            <p className='mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground'>{conversation.preview}</p>
          </div>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            onClick={() => {
              if (editing) {
                onRename(draft)
              }
              setEditing((previous) => !previous)
            }}
          >
            <PencilLine className='size-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-3 pb-5 text-xs text-muted-foreground'>
        <div>
          <p>{conversation.messages.length}개 메시지</p>
          <p className='mt-1'>{formatRelative(conversation.updatedAt)}</p>
        </div>
        <Button variant={active ? 'default' : 'outline'} size='sm' onClick={onSelect}>
          {active ? '현재 대화' : '열기'}
        </Button>
      </CardContent>
    </Card>
  )
}

function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.max(1, Math.round(diff / 60000))

  if (minutes < 60) return `${minutes}분 전`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.round(hours / 24)
  return `${days}일 전`
}