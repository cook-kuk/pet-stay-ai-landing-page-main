'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { currentUser, petProfiles, personalityResults, savedItems as initialSavedItems } from '@/data/mock-db'
import type { ChatMessage, SavedItem } from '@/types/domain'

interface AppState {
  userId: string
  selectedPetId: string
  savedItems: SavedItem[]
  chatMessages: ChatMessage[]
  completedRoutineIds: string[]
  setSelectedPetId: (petId: string) => void
  toggleSavedItem: (item: SavedItem) => void
  pushChatMessage: (message: ChatMessage) => void
  toggleRoutineItem: (id: string) => void
}

const AppStoreContext = createContext<AppState | null>(null)
const STORAGE_KEY = 'petstay-app-state'

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [selectedPetId, setSelectedPetId] = useState(petProfiles[0]?.id ?? '')
  const [savedItems, setSavedItems] = useState(initialSavedItems)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'seed-message',
      role: 'assistant',
      text: `${petProfiles[0]?.name}의 최근 성향 결과는 ${personalityResults[0]?.summary}`,
      chips: ['오늘 루틴 보기', '결과 카드 저장', '추천 상품 확인'],
      createdAt: new Date().toISOString(),
    },
  ])
  const [completedRoutineIds, setCompletedRoutineIds] = useState<string[]>(['r1'])

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (parsed.selectedPetId) setSelectedPetId(parsed.selectedPetId)
    if (parsed.savedItems) setSavedItems(parsed.savedItems)
    if (parsed.chatMessages) setChatMessages(parsed.chatMessages)
    if (parsed.completedRoutineIds) setCompletedRoutineIds(parsed.completedRoutineIds)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedPetId, savedItems, chatMessages, completedRoutineIds })
    )
  }, [selectedPetId, savedItems, chatMessages, completedRoutineIds])

  const value = useMemo<AppState>(
    () => ({
      userId: currentUser.id,
      selectedPetId,
      savedItems,
      chatMessages,
      completedRoutineIds,
      setSelectedPetId,
      toggleSavedItem: (item) => {
        setSavedItems((previous) => {
          const exists = previous.find((saved) => saved.itemId === item.itemId && saved.itemType === item.itemType)
          if (exists) {
            return previous.filter((saved) => !(saved.itemId === item.itemId && saved.itemType === item.itemType))
          }
          return [...previous, item]
        })
      },
      pushChatMessage: (message) => setChatMessages((previous) => [...previous, message]),
      toggleRoutineItem: (id) => {
        setCompletedRoutineIds((previous) =>
          previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
        )
      },
    }),
    [chatMessages, completedRoutineIds, savedItems, selectedPetId]
  )

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const context = useContext(AppStoreContext)
  if (!context) {
    throw new Error('useAppStore must be used inside AppStoreProvider')
  }
  return context
}