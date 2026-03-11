'use client'

import { useEffect, useRef, useState } from 'react'
import { findCoachAction, getCoachQuickActions } from '@/features/chat/actions/coach-actions'
import {
  buildBlocksForIntent,
  buildContextReferences,
  buildSuggestionsForIntent,
  coachSnapshot,
  getDrawerPreset,
  inferSurfaceFromIntent,
  initialCoachResponses,
} from '@/features/chat/mock/coach-data'
import { getAiReply, isLiveAiEnabled } from '@/services/ai/client'
import type {
  CoachDrawerPreset,
  CoachIntent,
  CoachMessage,
  CoachQuickAction,
  CoachResponse,
  CoachSurface,
} from '@/features/chat/types'

const STORAGE_KEY = 'petstay-chat-coach-v2'

function createAssistantMessage(response: CoachResponse, overrides?: Partial<CoachMessage>): CoachMessage {
  return {
    id: `assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role: 'assistant',
    text: response.text,
    createdAt: new Date().toISOString(),
    intent: response.intent,
    status: 'ready',
    blocks: response.blocks,
    chips: response.chips,
    suggestions: response.suggestions,
    source: response.source,
    transport: response.transport,
    contextUsed: response.contextUsed,
    confidence: response.confidence,
    ...overrides,
  }
}

function seedMessages(): CoachMessage[] {
  return initialCoachResponses.map((response, index) => ({
    ...createAssistantMessage(response),
    id: `seed-${index}`,
  }))
}

export function useAiCoach() {
  const [messages, setMessages] = useState<CoachMessage[]>(seedMessages)
  const [composer, setComposer] = useState('')
  const [activeSurface, setActiveSurface] = useState<CoachSurface>('coach')
  const [activeDrawer, setActiveDrawer] = useState<CoachSurface | null>(null)
  const [drawerPreset, setDrawerPreset] = useState<CoachDrawerPreset>(() => getDrawerPreset('coach'))
  const [routineCompletion, setRoutineCompletion] = useState<string[]>(['routine-1'])
  const [savedAnswerIds, setSavedAnswerIds] = useState<string[]>([])
  const [recentPrompts, setRecentPrompts] = useState<string[]>(coachSnapshot.recentPromptMemory)
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null)
  const [shareNotice, setShareNotice] = useState<string | null>(null)
  const pendingRef = useRef(false)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Partial<{
      messages: CoachMessage[]
      routineCompletion: string[]
      savedAnswerIds: string[]
      recentPrompts: string[]
      activeSurface: CoachSurface
    }>

    if (parsed.messages?.length) setMessages(parsed.messages)
    if (parsed.routineCompletion) setRoutineCompletion(parsed.routineCompletion)
    if (parsed.savedAnswerIds) setSavedAnswerIds(parsed.savedAnswerIds)
    if (parsed.recentPrompts) setRecentPrompts(parsed.recentPrompts)
    if (parsed.activeSurface) setActiveSurface(parsed.activeSurface)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, routineCompletion, savedAnswerIds, recentPrompts, activeSurface })
    )
  }, [activeSurface, messages, recentPrompts, routineCompletion, savedAnswerIds])

  const appendLocalMessage = (intent: CoachIntent, text: string, surface = inferSurfaceFromIntent(intent)) => {
    const response: CoachResponse = {
      text,
      intent,
      blocks: buildBlocksForIntent(intent),
      chips: getCoachQuickActions().slice(0, 6).map((action) => action.label),
      suggestions: buildSuggestionsForIntent(intent),
      confidence: 0.92,
      source: 'mock',
      transport: isLiveAiEnabled() ? 'fallback' : 'mock',
      contextUsed: buildContextReferences(surface),
    }
    const message = createAssistantMessage(response)
    setMessages((previous) => [...previous, message])
    setDrawerPreset(getDrawerPreset(surface))
    setActiveSurface(surface)
    setActiveDrawer(surface)
  }

  const streamAssistantResponse = async (placeholderId: string, response: CoachResponse) => {
    const fullText = response.text
    const step = Math.max(6, Math.round(fullText.length / 16))

    setMessages((previous) =>
      previous.map((message) =>
        message.id === placeholderId
          ? {
              ...message,
              status: 'streaming',
              text: '',
              intent: response.intent,
              source: response.source,
              transport: response.transport,
              confidence: response.confidence,
              contextUsed: response.contextUsed,
            }
          : message
      )
    )

    for (let index = step; index < fullText.length + step; index += step) {
      await new Promise((resolve) => window.setTimeout(resolve, 18))
      const chunk = fullText.slice(0, index)
      setMessages((previous) =>
        previous.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                text: chunk,
                intent: response.intent,
                source: response.source,
                transport: response.transport,
                confidence: response.confidence,
                contextUsed: response.contextUsed,
              }
            : message
        )
      )
    }

    setMessages((previous) =>
      previous.map((message) =>
        message.id === placeholderId
          ? {
              ...message,
              text: fullText,
              status: 'ready',
              intent: response.intent,
              blocks: response.blocks.map((block) =>
                block.type === 'routine-checklist'
                  ? {
                      ...block,
                      items: block.items.map((item) => ({
                        ...item,
                        completed: routineCompletion.includes(item.id) || item.completed,
                      })),
                    }
                  : block
              ),
              chips: response.chips,
              suggestions: response.suggestions,
              source: response.source,
              transport: response.transport,
              contextUsed: response.contextUsed,
              confidence: response.confidence,
              errorMessage:
                response.transport === 'fallback'
                  ? '실시간 Claude 연결이 잠시 불안정해서, 앱 내 코치 로직으로 이어서 도와드렸어요.'
                  : undefined,
            }
          : message
      )
    )
  }

  const sendPrompt = async (prompt: string, surface?: CoachSurface) => {
    if (!prompt.trim() || pendingRef.current) return

    pendingRef.current = true
    setPendingPrompt(prompt)
    setLastUserPrompt(prompt)
    setShareNotice(null)

    const nextRecent = [prompt, ...recentPrompts.filter((item) => item !== prompt)].slice(0, 5)
    setRecentPrompts(nextRecent)

    const userMessage: CoachMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
      createdAt: new Date().toISOString(),
      intent: 'general',
      status: 'ready',
    }

    const placeholderId = `assistant-pending-${Date.now()}`
    const placeholder: CoachMessage = {
      id: placeholderId,
      role: 'assistant',
      text: '몽이의 성향 결과, 오늘 루틴 상태, 최근 리포트, 저장한 추천을 함께 확인하면서 답을 정리하는 중이에요…',
      createdAt: new Date().toISOString(),
      intent: 'general',
      status: 'thinking',
      source: isLiveAiEnabled() ? 'llm' : 'mock',
      transport: isLiveAiEnabled() ? 'live' : 'mock',
    }

    setMessages((previous) => [...previous, userMessage, placeholder])
    setComposer('')

    try {
      const response = await getAiReply(prompt)
      const nextSurface = surface ?? inferSurfaceFromIntent(response.intent)
      setDrawerPreset(getDrawerPreset(nextSurface))
      setActiveSurface(nextSurface)
      await streamAssistantResponse(placeholderId, response)
    } finally {
      pendingRef.current = false
      setPendingPrompt(null)
    }
  }

  const runQuickAction = async (action: CoachQuickAction) => {
    setDrawerPreset(getDrawerPreset(action.surface))
    setActiveSurface(action.surface)
    setActiveDrawer(action.surface)
    await sendPrompt(action.prompt, action.surface)
  }

  const runActionById = async (actionId: string) => {
    const quickAction = findCoachAction(actionId)
    if (quickAction) {
      await runQuickAction(quickAction)
      return
    }

    switch (actionId) {
      case 'save-routine':
        setSavedAnswerIds((previous) => Array.from(new Set([...previous, 'routine-saved'])))
        appendLocalMessage('routine', '오늘 루틴을 저장해뒀어요. 내일 다시 열어도 같은 흐름에서 이어서 볼 수 있어요.', 'routine')
        return
      case 'share-family':
        setShareNotice('가족 공유 카드가 준비됐어요. 엄마와 시터가 같은 요약을 볼 수 있도록 맞춰둘게요.')
        appendLocalMessage('share', '가족이 바로 이해할 수 있도록 오늘 상태와 꼭 맞춰야 할 루틴만 묶어드렸어요.', 'share')
        return
      case 'share-sitter':
        setShareNotice('시터용 요약을 만들었어요. 인수인계 핵심 3가지만 보이도록 정리했어요.')
        appendLocalMessage('share', '시터가 꼭 알아야 할 포인트만 남겨서 더 짧고 실전적으로 정리했어요.', 'share')
        return
      case 'report-next':
        appendLocalMessage('report', '다음 외출에서는 떠나기 전 5분 루틴만 집중적으로 맞춰보세요. 그 한 가지가 점수 변화를 가장 크게 만들 가능성이 높아요.', 'report')
        return
      case 'community-question':
        appendLocalMessage('community', '질문 초안도 같이 적어드릴게요. “귀가 후 흥분을 30초 안에 낮추는 루틴, 다들 어떻게 맞추셨나요?” 같은 형태가 반응이 좋아요.', 'community')
        return
      case 'save-answer':
        if (messages.at(-1)?.id) {
          setSavedAnswerIds((previous) => Array.from(new Set([...previous, messages.at(-1)!.id])))
        }
        setShareNotice('이 답변을 저장해뒀어요. 나중에 저장한 카드에서 다시 볼 수 있어요.')
        return
      case 'share-card':
        appendLocalMessage('share', '궁합 카드가 공유용 포맷으로 정리됐어요. 가족에게 보내기 전에 핵심 포인트만 한 번 더 확인해볼게요.', 'share')
        return
      default:
        appendLocalMessage('general', '지금 액션에 맞는 보조 카드를 열어뒀어요. 필요한 흐름부터 이어서 고르면 돼요.', 'coach')
    }
  }

  const toggleRoutine = (id: string) => {
    setRoutineCompletion((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    )

    setMessages((previous) =>
      previous.map((message) => ({
        ...message,
        blocks: message.blocks?.map((block) =>
          block.type === 'routine-checklist'
            ? {
                ...block,
                items: block.items.map((item) =>
                  item.id === id ? { ...item, completed: !item.completed } : item
                ),
              }
            : block
        ),
      }))
    )
  }

  return {
    messages,
    composer,
    setComposer,
    activeSurface,
    setActiveSurface,
    activeDrawer,
    openDrawer: (surface: CoachSurface) => {
      setDrawerPreset(getDrawerPreset(surface))
      setActiveDrawer(surface)
    },
    closeDrawer: () => setActiveDrawer(null),
    drawerPreset,
    routineCompletion,
    savedAnswerIds,
    recentPrompts,
    pendingPrompt,
    shareNotice,
    snapshot: coachSnapshot,
    quickActions: getCoachQuickActions(),
    sendPrompt,
    runQuickAction,
    runActionById,
    toggleRoutine,
    regenerateLast: async () => {
      if (lastUserPrompt) {
        await sendPrompt(lastUserPrompt, activeSurface)
      }
    },
    saveLatestAnswer: () => runActionById('save-answer'),
    shareLatestAnswer: () => runActionById('share-family'),
  }
}