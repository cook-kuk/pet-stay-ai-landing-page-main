import { AppFrame } from '@/components/app/app-frame'

const settings = ['알림 설정', '가족 공유 권한', '프리미엄 리포트 잠금', '파트너 서비스 연동 예정']

export default function SettingsPage() {
  return (
    <AppFrame title='설정'>
      <div className='space-y-3'>
        {settings.map((setting) => (
          <div key={setting} className='rounded-[24px] border border-border/70 bg-card px-4 py-4 text-sm font-medium'>
            {setting}
          </div>
        ))}
      </div>
    </AppFrame>
  )
}