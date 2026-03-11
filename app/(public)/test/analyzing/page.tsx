import { PageShell } from '@/components/shared/page-shell'
import { AnalyzingExperience } from '@/features/personality-test/analyzing-experience'

export default function TestAnalyzingPage() {
  return (
    <PageShell className='justify-center px-4 py-8'>
      <AnalyzingExperience />
    </PageShell>
  )
}