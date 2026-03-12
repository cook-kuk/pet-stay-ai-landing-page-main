'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  CoachConversation,
  CoachDrawerPreset,
  CoachIntent,
  CoachMessage,
  CoachQuickAction,
  CoachResponse,
  CoachSurface,
} from '@/features/chat/types'

const STORAGE_KEY = 'petstay-chat-coach-v3'

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

function buildConversationTitle(prompt?: string) {
  if (!prompt?.trim()) return '새 코칭 대화'
  const normalized = prompt.replace(/\s+/g, ' ').trim()
  return normalized.length > 24 ? `${normalized.slice(0, 24)}…` : normalized
}

function createConversation(prompt?: string): CoachConversation {
  const now = new Date().toISOString()
  return {
    id: `conversation-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    title: buildConversationTitle(prompt),
    preview: prompt?.trim() || '몽이의 성향과 오늘 상태를 기준으로 코칭을 시작해보세요.',
    updatedAt: now,
    activeSurface: 'coach',
    messages: seedMessages(),
    routineCompletion: ['routine-1'],
    savedAnswerIds: [],
    recentPrompts: coachSnapshot.recentPromptMemory,
    lastUserPrompt: null,
    shareNotice: null,
  }
}

function updateConversation(
  conversations: CoachConversation[],
  conversationId: string,
  updater: (conversation: CoachConversation) => CoachConversation
) {
  return conversations.map((conversation) =>
    conversation.id === conversationId ? updater(conversation) : conversation
  )
}

export function useAiCoach() {
  const pendingRef = useRef(false)
  const [conversations, setConversations] = useState<CoachConversation[]>(() => [createConversation()])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [composer, setComposer] = useState('')
  const [activeDrawer, setActiveDrawer] = useState<CoachSurface | null>(null)
  const [drawerPreset, setDrawerPreset] = useState<CoachDrawerPreset>(() => getDrawerPreset('coach'))
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      setActiveConversationId((previous) => previous ?? conversations[0]?.id ?? null)
      return
    }

    const parsed = JSON.parse(raw) as Partial<{
      conversations: CoachConversation[]
      activeConversationId: string
    }>

    if (parsed.conversations?.length) {
      setConversations(parsed.conversations)
      setActiveConversationId(parsed.activeConversationId ?? parsed.conversations[0].id)
    }
  }, [])

  useEffect(() => {
    if (!activeConversationId && conversations.length) {
      setActiveConversationId(conversations[0].id)
    }
  }, [activeConversationId, conversations])

  useEffect(() => {
    if (!activeConversationId) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ conversations, activeConversationId }))
  }, [activeConversationId, conversations])

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations]
  )

  const messages = activeConversation?.messages ?? []
  const activeSurface = activeConversation?.activeSurface ?? 'coach'
  const routineCompletion = activeConversation?.routineCompletion ?? ['routine-1']
  const savedAnswerIds = activeConversation?.savedAnswerIds ?? []
  const recentPrompts = activeConversation?.recentPrompts ?? coachSnapshot.recentPromptMemory
  const shareNotice = activeConversation?.shareNotice ?? null

  const patchActiveConversation = (updater: (conversation: CoachConversation) => CoachConversation) => {
    if (!activeConversationId) return
    setConversations((previous) => updateConversation(previous, activeConversationId, updater))
  }

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
    patchActiveConversation((conversation) => ({
      ...conversation,
      messages: [...conversation.messages, message],
      activeSurface: surface,
      updatedAt: message.createdAt,
      preview: text,
    }))
    setDrawerPreset(getDrawerPreset(surface))
    setActiveDrawer(surface)
  }

  const streamAssistantResponse = async (placeholderId: string, response: CoachResponse) => {
    const fullText = response.text
    const step = Math.max(6, Math.round(fullText.length / 16))

    patchActiveConversation((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) =>
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
      ),
    }))

    for (let index = step; index < fullText.length + step; index += step) {
      await new Promise((resolve) => window.setTimeout(resolve, 18))
      const chunk = fullText.slice(0, index)
      patchActiveConversation((conversation) => ({
        ...conversation,
        messages: conversation.messages.map((message) =>
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
        ),
      }))
    }

    patchActiveConversation((conversation) => ({
      ...conversation,
      messages: conversation.messages.map((message) =>
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
                        completed: conversation.routineCompletion.includes(item.id) || item.completed,
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
                  ? '실시간 Claude 응답이 잠시 불안정해서 앱 내 코치 로직으로 이어서 도와드렸어요.'
                  : undefined,
            }
          : message
      ),
      updatedAt: new Date().toISOString(),
      preview: fullText,
      activeSurface: inferSurfaceFromIntent(response.intent),
    }))
  }

  const sendPrompt = async (prompt: string, surface?: CoachSurface) => {
    if (!prompt.trim() || pendingRef.current || !activeConversationId) return

    pendingRef.current = true
    setPendingPrompt(prompt)
    setComposer('')
    setDrawerPreset(getDrawerPreset(surface ?? activeSurface))

    const nextRecent = [prompt, ...recentPrompts.filter((item) => item !== prompt)].slice(0, 5)
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
      text: '몽이의 성향 결과, 오늘 루틴 상태, 최근 리포트, 저장한 추천을 함께 보고 답을 정리하는 중이에요…',
      createdAt: new Date().toISOString(),
      intent: 'general',
      status: 'thinking',
      source: isLiveAiEnabled() ? 'llm' : 'mock',
      transport: isLiveAiEnabled() ? 'live' : 'mock',
    }

    patchActiveConversation((conversation) => ({
      ...conversation,
      title: conversation.lastUserPrompt ? conversation.title : buildConversationTitle(prompt),
      preview: prompt,
      updatedAt: userMessage.createdAt,
      recentPrompts: nextRecent,
      lastUserPrompt: prompt,
      shareNotice: null,
      activeSurface: surface ?? conversation.activeSurface,
      messages: [...conversation.messages, userMessage, placeholder],
    }))

    try {
      const response = await getAiReply(prompt)
      const nextSurface = surface ?? inferSurfaceFromIntent(response.intent)
      setDrawerPreset(getDrawerPreset(nextSurface))
      await streamAssistantResponse(placeholderId, response)
    } finally {
      pendingRef.current = false
      setPendingPrompt(null)
    }
  }

  const runQuickAction = async (action: CoachQuickAction) => {
    patchActiveConversation((conversation) => ({ ...conversation, activeSurface: action.surface }))
    setDrawerPreset(getDrawerPreset(action.surface))
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
        patchActiveConversation((conversation) => ({
          ...conversation,
          savedAnswerIds: Array.from(new Set([...conversation.savedAnswerIds, 'routine-saved'])),
          updatedAt: new Date().toISOString(),
        }))
        appendLocalMessage('routine', '오늘 루틴을 저장해뒀어요. 이 대화에서 다시 열어도 같은 흐름으로 이어서 볼 수 있어요.', 'routine')
        return
      case 'share-family':
        patchActiveConversation((conversation) => ({
          ...conversation,
          shareNotice: '가족 공유 카드가 준비됐어요. 이 대화 안에서 가족용 요약도 같이 보관할게요.',
        }))
        appendLocalMessage('share', '가족이 바로 이해할 수 있도록 오늘 상태와 꼭 맞춰야 할 루틴만 묶어드렸어요.', 'share')
        return
      case 'share-sitter':
        patchActiveConversation((conversation) => ({
          ...conversation,
          shareNotice: '시터용 요약을 만들었어요. 이 대화 기록 안에 인수인계 버전까지 남겨둘게요.',
        }))
        appendLocalMessage('share', '시터가 꼭 알아야 할 포인트만 남겨서 더 짧고 실전적으로 정리했어요.', 'share')
        return
      case 'report-next':
        appendLocalMessage('report', '다음 외출에서는 떠나기 전 5분 루틴만 집중적으로 맞춰보세요. 그 한 가지가 점수 변화를 가장 크게 만들 가능성이 높아요.', 'report')
        return
      case 'community-question':
        appendLocalMessage('community', '질문 초안도 같이 적어드릴게요. “귀가 후 흥분을 30초 안에 낮추는 루틴, 다들 어떻게 맞추셨나요?” 같은 형태가 반응이 좋아요.', 'community')
        return
      case 'save-answer':
        patchActiveConversation((conversation) => ({
          ...conversation,
          savedAnswerIds: Array.from(new Set([...conversation.savedAnswerIds, conversation.messages.at(-1)?.id ?? 'latest-answer'])),
          shareNotice: '이 답변을 저장해뒀어요. 나중에 이 대화를 다시 열면 그대로 이어서 볼 수 있어요.',
        }))
        return
      case 'share-card':
        appendLocalMessage('share', '궁합 카드를 공유용 포맷으로 다시 정리했어요. 이 대화에서 바로 가족용 카드로 넘길 수 있어요.', 'share')
        return
      default:
        appendLocalMessage('general', '지금 액션에 맞는 보조 카드를 열어뒀어요. 필요한 흐름부터 이 대화 안에서 이어가면 돼요.', 'coach')
    }
  }

  const toggleRoutine = (id: string) => {
    patchActiveConversation((conversation) => ({
      ...conversation,
      routineCompletion: conversation.routineCompletion.includes(id)
        ? conversation.routineCompletion.filter((item) => item !== id)
        : [...conversation.routineCompletion, id],
      messages: conversation.messages.map((message) => ({
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
      })),
      updatedAt: new Date().toISOString(),
    }))
  }

  const createNewConversation = () => {
    const next = createConversation()
    setConversations((previous) => [next, ...previous])
    setActiveConversationId(next.id)
    setDrawerPreset(getDrawerPreset('coach'))
    setActiveDrawer(null)
    setComposer('')
    setPendingPrompt(null)
  }

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    const selected = conversations.find((conversation) => conversation.id === conversationId)
    setDrawerPreset(getDrawerPreset(selected?.activeSurface ?? 'coach'))
    setActiveDrawer(null)
    setComposer('')
    setPendingPrompt(null)
  }

  const renameConversation = (conversationId: string, title: string) => {
    const nextTitle = title.trim()
    if (!nextTitle) return
    setConversations((previous) =>
      updateConversation(previous, conversationId, (conversation) => ({ ...conversation, title: nextTitle, updatedAt: new Date().toISOString() }))
    )
  }

  return {
    conversations,
    activeConversationId,
    activeConversation,
    selectConversation,
    createNewConversation,
    renameConversation,
    messages,
    composer,
    setComposer,
    activeSurface,
    setActiveSurface: (surface: CoachSurface) => {
      patchActiveConversation((conversation) => ({ ...conversation, activeSurface: surface }))
    },
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
      if (activeConversation?.lastUserPrompt) {
        await sendPrompt(activeConversation.lastUserPrompt, activeConversation.activeSurface)
      }
    },
    saveLatestAnswer: () => runActionById('save-answer'),
    shareLatestAnswer: () => runActionById('share-family'),
  }
}