import { AppFrame } from '@/components/app/app-frame'
import { familyMembers, reports, routinePlans, sitterAccessList } from '@/data/mock-db'

export default function FamilyPage() {
  return (
    <AppFrame title='가족 공유'>
      <div className='space-y-4'>
        <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
          <p className='text-sm font-semibold'>가족 멤버</p>
          <div className='mt-3 space-y-2'>
            {familyMembers.map((member) => (
              <div key={member.id} className='rounded-[20px] bg-secondary/50 px-4 py-3 text-sm text-muted-foreground'>
                {member.role} · {member.permissions.join(', ')}
              </div>
            ))}
          </div>
        </div>
        <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
          <p className='text-sm font-semibold'>시터 임시 접근</p>
          <div className='mt-3 space-y-2'>
            {sitterAccessList.map((sitter) => (
              <div key={sitter.id} className='rounded-[20px] bg-secondary/50 px-4 py-3 text-sm text-muted-foreground'>
                {sitter.invitedEmail} · {sitter.permissions.join(', ')} · {new Date(sitter.expiresAt).toLocaleDateString('ko-KR')}까지
              </div>
            ))}
          </div>
        </div>
        <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
          <p className='text-sm font-semibold'>공유된 리포트 카드</p>
          <p className='mt-2 text-sm text-muted-foreground'>{reports[0].content}</p>
        </div>
        <div className='rounded-[30px] border border-border/70 bg-card p-5 shadow-sm'>
          <p className='text-sm font-semibold'>공유 루틴 체크리스트</p>
          <div className='mt-3 space-y-2'>
            {routinePlans[0].items.map((item) => (
              <div key={item.id} className='rounded-[20px] bg-secondary/50 px-4 py-3 text-sm text-muted-foreground'>
                {item.title} · {item.description}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  )
}