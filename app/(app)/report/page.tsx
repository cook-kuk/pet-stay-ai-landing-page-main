import { AppFrame } from '@/components/app/app-frame'
import { ReportList } from '@/features/report/report-list'
import { reports } from '@/data/mock-db'

export default function ReportPage() {
  return (
    <AppFrame title='리포트'>
      <ReportList reports={reports} />
    </AppFrame>
  )
}