import Link from 'next/link'
import { ShieldCheck, Users } from 'lucide-react'

export function FamilySharingCard() {
  return (
    <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-center gap-3'>
        <span className='rounded-2xl bg-primary/10 p-3 text-primary'><Users className='size-4' /></span>
        <div>
          <p className='text-sm font-semibold'>가족 공유 / 시터 접근</p>
          <p className='text-sm text-muted-foreground'>역할별 권한, 공유 리포트, 임시 체크리스트 접근까지 보여줍니다.</p>
        </div>
      </div>
      <div className='mt-4 grid gap-2 text-sm text-muted-foreground'>
        <div className='rounded-[20px] bg-secondary/50 px-4 py-3'>엄마 · 전체 보기 / 루틴 수정</div>
        <div className='rounded-[20px] bg-secondary/50 px-4 py-3'>시터 · 오늘 루틴 / 귀가 체크만 허용</div>
      </div>
      <Link href='/family' className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary'>
        <ShieldCheck className='size-4' /> 공유 관리 열기
      </Link>
    </div>
  )
}