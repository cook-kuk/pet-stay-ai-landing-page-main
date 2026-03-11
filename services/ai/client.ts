import { currentUser, petProfiles, products, reports, routinePlans } from '@/data/mock-db'
import { personalityTypeMap } from '@/data/personality-types'
import { getMockAiReply } from '@/services/ai/mock-chat'
import type { AiGatewayPayload, AiReply } from '@/types/ai'

const gatewayUrl = process.env.NEXT_PUBLIC_AI_GATEWAY_URL

function buildPayload(prompt: string): AiGatewayPayload {
  const pet = petProfiles[0]
  const type = personalityTypeMap[pet.mainPersonalityType]

  return {
    prompt,
    petName: pet.name,
    breed: pet.breed,
    typeName: type.name,
    typeSlug: type.slug,
    recentReport: reports[0]?.content ?? '최근 리포트가 아직 없어요.',
    routineTitles: routinePlans.map((plan) => plan.title),
    savedProductNames: products.slice(0, 3).map((product) => product.name),
  }
}

export async function getAiReply(prompt: string): Promise<AiReply> {
  const payload = buildPayload(prompt)

  if (!gatewayUrl) {
    return getMockAiReply(payload)
  }

  try {
    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PetStay-User': currentUser.id,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`AI gateway failed: ${response.status}`)
    }

    const data = (await response.json()) as AiReply
    return { ...data, source: 'llm' }
  } catch {
    return getMockAiReply(payload)
  }
}

export function isLiveAiEnabled() {
  return Boolean(gatewayUrl)
}