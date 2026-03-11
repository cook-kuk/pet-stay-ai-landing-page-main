import Link from 'next/link'
import { LoaderCircle } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'

export default function TestAnalyzingPage() {
  return (
    <PageShell className='justify-center px-4 py-10'>
      <div className='space-y-6 text-center'>
        <div className='mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary'>
          <LoaderCircle className='size-10 animate-spin' />
        </div>
        <div>
          <h1 className='text-3xl font-semibold'>몽이의 성향을 읽는 중이에요</h1>
          <p className='mt-3 text-sm leading-6 text-muted-foreground'>행동 패턴, 혼자 있는 반응, 에너지 흐름을 종합해서 16가지 성향 중 가장 가까운 타입을 찾고 있어요.</p>
        </div>
        <Link href='/test/result/clingy-lover' className='rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold'>결과 미리 보기</Link>
      </div>
    </PageShell>
  )
}