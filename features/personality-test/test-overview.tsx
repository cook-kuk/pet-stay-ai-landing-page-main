import Link from 'next/link'
import { UploadCloud, WandSparkles } from 'lucide-react'
import { ResultCard } from '@/components/cards/result-card'
import { SectionHeader } from '@/components/shared/section-header'

export function TestOverview() {
  return (
    <div className='space-y-6'>
      <section className='rounded-[32px] bg-gradient-to-br from-orange-200 via-rose-100 to-white p-6'>
        <p className='text-sm font-semibold text-primary/70'>바이럴 진입</p>
        <h1 className='mt-2 text-3xl font-semibold leading-tight'>짧은 영상으로 우리 아이 성향을 분석하고, 바로 루틴까지 연결해요.</h1>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>업로드, 분석, 결과 카드 저장, 공유까지 한 번에 이어지는 퍼널을 설계했어요.</p>
        <div className='mt-5 grid grid-cols-2 gap-3'>
          <Link href='/test/upload' className='rounded-2xl bg-primary px-4 py-4 text-center text-sm font-semibold text-primary-foreground'>영상 올리기</Link>
          <Link href='/types' className='rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold'>타입 둘러보기</Link>
        </div>
      </section>
      <section className='space-y-3'>
        <SectionHeader eyebrow='Result card' title='현재 추천 결과 카드' description='공유 가능한 결과 카드와 같은 타입 커뮤니티까지 이어집니다.' />
        <ResultCard slug='clingy-lover' />
      </section>
      <section className='grid grid-cols-2 gap-3'>
        <div className='rounded-[28px] border border-border/70 bg-card p-4'>
          <UploadCloud className='size-5 text-primary' />
          <p className='mt-3 text-sm font-semibold'>업로드 플로우</p>
          <p className='mt-1 text-sm text-muted-foreground'>15초 영상, 체크리스트, 업로드 상태 추적</p>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-4'>
          <WandSparkles className='size-5 text-primary' />
          <p className='mt-3 text-sm font-semibold'>AI 해석</p>
          <p className='mt-1 text-sm text-muted-foreground'>성향, 루틴, 쇼핑, 커뮤니티까지 후속 액션 추천</p>
        </div>
      </section>
    </div>
  )
}