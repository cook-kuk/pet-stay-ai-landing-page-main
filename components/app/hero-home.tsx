import Link from 'next/link'
import { ArrowRight, Sparkles, Upload } from 'lucide-react'
import { premiumHooks } from '@/constants/product'

export function HeroHome() {
  return (
    <section className='rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(255,180,121,0.55),_transparent_38%),linear-gradient(180deg,#fff8f1_0%,#fff 72%)] p-6 shadow-sm'>
      <div className='inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-semibold text-primary shadow-sm'>
        <Sparkles className='size-3.5' /> PetStay AI
      </div>
      <h1 className='mt-4 text-4xl font-semibold leading-[1.1] tracking-tight'>강아지 성향 테스트에서 끝나지 않는 반려생활 운영 앱</h1>
      <p className='mt-4 text-sm leading-7 text-muted-foreground'>짧은 영상 업로드로 16가지 성향을 분석하고, 결과 카드, AI 챗봇, 오늘의 루틴, 귀가 후 리포트, 커뮤니티, 맞춤 쇼핑까지 한 번에 이어집니다.</p>
      <div className='mt-6 grid grid-cols-2 gap-3'>
        <Link href='/test/upload' className='inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground'>
          <Upload className='size-4' /> 영상 올리기
        </Link>
        <Link href='/dashboard' className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold'>
          앱 보기 <ArrowRight className='size-4' />
        </Link>
      </div>
      <div className='mt-6 grid gap-2'>
        {premiumHooks.map((hook) => (
          <div key={hook} className='rounded-2xl bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm'>
            {hook}
          </div>
        ))}
      </div>
    </section>
  )
}