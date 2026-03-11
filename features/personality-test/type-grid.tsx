'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { personalityTypes } from '@/data/personality-types'
import { TypeDetailDrawer } from '@/features/personality-test/type-detail-drawer'

export function TypeGrid() {
  return (
    <div className='grid gap-3'>
      {personalityTypes.map((type, index) => (
        <motion.div
          key={type.slug}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: index * 0.02 }}
          className={`overflow-hidden rounded-[28px] bg-gradient-to-br ${type.accent} p-[1px]`}
        >
          <div className='rounded-[27px] bg-card p-4'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='text-base font-semibold'>{type.name}</p>
                <p className='mt-1 text-sm text-muted-foreground'>{type.subtitle}</p>
              </div>
              <TypeDetailDrawer slug={type.slug} triggerLabel='상세' />
            </div>
            <div className='mt-3 flex flex-wrap gap-2'>
              {type.tags.map((tag) => (
                <span key={tag} className='rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground'>
                  {tag}
                </span>
              ))}
            </div>
            <div className='mt-4 grid grid-cols-2 gap-2'>
              <Link href={`/test/result/${type.slug}`} className='rounded-2xl bg-primary px-3 py-3 text-center text-xs font-semibold text-primary-foreground'>결과 보기</Link>
              <Link href={`/community/type/${type.slug}`} className='rounded-2xl border border-border bg-card px-3 py-3 text-center text-xs font-semibold'>커뮤니티</Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}