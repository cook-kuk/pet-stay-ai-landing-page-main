import {
  buildBlocksForIntent,
  buildContextReferences,
  buildSuggestionsForIntent,
  coachQuickActions,
  detectIntent,
  inferSurfaceFromIntent,
} from '@/features/chat/mock/coach-data'
import type { CoachGatewayPayload, CoachResponse } from '@/features/chat/types'

function parseMaybeJson(raw: unknown) {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw)
    } catch {
      return { text: raw }
    }
  }

  return raw
}

function normalizeText(text: unknown, payload: CoachGatewayPayload, intent: CoachResponse['intent']) {
  if (typeof text === 'string' && text.trim()) {
    return text.trim()
  }

  switch (intent) {
    case 'routine':
      return `${payload.petName}를 기준으로 오늘 꼭 챙기면 좋은 루틴을 먼저 정리했어요. 예측 가능한 산책, 외출 전 분리 연습, 귀가 후 진정 인사를 같은 흐름으로 묶어보는 게 좋아 보여요.`
    case 'alone-time':
      return `혼자 남는 순간보다, 떠나기 전 분위기 조절이 더 중요해 보여요. ${payload.petName}는 외출 직전 신호에 민감해서 5분 전부터 차분한 패턴을 만들어 주는 편이 효과적이에요.`
    case 'report':
      return `최근 리포트를 보면 초반 긴장만 잘 넘기면 안정감이 빠르게 올라와요. 오늘은 좋은 신호와 조심할 신호를 나눠서 설명해드릴게요.`
    case 'commerce':
      return `${payload.petName}에게 잘 맞을 가능성이 높은 아이템만 추렸어요. 외출 전 긴장과 귀가 후 진정 흐름을 함께 잡아주는 쪽이 지금은 더 설득력 있어 보여요.`
    case 'compatibility':
      return `${payload.petName}는 예측 가능한 루틴과 차분한 반응을 주는 보호자와 특히 잘 맞아요. 궁합 점수보다 중요한 건 매일 반복되는 상호작용 패턴이에요.`
    case 'community':
      return `지금 ${payload.petName}와 비슷한 성향 보호자들이 가장 많이 보는 그룹을 골랐어요. 공감만 많은 그룹보다 실행 팁이 쌓인 커뮤니티가 더 잘 맞아 보여요.`
    case 'share':
      return `가족이나 시터가 바로 이해할 수 있도록 오늘 상태를 짧고 실용적으로 묶어드릴게요. 인사 방식과 루틴 타이밍을 통일하는 게 핵심이에요.`
    default:
      return `${payload.petName}의 성향 결과, 루틴 상태, 최근 리포트를 함께 보고 있어요. 원하는 주제를 누르면 그 맥락을 이어서 더 구체적으로 정리해드릴게요.`
  }
}

export function normalizeAiResponse(raw: unknown, payload: CoachGatewayPayload, source: CoachResponse['source'], transport: CoachResponse['transport']): CoachResponse {
  const parsed = parseMaybeJson(raw) as Partial<CoachResponse> & { text?: string; chips?: string[]; suggestions?: CoachResponse['suggestions']; intent?: CoachResponse['intent'] }
  const intent = parsed.intent ?? detectIntent(payload.prompt)
  const surface = inferSurfaceFromIntent(intent)

  return {
    text: normalizeText(parsed.text, payload, intent),
    chips: parsed.chips?.length ? parsed.chips : coachQuickActions.slice(0, 6).map((action) => action.label),
    intent,
    suggestions: parsed.suggestions?.length ? parsed.suggestions : buildSuggestionsForIntent(intent),
    confidence: parsed.confidence ?? 0.84,
    source,
    transport,
    blocks: Array.isArray(parsed.blocks) && parsed.blocks.length ? parsed.blocks : buildBlocksForIntent(intent),
    contextUsed: parsed.contextUsed?.length ? parsed.contextUsed : buildContextReferences(surface),
  }
}