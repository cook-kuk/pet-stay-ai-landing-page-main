'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  LoaderCircle,
  Package,
  RefreshCcw,
  Save,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { CoachMessage, CoachRichBlock } from '@/features/chat/types'
import { cn } from '@/lib/utils'

interface RichMessageRendererProps {
  message: CoachMessage
  onChipClick: (label: string) => void
  onAction: (actionId: string) => void
  onToggleRoutine: (id: string) => void
  onRegenerate?: () => void
  onSave?: () => void
  onShare?: () => void
}

export function RichMessageRenderer({
  message,
  onChipClick,
  onAction,
  onToggleRoutine,
  onRegenerate,
  onSave,
  onShare,
}: RichMessageRendererProps) {
  const isAssistant = message.role === 'assistant'
  const isLoading = message.status === 'thinking' || message.status === 'streaming'
  const [contextOpen, setContextOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex', isAssistant ? 'justify-start' : 'justify-end')}
    >
      <div className={cn('w-full max-w-[92%] space-y-3', isAssistant ? '' : 'items-end')}>
        <div
          className={cn(
            'rounded-[28px] border px-4 py-4 shadow-sm',
            isAssistant ? 'border-border/70 bg-card/95 text-foreground' : 'border-primary/20 bg-primary text-primary-foreground'
          )}
        >
          {isAssistant ? (
            <div className='mb-3 flex items-center justify-between gap-3'>
              <div className='flex items-center gap-2 text-xs font-semibold text-muted-foreground'>
                <span className='inline-flex size-8 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                  {isLoading ? <LoaderCircle className='size-4 animate-spin' /> : <Sparkles className='size-4' />}
                </span>
                <div>
                  <p className='text-sm font-semibold text-foreground'>PetStay AI 코치</p>
                  <p>{message.source === 'llm' ? 'Claude가 실시간으로 답하고 있어요' : '제품 맥락을 반영한 스마트 코치 답변이에요'}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant={message.source === 'llm' ? 'default' : 'secondary'}>
                  {message.source === 'llm' ? 'LIVE LLM' : message.transport === 'fallback' ? 'FALLBACK' : 'SMART MOCK'}
                </Badge>
                {typeof message.confidence === 'number' ? (
                  <Badge variant='outline'>신뢰도 {(message.confidence * 100).toFixed(0)}%</Badge>
                ) : null}
              </div>
            </div>
          ) : null}

          <p className={cn('whitespace-pre-wrap text-sm leading-6', isAssistant ? 'text-foreground' : 'text-primary-foreground')}>{message.text}</p>

          {message.errorMessage ? (
            <div className='mt-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive'>
              <div className='flex items-start gap-2'>
                <AlertTriangle className='mt-0.5 size-4' />
                <div>
                  <p className='font-semibold'>실시간 Claude 응답이 잠시 불안정했어요.</p>
                  <p>{message.errorMessage}</p>
                </div>
              </div>
            </div>
          ) : null}

          <AnimatePresence>
            {message.blocks?.length ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-4 space-y-3'>
                {message.blocks.map((block, index) => (
                  <RichBlockCard key={`${block.type}-${index}`} block={block} onAction={onAction} onToggleRoutine={onToggleRoutine} />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {message.chips?.length ? (
            <div className='mt-4 flex flex-wrap gap-2'>
              {message.chips.map((chip) => (
                <button
                  key={chip}
                  type='button'
                  onClick={() => onChipClick(chip)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition',
                    isAssistant ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-white/15 text-white'
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          ) : null}

          {isAssistant ? (
            <div className='mt-4 space-y-3 border-t border-border/60 pt-4'>
              {message.suggestions?.length ? (
                <div className='grid gap-2'>
                  {message.suggestions.map((suggestion) => (
                    <div key={`${suggestion.label}-${suggestion.actionId ?? suggestion.href}`} className='rounded-2xl border border-border/70 bg-background/70 p-3'>
                      <div className='flex items-start justify-between gap-3'>
                        <div>
                          <p className='text-sm font-semibold'>{suggestion.label}</p>
                          <p className='mt-1 text-xs text-muted-foreground'>{suggestion.description}</p>
                        </div>
                        {suggestion.href ? (
                          <Button asChild size='sm'>
                            <Link href={suggestion.href}>열기</Link>
                          </Button>
                        ) : suggestion.actionId ? (
                          <Button size='sm' variant='secondary' onClick={() => onAction(suggestion.actionId!)}>
                            실행
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {message.contextUsed?.length ? (
                <Collapsible open={contextOpen} onOpenChange={setContextOpen} className='rounded-2xl border border-border/70 bg-background/70'>
                  <CollapsibleTrigger className='flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold'>
                    <span>현재 참고 중인 정보</span>
                    {contextOpen ? <ChevronUp className='size-4' /> : <ChevronDown className='size-4' />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className='space-y-2 border-t border-border/60 px-4 py-3 text-sm text-muted-foreground'>
                    {message.contextUsed.map((item) => (
                      <div key={item} className='rounded-xl bg-background px-3 py-2'>
                        {item}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : null}

              <div className='flex flex-wrap gap-2'>
                <Button size='sm' variant='outline' onClick={onSave}>
                  <Save className='size-4' /> 저장하기
                </Button>
                <Button size='sm' variant='outline' onClick={onShare}>
                  <Share2 className='size-4' /> 가족에게 공유
                </Button>
                <Button size='sm' variant='ghost' onClick={onRegenerate}>
                  <RefreshCcw className='size-4' /> 다시 생성
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

function RichBlockCard({
  block,
  onAction,
  onToggleRoutine,
}: {
  block: CoachRichBlock
  onAction: (actionId: string) => void
  onToggleRoutine: (id: string) => void
}) {
  if (block.type === 'profile-summary') {
    return (
      <Card className='gap-0 rounded-[24px] border-primary/10 bg-gradient-to-br from-primary/5 via-background to-secondary/20 py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 pb-6'>
          <div className='rounded-2xl bg-background/80 p-4 text-sm text-muted-foreground'>{block.mood}</div>
          <div className='grid grid-cols-3 gap-2'>
            {block.metrics.map((metric) => (
              <div key={metric.label} className='rounded-2xl border border-border/70 bg-background/80 p-3'>
                <p className='text-[11px] text-muted-foreground'>{metric.label}</p>
                <p className='mt-1 text-sm font-semibold'>{metric.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'routine-checklist') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          {block.items.map((item) => (
            <button
              key={item.id}
              type='button'
              onClick={() => onToggleRoutine(item.id)}
              className={cn('flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition hover:bg-secondary/40', item.completed ? 'border-primary/30 bg-primary/5' : 'border-border/70 bg-background/70')}
            >
              <span className={cn('mt-0.5 inline-flex size-5 items-center justify-center rounded-full border', item.completed ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background')}>
                {item.completed ? <CheckCircle2 className='size-3.5' /> : null}
              </span>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-2'>
                  <p className='text-sm font-semibold'>{item.title}</p>
                  {item.time ? <span className='text-xs text-muted-foreground'>{item.time}</span> : null}
                </div>
                <p className='mt-1 text-xs text-muted-foreground'>{item.description}</p>
              </div>
            </button>
          ))}
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'report-summary') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <CardTitle className='text-base'>{block.title}</CardTitle>
              <CardDescription>오늘 신호를 빠르게 이해할 수 있게 풀어드릴게요.</CardDescription>
            </div>
            <div className='rounded-2xl bg-primary/10 px-3 py-2 text-right'>
              <p className='text-[11px] text-muted-foreground'>리포트 점수</p>
              <p className='text-lg font-semibold text-primary'>{block.score}점</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          {block.highlights.map((highlight) => (
            <div key={highlight} className='rounded-2xl bg-secondary/60 px-4 py-3 text-sm'>{highlight}</div>
          ))}
          <div className='rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
            <p className='font-semibold'>오늘의 주의 포인트</p>
            <p className='mt-1'>{block.caution}</p>
          </div>
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'product-list') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          {block.products.map((product) => (
            <div key={product.id} className='rounded-[22px] border border-border/70 bg-background/70 p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <p className='text-sm font-semibold'>{product.name}</p>
                    {product.badge ? <Badge variant='secondary'>{product.badge}</Badge> : null}
                  </div>
                  <p className='mt-2 text-xs text-muted-foreground'>{product.reason}</p>
                  <p className='mt-2 text-xs text-primary'>잘 맞는 유형: {product.fitTypes.join(', ')}</p>
                </div>
                <Package className='size-5 text-primary' />
              </div>
              <div className='mt-3 flex items-center justify-between gap-3'>
                <div className='text-sm font-semibold'>
                  {product.discountPrice ? `${product.discountPrice.toLocaleString()}원` : `${product.price.toLocaleString()}원`}
                  {product.discountPrice ? <span className='ml-2 text-xs font-normal text-muted-foreground line-through'>{product.price.toLocaleString()}원</span> : null}
                </div>
                <Button size='sm' variant='outline' onClick={() => onAction('commerce')}>상품 보기</Button>
              </div>
            </div>
          ))}
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'bundle-list') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          {block.bundles.map((bundle) => (
            <div key={bundle.id} className='rounded-[22px] border border-border/70 bg-gradient-to-br from-secondary/30 via-background to-primary/5 p-4'>
              <div className='flex items-center justify-between gap-2'>
                <p className='text-sm font-semibold'>{bundle.name}</p>
                {bundle.badge ? <Badge>{bundle.badge}</Badge> : null}
              </div>
              <p className='mt-2 text-xs text-muted-foreground'>{bundle.description}</p>
              <p className='mt-2 text-xs text-primary'>구성: {bundle.items.join(' · ')}</p>
              <div className='mt-3 flex items-center justify-between'>
                <p className='text-sm font-semibold'>{bundle.price.toLocaleString()}원</p>
                <Button size='sm' variant='outline' onClick={() => onAction('commerce')}>번들 보기</Button>
              </div>
            </div>
          ))}
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'compatibility') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <CardTitle className='text-base'>{block.title}</CardTitle>
              <CardDescription>{block.card.ownerStyle}</CardDescription>
            </div>
            <div className='rounded-2xl bg-rose-50 px-3 py-2 text-right text-rose-600'>
              <p className='text-[11px]'>궁합 점수</p>
              <p className='text-lg font-semibold'>{block.card.score}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className='grid gap-3 pb-6'>
          <InfoList title='잘 맞는 포인트' icon={HeartHandshake} items={block.card.strengths} />
          <InfoList title='부딪히기 쉬운 순간' icon={AlertTriangle} items={block.card.frictionPoints} />
          <InfoList title='추천 상호작용' icon={Sparkles} items={block.card.suggestions} />
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'community-list') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          {block.groups.map((group) => (
            <div key={group.id} className='rounded-[22px] border border-border/70 bg-background/70 p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-sm font-semibold'>{group.name}</p>
                  <p className='mt-1 text-xs text-muted-foreground'>{group.description}</p>
                </div>
                <Badge variant='secondary'>{group.memberCount.toLocaleString()}명</Badge>
              </div>
              <div className='mt-3 flex flex-wrap gap-2'>
                {group.tags.map((tag) => (
                  <span key={tag} className='rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground'>{tag}</span>
                ))}
              </div>
              <div className='mt-3 space-y-2 rounded-2xl bg-secondary/40 p-3 text-xs text-muted-foreground'>
                {group.previewPosts.map((post) => (
                  <div key={post} className='flex items-start gap-2'>
                    <Users className='mt-0.5 size-3.5 text-primary' />
                    <span>{post}</span>
                  </div>
                ))}
              </div>
              <div className='mt-3 flex justify-end'>
                <Button size='sm' variant='outline' onClick={() => onAction('community')}>참여 보기</Button>
              </div>
            </div>
          ))}
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'share-card') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
          <CardDescription>{block.card.summary}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 pb-6'>
          <div className='rounded-2xl bg-background/70 p-4'>
            <p className='text-sm font-semibold'>{block.card.title}</p>
            <p className='mt-2 text-sm text-muted-foreground'>{block.card.summary}</p>
          </div>
          <div className='grid gap-2 sm:grid-cols-2'>
            <div className='rounded-2xl border border-border/70 p-4'>
              <p className='text-xs font-semibold text-muted-foreground'>공유 대상</p>
              <p className='mt-2 text-sm'>{block.card.recipients.join(', ')}</p>
            </div>
            <div className='rounded-2xl border border-border/70 p-4'>
              <p className='text-xs font-semibold text-muted-foreground'>꼭 전달할 체크</p>
              <ul className='mt-2 space-y-1 text-sm'>
                {block.card.checklist.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          {block.ctas?.length ? <InlineActions actions={block.ctas} onAction={onAction} /> : null}
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'warning') {
    return (
      <Card className='gap-0 rounded-[24px] border-amber-200 bg-amber-50 py-0'>
        <CardHeader>
          <CardTitle className='text-base text-amber-900'>{block.title}</CardTitle>
        </CardHeader>
        <CardContent className='pb-6 text-sm text-amber-900'>
          <ul className='space-y-2'>
            {block.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'progress') {
    return (
      <Card className='gap-0 rounded-[24px] py-0'>
        <CardHeader>
          <CardTitle className='text-base'>{block.title}</CardTitle>
        </CardHeader>
        <CardContent className='pb-6'>
          <div className='flex items-end justify-between gap-3'>
            <div>
              <p className='text-2xl font-semibold'>{block.value}</p>
              <p className='mt-1 text-sm text-primary'>{block.delta}</p>
            </div>
            <Badge variant='secondary'>이번 주 추세</Badge>
          </div>
          <p className='mt-3 text-sm text-muted-foreground'>{block.description}</p>
        </CardContent>
      </Card>
    )
  }

  if (block.type === 'expandable') {
    return (
      <Collapsible defaultOpen={false}>
        <Card className='gap-0 rounded-[24px] py-0'>
          <CardHeader>
            <CollapsibleTrigger className='flex w-full items-center justify-between text-left'>
              <div>
                <CardTitle className='text-base'>{block.title}</CardTitle>
                <CardDescription>{block.summary}</CardDescription>
              </div>
              <ChevronDown className='size-4 text-muted-foreground' />
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className='space-y-2 pb-6 text-sm text-muted-foreground'>
              {block.details.map((detail) => (
                <div key={detail} className='rounded-2xl bg-secondary/40 px-4 py-3'>
                  {detail}
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

  return null
}

function InlineActions({
  actions,
  onAction,
}: {
  actions: Array<{ label: string; href?: string; description: string; actionId?: string }>
  onAction: (actionId: string) => void
}) {
  return (
    <div className='grid gap-2 sm:grid-cols-2'>
      {actions.map((action) => (
        <div key={`${action.label}-${action.actionId ?? action.href}`} className='rounded-2xl border border-border/70 bg-background/70 p-3'>
          <p className='text-sm font-semibold'>{action.label}</p>
          <p className='mt-1 text-xs text-muted-foreground'>{action.description}</p>
          <div className='mt-3'>
            {action.href ? (
              <Button asChild size='sm' variant='outline'>
                <Link href={action.href}>열기</Link>
              </Button>
            ) : action.actionId ? (
              <Button size='sm' variant='outline' onClick={() => onAction(action.actionId!)}>
                실행
              </Button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

function InfoList({
  title,
  items,
  icon: Icon,
}: {
  title: string
  items: string[]
  icon: typeof Sparkles
}) {
  return (
    <div className='rounded-2xl border border-border/70 bg-background/70 p-4'>
      <div className='flex items-center gap-2 text-sm font-semibold'>
        <Icon className='size-4 text-primary' />
        {title}
      </div>
      <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}