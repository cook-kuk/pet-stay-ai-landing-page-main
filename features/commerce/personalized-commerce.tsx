'use client'

import { useState } from 'react'
import { Percent, ShoppingBag, Sparkles } from 'lucide-react'
import { BundleCard } from '@/components/commerce/bundle-card'
import { ProductCard } from '@/components/commerce/product-card'
import { bundles, products } from '@/data/mock-db'
import { commercePurposes } from '@/constants/product'
import { cn } from '@/lib/utils'

export function PersonalizedCommerce() {
  const [selectedPurpose, setSelectedPurpose] = useState(commercePurposes[0])

  return (
    <div className='space-y-4'>
      <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
        <div className='flex items-center gap-2 text-sm font-semibold'><Sparkles className='size-4 text-primary' /> 목적형 필터</div>
        <div className='mt-3 flex gap-2 overflow-x-auto pb-1'>
          {commercePurposes.map((purpose) => (
            <button
              key={purpose}
              onClick={() => setSelectedPurpose(purpose)}
              className={cn('shrink-0 rounded-full px-3 py-2 text-xs font-semibold', selectedPurpose === purpose ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground')}
            >
              {purpose}
            </button>
          ))}
        </div>
      </div>
      <div className='rounded-[30px] border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-2 font-semibold text-foreground'><Percent className='size-4 text-primary' /> 추천 근거</div>
        최근 결과 카드, 루틴 완료 상태, 귀가 후 리포트 점수를 바탕으로 “{selectedPurpose}” 중심 추천 레일을 우선 노출합니다.
      </div>
      <div className='space-y-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='space-y-3'>
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
      <button className='inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground'>
        <ShoppingBag className='size-4' /> 장바구니 준비형 추천 더 보기
      </button>
    </div>
  )
}