'use client'

import {
  ClipboardList,
  DoorOpen,
  HeartHandshake,
  ShoppingBag,
  Sparkles,
  FileText,
  Users,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CoachQuickAction } from '@/features/chat/types'

const iconMap = {
  sparkles: Sparkles,
  door: DoorOpen,
  report: FileText,
  shopping: ShoppingBag,
  heart: HeartHandshake,
  community: Users,
  share: Share2,
  clipboard: ClipboardList,
}

export function QuickActionsGrid({
  actions,
  onRun,
}: {
  actions: CoachQuickAction[]
  onRun: (action: CoachQuickAction) => void
}) {
  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold'>諛붾줈 ?ㅽ뻾?????덈뒗 肄붿튂 ?≪뀡</p>
          <p className='text-xs text-muted-foreground'>猷⑦떞, 由ы룷?? ?쇳븨, 怨듭쑀瑜????붾㈃?먯꽌 ?댁뼱媛????덉뼱??</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {actions.map((action) => {
          const Icon = iconMap[action.icon]
          return (
            <Button
              key={action.id}
              type='button'
              variant='outline'
              className='h-auto flex-col items-start rounded-[24px] border-border/70 bg-card/95 px-4 py-4 text-left shadow-sm'
              onClick={() => onRun(action)}
            >
              <span className='mb-3 inline-flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                <Icon className='size-4.5' />
              </span>
              <span className='text-sm font-semibold'>{action.label}</span>
              <span className='mt-1 text-xs leading-5 text-muted-foreground'>{action.description}</span>
            </Button>
          )
        })}
      </div>
    </section>
  )
}