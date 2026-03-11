export type CoachIntent =
  | 'personality'
  | 'routine'
  | 'alone-time'
  | 'report'
  | 'commerce'
  | 'compatibility'
  | 'community'
  | 'share'
  | 'general'

export type CoachSurface = 'coach' | 'routine' | 'report' | 'shop' | 'compatibility' | 'community' | 'share'

export type CoachSource = 'mock' | 'llm'
export type CoachTransport = 'mock' | 'live' | 'fallback'
export type CoachMessageStatus = 'ready' | 'thinking' | 'streaming' | 'error'

export interface CoachActionSuggestion {
  label: string
  href?: string
  description: string
  actionId?: string
}

export interface CoachRoutineItem {
  id: string
  title: string
  description: string
  time?: string
  completed?: boolean
}

export interface CoachProductCard {
  id: string
  name: string
  price: number
  discountPrice?: number
  badge?: string
  reason: string
  fitTypes: string[]
}

export interface CoachBundleCard {
  id: string
  name: string
  price: number
  description: string
  items: string[]
  badge?: string
}

export interface CoachCommunityCard {
  id: string
  name: string
  memberCount: number
  description: string
  tags: string[]
  previewPosts: string[]
}

export interface CoachCompatibilityCard {
  score: number
  ownerStyle: string
  strengths: string[]
  frictionPoints: string[]
  suggestions: string[]
}

export interface CoachShareCard {
  title: string
  summary: string
  recipients: string[]
  checklist: string[]
}

export interface CoachContextSnapshot {
  petName: string
  petAvatar: string
  breed: string
  personalityName: string
  personalitySlug: string
  moodSummary: string
  routineStatus: string
  latestVideoResult: string
  latestReportSummary: string
  savedProductSummary: string
  familySharingSummary: string
  trustLabel: string
  weeklyProgress: string
  recentPromptMemory: string[]
}

export type CoachRichBlock =
  | {
      type: 'profile-summary'
      title: string
      subtitle: string
      mood: string
      metrics: Array<{ label: string; value: string }>
    }
  | {
      type: 'routine-checklist'
      title: string
      subtitle: string
      items: CoachRoutineItem[]
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'report-summary'
      title: string
      score: number
      highlights: string[]
      caution: string
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'product-list'
      title: string
      subtitle: string
      products: CoachProductCard[]
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'bundle-list'
      title: string
      subtitle: string
      bundles: CoachBundleCard[]
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'compatibility'
      title: string
      card: CoachCompatibilityCard
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'community-list'
      title: string
      subtitle: string
      groups: CoachCommunityCard[]
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'share-card'
      title: string
      card: CoachShareCard
      ctas?: CoachActionSuggestion[]
    }
  | {
      type: 'warning'
      title: string
      items: string[]
    }
  | {
      type: 'progress'
      title: string
      value: string
      delta: string
      description: string
    }
  | {
      type: 'expandable'
      title: string
      summary: string
      details: string[]
    }

export interface CoachMessage {
  id: string
  role: 'assistant' | 'user'
  text: string
  createdAt: string
  intent: CoachIntent
  status?: CoachMessageStatus
  blocks?: CoachRichBlock[]
  chips?: string[]
  suggestions?: CoachActionSuggestion[]
  source?: CoachSource
  transport?: CoachTransport
  contextUsed?: string[]
  confidence?: number
  errorMessage?: string
}

export interface CoachQuickAction {
  id: string
  label: string
  shortLabel: string
  description: string
  prompt: string
  intent: CoachIntent
  surface: CoachSurface
  icon: 'sparkles' | 'door' | 'report' | 'shopping' | 'heart' | 'community' | 'share' | 'clipboard'
}

export interface CoachResponse {
  text: string
  chips: string[]
  intent: CoachIntent
  suggestions: CoachActionSuggestion[]
  confidence?: number
  source: CoachSource
  transport: CoachTransport
  blocks: CoachRichBlock[]
  contextUsed: string[]
}

export interface CoachGatewayPayload {
  prompt: string
  petName: string
  breed: string
  typeName: string
  typeSlug: string
  moodSummary: string
  recentReport: string
  latestVideoResult: string
  routineTitles: string[]
  savedProductNames: string[]
  familySharingSummary: string
}

export interface CoachDrawerPreset {
  surface: CoachSurface
  title: string
  description: string
  blocks: CoachRichBlock[]
  primaryAction: CoachActionSuggestion
}