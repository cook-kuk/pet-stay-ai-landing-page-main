import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product } from '@/types/domain'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/product/${product.slug}`} className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold text-primary/70'>{product.category}</p>
          <h3 className='mt-1 text-base font-semibold'>{product.name}</h3>
          <p className='mt-1 text-sm text-muted-foreground'>{product.reason}</p>
        </div>
        <div className='rounded-full bg-secondary p-2 text-muted-foreground'>
          <Heart className='size-4' />
        </div>
      </div>
      <div className='mt-4 flex items-center gap-2'>
        <span className='text-lg font-semibold'>{product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}원</span>
        {product.discountPrice ? <span className='text-sm text-muted-foreground line-through'>{product.price.toLocaleString()}원</span> : null}
      </div>
    </Link>
  )
}