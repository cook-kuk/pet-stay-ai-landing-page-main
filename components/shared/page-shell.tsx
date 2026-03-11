import { cn } from '@/lib/utils'

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto flex min-h-screen w-full max-w-md flex-col bg-background', className)}>{children}</div>
  )
}