'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Brain, LoaderCircle, ScanSearch, Sparkles } from 'lucide-react'

const stages = [
  { label: '행동 패턴 추출', icon: ScanSearch },
  { label: '혼자 있을 때 신호 정리', icon: Brain },
  { label: '성향 카드와 추천 연결', icon: Sparkles },
]

export function AnalyzingExperience() {
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    const ids = stages.map((_, index) => window.setTimeout(() => setActiveStage(index), index * 900))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [])

  return (
    <div className='space-y-6 text-center'>
      <div className='mx-auto flex size-24 items-center justify-center rounded-full bg-primary/10 text-primary'>
        <LoaderCircle className='size-10 animate-spin' />
      </div>
      <div>
        <h1 className='text-3xl font-semibold'>몽이의 행동을 읽고 있어요</h1>
        <p className='mt-3 text-sm leading-6 text-muted-foreground'>영상 분석 포인트와 성향 지표를 합쳐 결과 카드, 루틴, 쇼핑, 커뮤니티 동선까지 준비합니다.</p>
      </div>
      <div className='space-y-3 rounded-[32px] border border-border/70 bg-card p-5 text-left shadow-sm'>
        {stages.map((stage, index) => {
          const Icon = stage.icon
          const active = index <= activeStage
          return (
            <div key={stage.label} className='flex items-center gap-3 rounded-[20px] bg-secondary/40 px-4 py-4'>
              <div className={`rounded-2xl p-3 ${active ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'}`}>
                <Icon className='size-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-semibold'>{stage.label}</p>
                <p className='text-xs text-muted-foreground'>{active ? '분석 완료 또는 진행 중' : '대기 중'}</p>
              </div>
            </div>
          )
        })}
      </div>
      <Link href='/test/result/clingy-lover' className='rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground'>결과 화면으로 이동</Link>
    </div>
  )
}