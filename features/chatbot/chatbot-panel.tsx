'use client'

import { useState, useTransition } from 'react'
import { Bot, Sparkles } from 'lucide-react'
import { ChatBubble } from '@/components/chat/chat-bubble'
import { QuickReplyChip } from '@/components/chat/quick-reply-chip'
import { ActionSuggestionCard } from '@/components/chat/action-suggestion-card'
import { defaultQuickReplies } from '@/constants/ai'
import { getAiReply, isLiveAiEnabled } from '@/services/ai/client'
import { useAppStore } from '@/store/app-store'
import type { AiActionSuggestion } from '@/types/ai'

export function ChatbotPanel() {
  const { chatMessages, pushChatMessage } = useAppStore()
  const [pending, startTransition] = useTransition()
  const [input, setInput] = useState('')
  const [lastSuggestions, setLastSuggestions] = useState<AiActionSuggestion[]>([])
  const [modeLabel, setModeLabel] = useState(isLiveAiEnabled() ? 'LIVE LLM' : 'SMART MOCK')

  const send = (message: string) => {
    pushChatMessage({ id: `user-${Date.now()}`, role: 'user', text: message, createdAt: new Date().toISOString() })
    startTransition(async () => {
      const response = await getAiReply(message)
      setModeLabel(response.source === 'llm' ? 'LIVE LLM' : 'SMART MOCK')
      setLastSuggestions(response.suggestions)
      pushChatMessage({
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        chips: response.chips,
        createdAt: new Date().toISOString(),
      })
    })
    setInput('')
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <span className='rounded-2xl bg-primary/10 p-3 text-primary'><Bot className='size-4' /></span>
            <div>
              <p className='text-sm font-semibold'>PetStay AI 코치</p>
              <p className='text-xs text-muted-foreground'>몽이의 성향, 리포트, 루틴을 묶어서 설명해줘요.</p>
            </div>
          </div>
          <span className='rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground'>{modeLabel}</span>
        </div>
      </div>

      <div className='space-y-3'>
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {pending ? (
          <ChatBubble message={{ id: 'loading', role: 'assistant', text: '몽이 성향, 최근 리포트, 루틴 기록을 같이 보고 가장 자연스러운 다음 행동을 정리하고 있어요...', createdAt: new Date().toISOString() }} />
        ) : null}
      </div>

      <div className='flex flex-wrap gap-2'>
        {defaultQuickReplies.map((reply) => (
          <button key={reply} onClick={() => send(reply)}>
            <QuickReplyChip label={reply} />
          </button>
        ))}
      </div>

      {lastSuggestions.length ? (
        <div className='space-y-3'>
          <div className='flex items-center gap-2 text-sm font-semibold'><Sparkles className='size-4 text-primary' /> 추천 다음 행동</div>
          <div className='grid gap-3'>
            {lastSuggestions.map((suggestion) => (
              <ActionSuggestionCard key={suggestion.label} suggestion={suggestion} />
            ))}
          </div>
        </div>
      ) : null}

      <div className='flex gap-2 rounded-[24px] border border-border bg-card p-2 shadow-sm'>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='예: 오늘 루틴 추천해줘, 집비움 관리 팁 알려줘'
          className='flex-1 bg-transparent px-3 py-2 text-sm outline-none'
        />
        <button onClick={() => input && send(input)} className='rounded-2xl bg-primary px-4 text-sm font-semibold text-primary-foreground'>
          전송
        </button>
      </div>
    </div>
  )
}