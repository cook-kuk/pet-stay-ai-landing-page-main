import { notFound } from 'next/navigation'
import { AppFrame } from '@/components/app/app-frame'
import { products } from '@/data/mock-db'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()
  return (
    <AppFrame title='상품 상세' backHref='/shop'>
      <div className='space-y-4'>
        <div className='rounded-[32px] bg-gradient-to-br from-orange-100 to-white p-6'>
          <p className='text-sm font-semibold text-primary/70'>{product.category}</p>
          <h1 className='mt-2 text-2xl font-semibold'>{product.name}</h1>
          <p className='mt-3 text-sm leading-6 text-muted-foreground'>{product.description}</p>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-sm font-semibold'>왜 이 타입에 맞을까?</p>
          <p className='mt-2 text-sm leading-6 text-muted-foreground'>{product.reason}</p>
        </div>
        <div className='rounded-[28px] border border-border/70 bg-card p-5'>
          <p className='text-lg font-semibold'>{(product.discountPrice ?? product.price).toLocaleString()}원</p>
          <button className='mt-4 w-full rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground'>장바구니 준비</button>
        </div>
      </div>
    </AppFrame>
  )
}