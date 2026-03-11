import { AppFrame } from '@/components/app/app-frame'
import { SectionHeader } from '@/components/shared/section-header'
import { ChatbotPanel } from '@/features/chatbot/chatbot-panel'

export default function ChatPage() {
  return (
    <AppFrame title='AI 챗봇'>
      <SectionHeader eyebrow='Chatbot' title='몽이 설명 챗봇' description='성향 설명, 루틴 추천, 쇼핑 추천, 커뮤니티 추천을 대화형으로 연결합니다.' />
      <ChatbotPanel />
    </AppFrame>
  )
}