'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { primaryNav } from '@/constants/navigation'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className='sticky bottom-0 z-30 border-t border-border/70 bg-card/95 px-2 py-3 backdrop-blur'>
      <div className='grid grid-cols-5 gap-1'>
        {primaryNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition',
                active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-secondary'
              )}
            >
              <Icon className='size-4' />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}