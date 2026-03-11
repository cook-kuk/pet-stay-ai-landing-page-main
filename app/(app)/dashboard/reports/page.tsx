import { AppFrame } from '@/components/app/app-frame'
import { SectionHeader } from '@/components/shared/section-header'
import { reports } from '@/data/mock-db'
import { ReportList } from '@/features/report/report-list'

export default function DashboardReportsPage() {
  return (
    <AppFrame title='리포트' backHref='/dashboard'>
      <SectionHeader eyebrow='Reports' title='리포트 모아보기' description='귀가 후 리포트, 이번 주 변화, 성향 추이를 한곳에 모았습니다.' />
      <ReportList reports={reports} />
    </AppFrame>
  )
}