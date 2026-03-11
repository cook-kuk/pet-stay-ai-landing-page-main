import { normalizeAiResponse } from '@/features/chat/lib/response-adapter'
import type { CoachGatewayPayload, CoachResponse } from '@/features/chat/types'

export async function getMockAiReply(payload: CoachGatewayPayload): Promise<CoachResponse> {
  const raw = {
    text: payload.prompt,
  }

  return normalizeAiResponse(raw, payload, 'mock', 'mock')
}