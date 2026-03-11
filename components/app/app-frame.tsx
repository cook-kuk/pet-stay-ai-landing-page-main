import { BottomNav } from '@/components/shell/bottom-nav'
import { PageShell } from '@/components/shared/page-shell'
import { TopBar } from '@/components/shell/top-bar'

export function AppFrame({ title, backHref, children }: { title: string; backHref?: string; children: React.ReactNode }) {
  return (
    <PageShell className='bg-gradient-to-b from-background via-background to-secondary/40'>
      <TopBar title={title} backHref={backHref} />
      <main className='flex-1 space-y-6 px-4 py-5'>{children}</main>
      <BottomNav />
    </PageShell>
  )
}