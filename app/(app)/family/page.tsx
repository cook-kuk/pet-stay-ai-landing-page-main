import { AppFrame } from '@/components/app/app-frame'
import { familyMembers, sitterAccessList } from '@/data/mock-db'

export default function FamilyPage() {
  return (
    <AppFrame title='가족 공유'>
      <div className='space-y-4'>
        {familyMembers.map((member) => (
          <div key={member.id} className='rounded-[24px] border border-border/70 bg-card p-4'>
            <p className='text-sm font-semibold'>{member.role}</p>
            <p className='mt-1 text-sm text-muted-foreground'>{member.permissions.join(', ')}</p>
          </div>
        ))}
        {sitterAccessList.map((sitter) => (
          <div key={sitter.id} className='rounded-[24px] border border-dashed border-primary/40 bg-primary/5 p-4'>
            <p className='text-sm font-semibold'>시터 권한 초대</p>
            <p className='mt-1 text-sm text-muted-foreground'>{sitter.invitedEmail} · {sitter.permissions.join(', ')}</p>
          </div>
        ))}
      </div>
    </AppFrame>
  )
}