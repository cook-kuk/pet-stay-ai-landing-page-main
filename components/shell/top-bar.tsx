import Link from 'next/link'
import { ChevronLeft, Bell } from 'lucide-react'

export function TopBar({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between border-b border-border/60 bg-background/90 px-4 py-4 backdrop-blur'>
      <div className='flex items-center gap-3'>
        {backHref ? (
          <Link href={backHref} className='rounded-full border border-border/70 p-2 text-muted-foreground'>
            <ChevronLeft className='size-4' />
          </Link>
        ) : null}
        <div>
          <p className='text-base font-semibold'>{title}</p>
        </div>
      </div>
      <button className='rounded-full border border-border/70 p-2 text-muted-foreground'>
        <Bell className='size-4' />
      </button>
    </div>
  )
}