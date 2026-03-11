export type ChatIntent =
  | 'routine'
  | 'alone-time'
  | 'report'
  | 'commerce'
  | 'compatibility'
  | 'community'
  | 'general'

export interface AiActionSuggestion {
  label: string
  href: string
  description: string
}

export interface AiReply {
  text: string
  chips: string[]
  intent: ChatIntent
  suggestions: AiActionSuggestion[]
  confidence?: number
  source: 'mock' | 'llm'
}

export interface AiGatewayPayload {
  prompt: string
  petName: string
  breed: string
  typeName: string
  typeSlug: string
  recentReport: string
  routineTitles: string[]
  savedProductNames: string[]
}