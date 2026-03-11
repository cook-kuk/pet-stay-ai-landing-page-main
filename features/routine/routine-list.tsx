'use client'

import { CheckCircle2 } from 'lucide-react'
import type { RoutinePlan } from '@/types/domain'
import { useAppStore } from '@/store/app-store'

export function RoutineList({ plan }: { plan: RoutinePlan }) {
  const { completedRoutineIds, toggleRoutineItem } = useAppStore()

  return (
    <div className='space-y-3'>
      {plan.items.map((item) => {
        const completed = completedRoutineIds.includes(item.id)
        return (
          <button
            key={item.id}
            onClick={() => toggleRoutineItem(item.id)}
            className='flex w-full items-start gap-3 rounded-[24px] border border-border/70 bg-card p-4 text-left shadow-sm'
          >
            <CheckCircle2 className={`mt-0.5 size-5 ${completed ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <p className='text-sm font-semibold'>{item.title}</p>
                {item.time ? <span className='text-xs text-muted-foreground'>{item.time}</span> : null}
              </div>
              <p className='text-sm text-muted-foreground'>{item.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}