import { notFound } from 'next/navigation'
import { AppFrame } from '@/components/app/app-frame'
import { CommerceShowcase } from '@/features/commerce/commerce-showcase'
import { personalityTypes } from '@/data/personality-types'
import { getCommerceData } from '@/services/mock-service'
import { personalityTypeMap } from '@/data/personality-types'
import type { PersonalitySlug } from '@/types/domain'

export function generateStaticParams() {
  return personalityTypes.map((type) => ({ slug: type.slug }))
}

export default async function ShopTypePage({ params }: { params: Promise<{ slug: PersonalitySlug }> }) {
  const { slug } = await params
  const type = personalityTypeMap[slug]
  if (!type) notFound()
  const data = await getCommerceData(slug)
  return (
    <AppFrame title={`${type.name} 쇼핑`} backHref='/shop'>
      <CommerceShowcase products={data.products} bundles={data.bundles} />
    </AppFrame>
  )
}