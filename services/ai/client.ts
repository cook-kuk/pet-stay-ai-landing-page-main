import { coachSnapshot } from '@/features/chat/mock/coach-data'
import { normalizeAiResponse } from '@/features/chat/lib/response-adapter'
import { getMockAiReply } from '@/services/ai/mock-chat'
import type { CoachGatewayPayload, CoachResponse } from '@/features/chat/types'

const gatewayUrl = process.env.NEXT_PUBLIC_AI_GATEWAY_URL

function buildPayload(prompt: string): CoachGatewayPayload {
  return {
    prompt,
    petName: coachSnapshot.petName,
    breed: coachSnapshot.breed,
    typeName: coachSnapshot.personalityName,
    typeSlug: coachSnapshot.personalitySlug,
    moodSummary: coachSnapshot.moodSummary,
    recentReport: coachSnapshot.latestReportSummary,
    latestVideoResult: coachSnapshot.latestVideoResult,
    routineTitles: ['짧은 집중 산책', '외출 전 분리 연습', '귀가 후 진정 인사'],
    savedProductNames: ['안정 노즈워크 매트', '귀가 후 릴렉스 브러시'],
    familySharingSummary: coachSnapshot.familySharingSummary,
  }
}

export async function getAiReply(prompt: string): Promise<CoachResponse> {
  const payload = buildPayload(prompt)

  if (!gatewayUrl) {
    return getMockAiReply(payload)
  }

  try {
    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PetStay-User': 'user-1',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`AI gateway failed: ${response.status}`)
    }

    const data = await response.json()
    return normalizeAiResponse(data, payload, 'llm', 'live')
  } catch {
    const fallback = await getMockAiReply(payload)
    return { ...fallback, transport: 'fallback' }
  }
}

export function isLiveAiEnabled() {
  return Boolean(gatewayUrl)
}