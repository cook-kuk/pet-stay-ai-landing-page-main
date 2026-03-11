import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'

export default function IfIWereADogPage() {
  return (
    <PageShell className='px-4 py-5'>
      <SectionHeader eyebrow='Owner mirror' title='내가 강아지라면 어떤 타입일까?' description='보호자의 생활 패턴, 애정 표현, 외출 리듬을 기반으로 역궁합 콘텐츠를 구성합니다.' />
      <div className='mt-6 rounded-[32px] border border-border/70 bg-card p-6 text-sm leading-7 text-muted-foreground'>
        감정 표현이 풍부하고 귀가 후 교감 시간이 긴 보호자는 사랑직진러/껌딱지러버 타입과 궁합이 좋고, 일정이 안정적이면 루틴마스터와 더 편하게 맞춰집니다.
      </div>
    </PageShell>
  )
}