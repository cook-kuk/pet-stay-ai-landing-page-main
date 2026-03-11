'use client'

import { useState, useTransition } from 'react'
import { ChatBubble } from '@/components/chat/chat-bubble'
import { QuickReplyChip } from '@/components/chat/quick-reply-chip'
import { useAppStore } from '@/store/app-store'
import { getChatResponse } from '@/services/mock-service'

const quickReplies = ['왜 현관에서 기다릴까?', '오늘 루틴 추천', '맞는 장난감 추천', '커뮤니티 추천']

export function ChatbotPanel() {
  const { chatMessages, pushChatMessage } = useAppStore()
  const [pending, startTransition] = useTransition()
  const [input, setInput] = useState('')

  const send = (message: string) => {
    pushChatMessage({ id: `user-${Date.now()}`, role: 'user', text: message, createdAt: new Date().toISOString() })
    startTransition(async () => {
      const response = await getChatResponse(message)
      pushChatMessage(response)
    })
    setInput('')
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-3'>
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {pending ? <ChatBubble message={{ id: 'loading', role: 'assistant', text: '몽이 기록과 성향을 바탕으로 정리하고 있어요...', createdAt: new Date().toISOString() }} /> : null}
      </div>
      <div className='flex flex-wrap gap-2'>
        {quickReplies.map((reply) => (
          <button key={reply} onClick={() => send(reply)}>
            <QuickReplyChip label={reply} />
          </button>
        ))}
      </div>
      <div className='flex gap-2 rounded-[24px] border border-border bg-card p-2'>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='몽이에 대해 궁금한 점을 입력해보세요'
          className='flex-1 bg-transparent px-3 py-2 text-sm outline-none'
        />
        <button onClick={() => input && send(input)} className='rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground'>
          전송
        </button>
      </div>
    </div>
  )
}