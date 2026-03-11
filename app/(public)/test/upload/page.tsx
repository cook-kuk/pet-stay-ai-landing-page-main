import { PageShell } from '@/components/shared/page-shell'
import { SectionHeader } from '@/components/shared/section-header'
import { UploadFlow } from '@/features/personality-test/upload-flow'

export default function TestUploadPage() {
  return (
    <PageShell className='px-4 py-5'>
      <div className='space-y-6'>
        <SectionHeader eyebrow='Upload flow' title='15초 영상으로 성향 분석 시작' description='미리보기, 체크리스트, 업로드 진행률, 모바일 친화 UI까지 포함한 실제 제품형 플로우입니다.' />
        <UploadFlow />
      </div>
    </PageShell>
  )
}