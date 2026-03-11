import { cn } from '@/lib/utils'

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {eyebrow ? <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary/70'>{eyebrow}</p> : null}
      <div className='space-y-1'>
        <h2 className='text-2xl font-semibold tracking-tight text-foreground'>{title}</h2>
        {description ? <p className='text-sm leading-6 text-muted-foreground'>{description}</p> : null}
      </div>
    </div>
  )
}