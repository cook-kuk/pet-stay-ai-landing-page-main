'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CheckCircle2, Film, LoaderCircle, UploadCloud, Video } from 'lucide-react'
import { motion } from 'framer-motion'

const checklist = [
  '강아지 전신 또는 주요 행동이 잘 보여요',
  '10초 이상, 20초 이하 길이예요',
  '혼자 있을 때 / 귀가 후 / 산책 전후 중 하나가 담겼어요',
]

export function UploadFlow() {
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [checked, setChecked] = useState<string[]>([checklist[0], checklist[1]])

  const ready = checked.length === checklist.length
  const videoLabel = useMemo(() => (uploaded ? 'mong_test_clip.mp4 · 14초' : '아직 업로드된 영상이 없어요'), [uploaded])

  const simulateUpload = () => {
    setUploaded(true)
    setProgress(18)
    const steps = [36, 62, 84, 100]
    steps.forEach((step, index) => {
      window.setTimeout(() => setProgress(step), (index + 1) * 350)
    })
  }

  return (
    <div className='space-y-6'>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className='rounded-[32px] border border-border/70 bg-card p-5 shadow-sm'>
        <div className='flex items-center gap-3'>
          <div className='rounded-2xl bg-primary/10 p-3 text-primary'>
            <UploadCloud className='size-5' />
          </div>
          <div>
            <p className='text-base font-semibold'>모바일 업로드</p>
            <p className='text-sm text-muted-foreground'>드래그 앤 드롭처럼 보이지만 모바일에서도 자연스럽게 사용할 수 있게 구성했어요.</p>
          </div>
        </div>
        <button onClick={simulateUpload} className='mt-5 flex w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-primary/35 bg-secondary/50 px-4 py-8 text-center'>
          <Video className='size-8 text-primary' />
          <p className='mt-3 text-sm font-semibold'>영상 파일 선택 또는 샘플 업로드</p>
          <p className='mt-1 text-xs text-muted-foreground'>mp4, mov, 최대 30MB</p>
        </button>
        <div className='mt-4 rounded-[24px] bg-secondary p-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='font-medium'>미리보기</span>
            <span className='text-muted-foreground'>{videoLabel}</span>
          </div>
          <div className='mt-3 overflow-hidden rounded-[20px] bg-gradient-to-br from-orange-100 to-rose-50 p-4'>
            <div className='flex aspect-video items-center justify-center rounded-[16px] border border-white/70 bg-white/70'>
              <Film className='size-8 text-primary/70' />
            </div>
          </div>
          {uploaded ? (
            <div className='mt-3'>
              <div className='h-2 rounded-full bg-white'>
                <div className='h-2 rounded-full bg-primary transition-all' style={{ width: `${progress}%` }} />
              </div>
              <p className='mt-2 text-xs text-muted-foreground'>업로드 진행률 {progress}%</p>
            </div>
          ) : null}
        </div>
      </motion.div>

      <div className='rounded-[32px] border border-border/70 bg-card p-5 shadow-sm'>
        <p className='text-base font-semibold'>업로드 전 체크리스트</p>
        <div className='mt-4 space-y-3'>
          {checklist.map((item) => {
            const active = checked.includes(item)
            return (
              <button
                key={item}
                onClick={() =>
                  setChecked((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]))
                }
                className='flex w-full items-start gap-3 rounded-[20px] border border-border/70 bg-secondary/40 p-4 text-left'
              >
                <CheckCircle2 className={`mt-0.5 size-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className='text-sm text-muted-foreground'>{item}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className='sticky bottom-3 z-20 rounded-[28px] border border-border/70 bg-card/95 p-3 shadow-lg backdrop-blur'>
        <div className='flex items-center justify-between gap-3'>
          <div>
            <p className='text-sm font-semibold'>AI 분석 준비</p>
            <p className='text-xs text-muted-foreground'>{ready && uploaded ? '바로 분석을 시작할 수 있어요' : '영상 업로드와 체크리스트 완료가 필요해요'}</p>
          </div>
          <Link
            href={ready && uploaded ? '/test/analyzing' : '#'}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${ready && uploaded ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
          >
            {ready && uploaded ? '분석 시작' : '준비 중'}
          </Link>
        </div>
      </div>
    </div>
  )
}