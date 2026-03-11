import { AppFrame } from '@/components/app/app-frame'
import { SectionHeader } from '@/components/shared/section-header'
import { routinePlans } from '@/data/mock-db'
import { RoutineList } from '@/features/routine/routine-list'

export default function DashboardTodayPage() {
  return (
    <AppFrame title='오늘의 루틴' backHref='/dashboard'>
      <SectionHeader eyebrow='Today routine' title='오늘의 루틴' description='오늘 바로 실행할 루틴을 완료 체크와 함께 관리합니다.' />
      <RoutineList plan={routinePlans[0]} />
    </AppFrame>
  )
}