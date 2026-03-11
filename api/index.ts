import { getAiReply } from '@/services/ai/client'
import { getCommerceData, getCommunityFeed, getPersonalityResult, getReports, getRoutinePlans } from '@/services/mock-service'
import type { PersonalitySlug, SavedItem } from '@/types/domain'

export const api = {
  uploadTestVideo: async () => ({ uploadId: 'upload-1', status: 'analyzing' as const }),
  getPersonalityResult: async (type?: PersonalitySlug) => getPersonalityResult(type),
  getChatbotResponse: async (prompt: string) => getAiReply(prompt),
  getRoutinePlan: async () => getRoutinePlans(),
  getReports: async () => getReports(),
  getCommunityFeeds: async (filter?: string) => getCommunityFeed(filter),
  getProducts: async (type?: PersonalitySlug) => (await getCommerceData(type)).products,
  getBundles: async (type?: PersonalitySlug) => (await getCommerceData(type)).bundles,
  saveCard: async (payload: SavedItem) => ({ success: true, payload }),
  saveFavoriteItem: async (payload: SavedItem) => ({ success: true, payload }),
  joinGroup: async (groupId: string) => ({ success: true, groupId }),
  shareProfile: async (petId: string) => ({ success: true, petId }),
}