import { PageShell } from '@/components/shared/page-shell'
import { TestOverview } from '@/features/personality-test/test-overview'

export default function TestPage() {
  return (
    <PageShell className='px-4 py-5'>
      <TestOverview />
    </PageShell>
  )
}