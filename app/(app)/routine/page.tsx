import { AppFrame } from '@/components/app/app-frame'
import { SectionHeader } from '@/components/shared/section-header'
import { routinePlans } from '@/data/mock-db'
import { RoutineList } from '@/features/routine/routine-list'

export default function RoutinePage() {
  return (
    <AppFrame title='루틴'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Routine OS' title='오늘 루틴 / 외출 전 / 귀가 후 / 7일 플랜' description='일회성 테스트를 장기 사용 루틴으로 전환하는 retention 동선입니다.' />
        {routinePlans.map((plan) => (
          <section key={plan.id} className='space-y-3'>
            <p className='text-sm font-semibold'>{plan.title}</p>
            <RoutineList plan={plan} />
          </section>
        ))}
      </div>
    </AppFrame>
  )
}