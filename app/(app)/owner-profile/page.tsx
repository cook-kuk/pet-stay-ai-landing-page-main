import { AppFrame } from '@/components/app/app-frame'
import { ProfileSummary } from '@/features/profiles/profile-summary'
import { ownerProfile, petProfiles } from '@/data/mock-db'

export default function OwnerProfilePage() {
  return (
    <AppFrame title='보호자 프로필'>
      <ProfileSummary pet={petProfiles[0]} owner={ownerProfile} />
    </AppFrame>
  )
}