"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type ModalType = 
  | "video-test" 
  | "result-preview" 
  | "chatbot" 
  | "shop" 
  | "compatibility" 
  | "community"
  | "personality-detail"
  | "routine"
  | null

export type PersonalityType = {
  name: string
  traits: string
  tags: string[]
  emoji: string
  color: string
  mbti?: string
  description?: string
  strengths?: string[]
  careAdvice?: string[]
  compatibility?: { type: string; score: number }[]
  // Rich detail fields
  behaviorTraits?: string[]
  homeAloneReaction?: string
  recommendedRoutine?: string[]
  playStyle?: string[]
  category?: "anxious" | "explorer" | "energy" | "attached"
  // Brandable fields
  hashtag?: string
  summary?: string
}

type AppContextType = {
  activeModal: ModalType
  setActiveModal: (modal: ModalType) => void
  selectedPersonality: PersonalityType | null
  setSelectedPersonality: (type: PersonalityType | null) => void
  selectedShopType: string | null
  setSelectedShopType: (type: string | null) => void
  testResult: PersonalityType | null
  setTestResult: (result: PersonalityType | null) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityType | null>(null)
  const [selectedShopType, setSelectedShopType] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<PersonalityType | null>(null)

  return (
    <AppContext.Provider
      value={{
        activeModal,
        setActiveModal,
        selectedPersonality,
        setSelectedPersonality,
        selectedShopType,
        setSelectedShopType,
        testResult,
        setTestResult,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
