'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ContextPanel } from '@/features/chat/components/context-panel'
import { ConversationSwitcher } from '@/features/chat/components/conversation-switcher'
import { QuickActionsGrid } from '@/features/chat/components/quick-actions-grid'
import { RichMessageRenderer } from '@/features/chat/components/rich-message-renderer'
import { useAiCoach } from '@/features/chat/hooks/use-ai-coach'
import { surfaceLabels } from '@/features/chat/mock/coach-data'
import type { CoachSurface } from '@/features/chat/types'
import { Bot, Clock3, MessageSquareShare, Mic, Sparkles, Wand2 } from 'lucide-react'

const surfaceSummary: Record<CoachSurface, { title: string; description: string; href?: string; cta?: string }> = {
  coach: {
    title: '대화로 이어지는 AI 코치',
    description: '몽이의 성향, 루틴, 리포트, 쇼핑, 공유 상태를 모두 엮어서 지금 필요한 다음 행동을 정리해줘요.',
  },
  routine: {
    title: '오늘 루틴 커맨드 센터',
    description: '루틴 저장, 완료 체크, 가족 공유까지 한 번에 이어지는 영역이에요.',
    href: '/dashboard/today',
    cta: '루틴 전체 보기',
  },
  report: {
    title: '리포트 해설과 다음 개선안',
    description: '좋은 신호와 불안 신호를 분리해서 이해하고, 오늘의 개선 포인트까지 이어드려요.',
    href: '/dashboard/reports',
    cta: '리포트 전체 보기',
  },
  shop: {
    title: '성향 기반 쇼핑 추천',
    description: '상품 추천 이유, 맞는 유형, 번들 전환까지 한 흐름으로 보이게 만들었어요.',
    href: '/shop',
    cta: '샵 열기',
  },
  compatibility: {
    title: '궁합과 상호작용 방식 분석',
    description: '보호자 스타일과 몽이의 반응 패턴을 함께 보며, 잘 맞는 상호작용을 제안해줘요.',
    href: '/compatibility',
    cta: '궁합 전체 보기',
  },
  community: {
    title: '커뮤니티 추천과 참여 동선',
    description: '같은 성향, 견종, 지역 그룹을 비교해 보고 바로 이동할 수 있어요.',
    href: '/community',
    cta: '커뮤니티 열기',
  },
  share: {
    title: '가족 / 시터 공유 허브',
    description: '가족용 카드와 시터용 인수인계 요약을 대화 중 바로 만들 수 있어요.',
    href: '/family',
    cta: '공유 화면 보기',
  },
}

export function CoachExperience() {
  const {
    activeConversation,
    activeConversationId,
    activeDrawer,
    activeSurface,
    closeDrawer,
    composer,
    conversations,
    createNewConversation,
    drawerPreset,
    messages,
    pendingPrompt,
    quickActions,
    recentPrompts,
    renameConversation,
    runActionById,
    runQuickAction,
    saveLatestAnswer,
    selectConversation,
    sendPrompt,
    setActiveSurface,
    setComposer,
    shareLatestAnswer,
    shareNotice,
    snapshot,
    toggleRoutine,
    regenerateLast,
  } = useAiCoach()

  const activeSummary = surfaceSummary[activeSurface]
  const visibleMessages = useMemo(() => messages.slice(-8), [messages])

  return (
    <div className='space-y-5'>
      <section className='rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(244,166,73,0.18),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,248,240,0.98))] p-5 shadow-sm'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-16 rounded-[24px] border border-white/60 bg-primary/10'>
              <AvatarFallback className='rounded-[24px] bg-primary/10 text-lg font-semibold text-primary'>{snapshot.petAvatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='text-xl font-semibold tracking-tight'>{snapshot.petName} AI 코치</p>
                <Badge>{snapshot.trustLabel}</Badge>
                <Badge variant='secondary'>{activeConversation?.title ?? '새 코칭 대화'}</Badge>
              </div>
              <p className='mt-1 text-sm text-muted-foreground'>최근 성향은 {snapshot.personalityName}이고, 오늘은 {snapshot.moodSummary}</p>
            </div>
          </div>
          <div className='rounded-[24px] border border-primary/15 bg-white/90 px-4 py-3 text-right shadow-sm'>
            <p className='text-[11px] font-semibold text-muted-foreground'>현재 대화</p>
            <p className='mt-1 text-sm font-semibold text-primary'>{activeConversation?.messages.length ?? 0}개 메시지</p>
            <p className='mt-1 text-xs text-muted-foreground'>{activeConversation?.preview ?? '새로운 코칭을 시작해보세요.'}</p>
          </div>
        </div>

        <div className='mt-4 grid gap-3 sm:grid-cols-3'>
          <HeaderMetric label='최근 성향' value={snapshot.personalityName} caption='애착형 반응이 강하고 재결합 욕구가 커요.' />
          <HeaderMetric label='오늘 루틴 상태' value='3개 중 1개 완료' caption='외출 전 분리 연습과 귀가 후 인사가 남아 있어요.' />
          <HeaderMetric label='최근 집비움 리포트' value='82점 / 안정화 진행 중' caption='초반 12분 관리만 더 좋아지면 점수가 크게 오를 수 있어요.' />
        </div>
      </section>

      <ConversationSwitcher
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={selectConversation}
        onCreate={createNewConversation}
        onRename={renameConversation}
      />

      <ContextPanel snapshot={{ ...snapshot, recentPromptMemory: recentPrompts }} />

      {shareNotice ? (
        <div className='rounded-[24px] border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary'>
          {shareNotice}
        </div>
      ) : null}

      <Tabs value={activeSurface} onValueChange={(value) => setActiveSurface(value as CoachSurface)}>
        <div className='sticky top-[72px] z-10 -mx-4 overflow-x-auto bg-background/80 px-4 pb-2 backdrop-blur'>
          <TabsList className='h-auto min-w-max rounded-[22px] bg-card/90 p-1.5 shadow-sm'>
            {surfaceLabels.map((surface) => (
              <TabsTrigger key={surface.id} value={surface.id} className='rounded-[18px] px-3 py-2 text-xs'>
                {surface.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value='coach' className='space-y-4'>
          <MiniSurfaceCard
            title={activeSummary.title}
            description={activeSummary.description}
            onOpenDrawer={() => runActionById('routine')}
          />
          <QuickActionsGrid actions={quickActions} onRun={runQuickAction} />
          <CoachChatArea
            messages={visibleMessages}
            composer={composer}
            pendingPrompt={pendingPrompt}
            onChangeComposer={setComposer}
            onSubmit={() => sendPrompt(composer, 'coach')}
            onChipClick={(label) => sendPrompt(label, 'coach')}
            onAction={runActionById}
            onToggleRoutine={toggleRoutine}
            onRegenerate={regenerateLast}
            onSave={saveLatestAnswer}
            onShare={shareLatestAnswer}
          />
        </TabsContent>

        {surfaceLabels
          .filter((surface) => surface.id !== 'coach')
          .map((surface) => (
            <TabsContent key={surface.id} value={surface.id} className='space-y-4'>
              <MiniSurfaceCard
                title={surfaceSummary[surface.id].title}
                description={surfaceSummary[surface.id].description}
                href={surfaceSummary[surface.id].href}
                cta={surfaceSummary[surface.id].cta}
                onOpenDrawer={() => runActionById(surface.id === 'shop' ? 'commerce' : surface.id)}
              />
              <QuickActionsGrid
                actions={quickActions.filter((action) => action.surface === surface.id)}
                onRun={runQuickAction}
              />
              <CoachChatArea
                messages={visibleMessages}
                composer={composer}
                pendingPrompt={pendingPrompt}
                onChangeComposer={setComposer}
                onSubmit={() => sendPrompt(composer, surface.id)}
                onChipClick={(label) => sendPrompt(label, surface.id)}
                onAction={runActionById}
                onToggleRoutine={toggleRoutine}
                onRegenerate={regenerateLast}
                onSave={saveLatestAnswer}
                onShare={shareLatestAnswer}
              />
            </TabsContent>
          ))}
      </Tabs>

      <Sheet open={Boolean(activeDrawer)} onOpenChange={(open) => (!open ? closeDrawer() : null)}>
        <SheetContent side='bottom' className='max-h-[88vh] rounded-t-[32px] border-none p-0'>
          <SheetHeader className='border-b border-border/70 pb-4'>
            <div className='mx-auto mb-2 h-1.5 w-12 rounded-full bg-border/80' />
            <SheetTitle>{drawerPreset.title}</SheetTitle>
            <SheetDescription>{drawerPreset.description}</SheetDescription>
          </SheetHeader>
          <div className='space-y-4 overflow-y-auto px-4 pb-8 pt-2'>
            {drawerPreset.blocks.map((block, index) => (
              <RichMessageRenderer
                key={`${drawerPreset.surface}-${block.type}-${index}`}
                message={{
                  id: `${drawerPreset.surface}-${index}`,
                  role: 'assistant',
                  text: index === 0 ? drawerPreset.description : '추가 설명 카드예요.',
                  createdAt: new Date().toISOString(),
                  intent: mapSurfaceToIntent(drawerPreset.surface),
                  blocks: [block],
                  source: 'mock',
                  transport: 'mock',
                  status: 'ready',
                }}
                onChipClick={(label) => sendPrompt(label, drawerPreset.surface)}
                onAction={runActionById}
                onToggleRoutine={toggleRoutine}
                onRegenerate={regenerateLast}
                onSave={saveLatestAnswer}
                onShare={shareLatestAnswer}
              />
            ))}
            <div className='rounded-[24px] border border-border/70 bg-card/90 p-4'>
              <p className='text-sm font-semibold'>{drawerPreset.primaryAction.label}</p>
              <p className='mt-1 text-xs text-muted-foreground'>{drawerPreset.primaryAction.description}</p>
              <div className='mt-3'>
                {drawerPreset.primaryAction.href ? (
                  <Button asChild>
                    <Link href={drawerPreset.primaryAction.href}>{drawerPreset.primaryAction.label}</Link>
                  </Button>
                ) : drawerPreset.primaryAction.actionId ? (
                  <Button onClick={() => runActionById(drawerPreset.primaryAction.actionId!)}>{drawerPreset.primaryAction.label}</Button>
                ) : null}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function HeaderMetric({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className='rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-sm'>
      <p className='text-[11px] font-semibold text-muted-foreground'>{label}</p>
      <p className='mt-2 text-sm font-semibold'>{value}</p>
      <p className='mt-2 text-xs leading-5 text-muted-foreground'>{caption}</p>
    </div>
  )
}

function MiniSurfaceCard({
  title,
  description,
  href,
  cta,
  onOpenDrawer,
}: {
  title: string
  description: string
  href?: string
  cta?: string
  onOpenDrawer: () => void
}) {
  return (
    <Card className='rounded-[28px] border-border/70 bg-card/95 py-0 shadow-sm'>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='text-base'>{title}</CardTitle>
            <p className='mt-2 text-sm text-muted-foreground'>{description}</p>
          </div>
          <span className='inline-flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
            <Wand2 className='size-5' />
          </span>
        </div>
      </CardHeader>
      <CardContent className='flex flex-wrap gap-2 pb-6'>
        <Button variant='secondary' onClick={onOpenDrawer}>
          드로어 열기
        </Button>
        {href && cta ? (
          <Button asChild variant='outline'>
            <Link href={href}>{cta}</Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

function CoachChatArea({
  messages,
  composer,
  pendingPrompt,
  onChangeComposer,
  onSubmit,
  onChipClick,
  onAction,
  onToggleRoutine,
  onRegenerate,
  onSave,
  onShare,
}: {
  messages: ReturnType<typeof useAiCoach>['messages']
  composer: string
  pendingPrompt: string | null
  onChangeComposer: (value: string) => void
  onSubmit: () => void
  onChipClick: (label: string) => void
  onAction: (actionId: string) => void
  onToggleRoutine: (id: string) => void
  onRegenerate: () => void
  onSave: () => void
  onShare: () => void
}) {
  return (
    <div className='space-y-4'>
      <Card className='rounded-[30px] border-border/70 bg-card/95 py-0 shadow-sm'>
        <CardHeader className='border-b border-border/60 pb-4'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <div className='flex items-center gap-2'>
                <Bot className='size-4 text-primary' />
                <CardTitle className='text-base'>Claude 코칭 스레드</CardTitle>
              </div>
              <p className='mt-2 text-sm text-muted-foreground'>텍스트 답변만이 아니라 루틴 카드, 리포트 카드, 쇼핑 카드까지 함께 이어지는 화면이에요.</p>
            </div>
            <div className='flex items-center gap-2'>
              <Badge>Claude 기반</Badge>
              <Badge variant='secondary'>대화별 기록</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4 pb-6 pt-5'>
          {messages.length ? (
            messages.map((message) => (
              <RichMessageRenderer
                key={message.id}
                message={message}
                onChipClick={onChipClick}
                onAction={onAction}
                onToggleRoutine={onToggleRoutine}
                onRegenerate={onRegenerate}
                onSave={onSave}
                onShare={onShare}
              />
            ))
          ) : (
            <EmptyState />
          )}

          {pendingPrompt ? (
            <div className='space-y-3 rounded-[24px] border border-border/70 bg-background/70 p-4'>
              <div className='flex items-center gap-2 text-sm font-semibold'>
                <Sparkles className='size-4 text-primary' />
                Claude가 생각 중이에요
              </div>
              <p className='text-sm text-muted-foreground'>“{pendingPrompt}”를 기준으로 몽이의 성향과 최근 기록을 함께 보고 있어요.</p>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-3/4 rounded-full' />
                <Skeleton className='h-4 w-11/12 rounded-full' />
                <Skeleton className='h-16 w-full rounded-[22px]' />
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className='sticky bottom-[86px] rounded-[28px] border-primary/10 bg-card/95 py-0 shadow-lg'>
        <CardContent className='space-y-3 pb-5 pt-5'>
          <div className='flex items-center gap-2 text-sm font-semibold'>
            <Mic className='size-4 text-primary' />
            오늘 필요한 질문을 바로 던져보세요
          </div>
          <Textarea
            value={composer}
            onChange={(event) => onChangeComposer(event.target.value)}
            placeholder='예: 몽이를 기준으로 오늘 꼭 챙겨야 할 루틴과 귀가 후 인사법을 같이 정리해줘.'
            className='min-h-[112px] rounded-[22px] border-border/70 bg-background/70'
          />
          <div className='flex flex-wrap gap-2 text-xs text-muted-foreground'>
            <span className='inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5'><Clock3 className='size-3.5' /> 최근 프롬프트 기억</span>
            <span className='inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5'><MessageSquareShare className='size-3.5' /> 가족 / 시터 공유 가능</span>
            <span className='inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5'><Sparkles className='size-3.5' /> 쇼핑 / 커뮤니티 연동</span>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-xs text-muted-foreground'>새 대화로 시작하면 기록이 분리되고, 같은 대화 안에서는 문맥을 이어서 기억해요.</p>
            <Button onClick={onSubmit} disabled={!composer.trim()}>보내기</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState() {
  return (
    <div className='rounded-[24px] border border-dashed border-border/70 bg-background/70 p-5 text-center'>
      <p className='text-sm font-semibold'>아직 시작된 대화가 없어요</p>
      <p className='mt-2 text-sm text-muted-foreground'>오늘 루틴, 집비움 관리, 쇼핑 추천 중 하나부터 눌러보면 바로 코칭이 시작돼요.</p>
    </div>
  )
}

function mapSurfaceToIntent(surface: CoachSurface) {
  switch (surface) {
    case 'routine':
      return 'routine'
    case 'report':
      return 'report'
    case 'shop':
      return 'commerce'
    case 'compatibility':
      return 'compatibility'
    case 'community':
      return 'community'
    case 'share':
      return 'share'
    default:
      return 'general'
  }
}