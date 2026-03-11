import { BundleCard } from '@/components/commerce/bundle-card'
import { ProductCard } from '@/components/commerce/product-card'
import type { Bundle, Product } from '@/types/domain'

export function CommerceShowcase({ products, bundles }: { products: Product[]; bundles: Bundle[] }) {
  return (
    <div className='space-y-4'>
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
    </div>
  )
}