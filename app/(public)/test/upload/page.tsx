import Link from 'next/link'
import { UploadCloud, Video } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'

export default function TestUploadPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Upload' title='15초 영상으로 성향 분석 시작' description='짧은 영상을 올리면 성향, 루틴, 추천 커뮤니티까지 이어집니다.' />
        <div className='rounded-[32px] border border-dashed border-primary/40 bg-card p-8 text-center'>
          <UploadCloud className='mx-auto size-10 text-primary' />
          <p className='mt-4 text-lg font-semibold'>동영상 업로드 영역</p>
          <p className='mt-2 text-sm text-muted-foreground'>실서비스에서는 presigned upload와 분석 큐로 연결됩니다.</p>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-[24px] bg-secondary p-4 text-sm text-muted-foreground'><Video className='mb-3 size-5 text-primary' />권장 길이 10~20초</div>
          <div className='rounded-[24px] bg-secondary p-4 text-sm text-muted-foreground'>실내 놀이 / 귀가 후 / 혼자 있는 장면 중 하나 추천</div>
        </div>
        <Link href='/test/analyzing' className='rounded-2xl bg-primary px-4 py-4 text-center text-sm font-semibold text-primary-foreground'>분석 시작</Link>
      </div>
    </PageShell>
  )
}