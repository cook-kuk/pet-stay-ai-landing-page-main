import { AppFrame } from '@/components/app/app-frame'
import { DashboardOverview } from '@/components/app/dashboard-overview'
import { getDashboardData } from '@/services/mock-service'

export default async function DashboardPage() {
  const data = await getDashboardData()
  return (
    <AppFrame title='PetStay 홈'>
      <DashboardOverview highlights={data.highlights} resultSlug={data.result.typeSlug} products={data.products} />
    </AppFrame>
  )
}