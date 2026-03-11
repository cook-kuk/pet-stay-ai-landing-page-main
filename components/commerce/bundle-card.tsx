import Link from 'next/link'
import type { Bundle } from '@/types/domain'

export function BundleCard({ bundle }: { bundle: Bundle }) {
  return (
    <Link href='/bundles' className='rounded-[28px] border border-border/70 bg-secondary/70 p-4'>
      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary/70'>맞춤 번들</p>
      <h3 className='mt-2 text-lg font-semibold'>{bundle.name}</h3>
      <p className='mt-2 text-sm text-muted-foreground'>{bundle.description}</p>
      <div className='mt-4 flex items-center justify-between'>
        <span className='text-base font-semibold'>{bundle.price.toLocaleString()}원</span>
        <span className='text-xs text-muted-foreground'>{bundle.items.length}개 상품</span>
      </div>
    </Link>
  )
}