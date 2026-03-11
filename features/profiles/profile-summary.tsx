import type { OwnerProfile, PetProfile } from '@/types/domain'

export function ProfileSummary({ pet, owner }: { pet: PetProfile; owner: OwnerProfile }) {
  return (
    <div className='space-y-3'>
      <div className='rounded-[28px] border border-border/70 bg-card p-5'>
        <p className='text-sm font-semibold'>반려견 프로필</p>
        <div className='mt-3 space-y-2 text-sm text-muted-foreground'>
          <p>{pet.name} · {pet.breed} · {pet.ageMonths}개월</p>
          <p>주요 성향: {pet.mainPersonalityType}</p>
          <p>서브 특성: {pet.subTraits.join(', ')}</p>
        </div>
      </div>
      <div className='rounded-[28px] border border-border/70 bg-card p-5'>
        <p className='text-sm font-semibold'>보호자 프로필</p>
        <div className='mt-3 space-y-2 text-sm text-muted-foreground'>
          <p>{owner.personalityType}</p>
          <p>{owner.lifestyle}</p>
          <p>{owner.location}</p>
        </div>
      </div>
    </div>
  )
}