export type PersonalitySlug =
  | 'sofa-guardian'
  | 'clingy-lover'
  | 'sensitive-sensor'
  | 'solo-explorer'
  | 'routine-master'
  | 'wait-master'
  | 'door-radar'
  | 'treat-hunter'
  | 'walk-engine'
  | 'attention-seeker'
  | 'excitement-booster'
  | 'home-explorer'
  | 'energy-firework'
  | 'love-sprinter'
  | 'guard-captain'
  | 'adventure-instinct'

export type CommunityGroupType = 'type' | 'breed' | 'local'
export type ReportType = 'after-leave' | 'weekly-change' | 'personality-trend' | 'routine-effectiveness'
export type PlanType = 'today' | 'pre-leave' | 'after-return' | 'seven-day'
export type RecommendationType = 'routine' | 'community' | 'shop' | 'bundle' | 'premium'
export type SavedItemType = 'result-card' | 'product' | 'bundle' | 'group' | 'report'

export interface PersonalityType {
  slug: PersonalitySlug
  name: string
  subtitle: string
  tags: string[]
  summary: string
  traits: string[]
  aloneTimeSignals: string[]
  ownerMistakes: string[]
  routineRecommendations: string[]
  playRecommendations: string[]
  shoppingRecommendations: string[]
  compatibleOwnerTypes: string[]
  compatibleDogTypes: PersonalitySlug[]
  communityCategory: string
  accent: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar: string
  createdAt: string
}

export interface OwnerProfile {
  id: string
  userId: string
  personalityType: string
  lifestyle: string
  location: string
  preferences: string[]
}

export interface PetProfile {
  id: string
  userId: string
  name: string
  breed: string
  ageMonths: number
  size: 'small' | 'medium' | 'large'
  weight: number
  sex: 'male' | 'female'
  neutered: boolean
  avatar: string
  mainPersonalityType: PersonalitySlug
  subTraits: string[]
  createdAt: string
}

export interface PersonalityResult {
  id: string
  petProfileId: string
  typeSlug: PersonalitySlug
  confidence: number
  summary: string
  resultCardData: {
    matchScore: number
    caution: string
    strengths: string[]
    routines: string[]
  }
  createdAt: string
}

export interface VideoUpload {
  id: string
  petProfileId: string
  fileUrl: string
  duration: number
  status: 'queued' | 'analyzing' | 'completed'
  analyzedAt: string | null
}

export interface RoutinePlan {
  id: string
  petProfileId: string
  typeSlug: PersonalitySlug
  title: string
  planType: PlanType
  items: Array<{
    id: string
    title: string
    description: string
    completed?: boolean
    time?: string
  }>
  createdAt: string
}

export interface RoutineLog {
  id: string
  petProfileId: string
  date: string
  completedItems: string[]
  notes: string
}

export interface Report {
  id: string
  petProfileId: string
  reportType: ReportType
  title: string
  content: string
  score: number
  createdAt: string
}

export interface CommunityGroup {
  id: string
  groupType: CommunityGroupType
  slug: string
  name: string
  description: string
  memberCount: number
}

export interface CommunityPost {
  id: string
  groupId: string
  authorId: string
  title: string
  content: string
  createdAt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  discountPrice: number | null
  tags: string[]
  image: string
  description: string
  typeSlugs: PersonalitySlug[]
  reason: string
}

export interface Bundle {
  id: string
  slug: string
  name: string
  typeSlug: PersonalitySlug | 'mixed'
  description: string
  price: number
  items: string[]
}

export interface Recommendation {
  id: string
  petProfileId: string
  recommendationType: RecommendationType
  payload: Record<string, unknown>
  createdAt: string
}

export interface SavedItem {
  id: string
  userId: string
  itemType: SavedItemType
  itemId: string
}

export interface FamilyMember {
  id: string
  petProfileId: string
  userId: string
  role: string
  permissions: string[]
}

export interface SitterAccess {
  id: string
  petProfileId: string
  invitedEmail: string
  permissions: string[]
  expiresAt: string
}

export interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  text: string
  chips?: string[]
  createdAt: string
}

export interface DashboardHighlight {
  title: string
  value: string
  caption: string
}