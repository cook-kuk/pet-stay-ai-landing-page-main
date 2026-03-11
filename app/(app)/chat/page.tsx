import { AppFrame } from '@/components/app/app-frame'
import { CoachExperience } from '@/features/chat/components/coach-experience'

export default function ChatPage() {
  return (
    <AppFrame title='AI 코치'>
      <CoachExperience />
    </AppFrame>
  )
}