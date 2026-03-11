import { bundles, chatSeedMessages, dashboardHighlights, groups, ownerProfile, personalityResults, petProfiles, posts, products, recommendations, reports, routinePlans, savedItems } from '@/data/mock-db'
import { personalityTypeMap, personalityTypes } from '@/data/personality-types'
import type { ChatMessage, PersonalitySlug } from '@/types/domain'

const wait = async (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getCurrentPet() {
  await wait()
  return petProfiles[0]
}

export async function getPersonalityResult(type?: PersonalitySlug) {
  await wait()
  if (type) {
    return personalityResults.find((result) => result.typeSlug === type) ?? personalityResults[0]
  }
  return personalityResults[0]
}

export async function getTypeDetail(slug: PersonalitySlug) {
  await wait()
  return personalityTypeMap[slug]
}

export async function getTypes() {
  await wait()
  return personalityTypes
}

export async function getDashboardData() {
  await wait()
  return {
    pet: petProfiles[0],
    ownerProfile,
    result: personalityResults[0],
    highlights: dashboardHighlights,
    routines: routinePlans,
    reports,
    recommendations,
    savedItems,
    groups: groups.slice(0, 3),
    products: products.slice(0, 3),
  }
}

export async function getCommunityFeed(filter?: string) {
  await wait()
  return {
    groups: filter ? groups.filter((group) => group.slug.includes(filter)) : groups,
    posts,
  }
}

export async function getCommerceData(type?: PersonalitySlug) {
  await wait()
  return {
    products: type ? products.filter((product) => product.typeSlugs.includes(type)) : products,
    bundles: type ? bundles.filter((bundle) => bundle.typeSlug === type || bundle.typeSlug === 'mixed') : bundles,
  }
}

export async function getReports() {
  await wait()
  return reports
}

export async function getRoutinePlans() {
  await wait()
  return routinePlans
}

export async function getChatResponse(prompt: string): Promise<ChatMessage> {
  await wait(200)
  const lower = prompt.toLowerCase()
  let text = '몽이 기준으로 보면 외출 전 과제와 귀가 후 진정 루틴을 함께 설계하는 것이 가장 효과적이에요.'
  let chips = ['오늘 루틴 보기', '추천 상품 보기', '커뮤니티 연결']

  if (lower.includes('현관') || lower.includes('기다')) {
    text = '현관 대기는 애착형에서 자주 보이는 신호예요. 문 앞에 머무는 대신 퍼즐 피더로 시선을 돌리는 루틴을 먼저 만들어주세요.'
  }

  if (lower.includes('상품') || lower.includes('장난감')) {
    text = '껌딱지러버 타입은 혼자 있어도 몰입 가능한 후각 놀이, 그리고 귀가 후 교감을 도와주는 케어템의 조합이 좋아요.'
    chips = ['진정 노즈워크 매트', '애착 안정 번들', '저장하기']
  }

  if (lower.includes('커뮤니티')) {
    text = '지금은 껌딱지러버 모임과 성수 저녁 산책팟이 가장 잘 맞아요. 같은 고민을 가진 보호자들의 실제 루틴을 참고해보세요.'
    chips = ['껌딱지러버 모임', '성수 산책팟', '질문 올리기']
  }

  return {
    id: `chat-${Date.now()}`,
    role: 'assistant',
    text,
    chips,
    createdAt: new Date().toISOString(),
  }
}

export { chatSeedMessages }