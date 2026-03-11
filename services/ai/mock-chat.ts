import { defaultQuickReplies } from '@/constants/ai'
import type { AiGatewayPayload, AiReply } from '@/types/ai'

function buildSuggestions(intent: AiReply['intent']) {
  switch (intent) {
    case 'routine':
      return [
        { label: '오늘 루틴 열기', href: '/dashboard/today', description: '오늘 체크할 루틴 바로 보기' },
        { label: '7일 플랜 보기', href: '/routine', description: '개선 플랜으로 이어가기' },
      ]
    case 'alone-time':
      return [
        { label: '귀가 후 리포트', href: '/report', description: '최근 집비움 리포트 보기' },
        { label: '분리불안 상품', href: '/shop/type/clingy-lover', description: '안정감 중심 추천 보기' },
      ]
    case 'report':
      return [
        { label: '리포트 모아보기', href: '/dashboard/reports', description: '이번 주 변화까지 같이 보기' },
        { label: '가족과 공유', href: '/family', description: '공유 가능한 카드와 체크리스트' },
      ]
    case 'commerce':
      return [
        { label: '쇼핑 추천 열기', href: '/shop', description: '타입 맞춤 상품 보기' },
        { label: '번들 보기', href: '/bundles', description: '목적형 번들 확인' },
      ]
    case 'compatibility':
      return [
        { label: '궁합 보기', href: '/compatibility', description: '보호자 성향과 같이 확인' },
        { label: '공유 카드 만들기', href: '/compatibility', description: '공유용 카드 느낌으로 보기' },
      ]
    case 'community':
      return [
        { label: '추천 커뮤니티', href: '/community', description: '같은 유형/동네 그룹 보기' },
        { label: '타입 그룹 입장', href: '/community/type/clingy-lover', description: '가장 가까운 그룹으로 이동' },
      ]
    default:
      return [
        { label: '대시보드 홈', href: '/dashboard', description: '오늘 상태와 추천 보기' },
        { label: '챗봇 계속', href: '/chat', description: '다른 질문 이어서 하기' },
      ]
  }
}

function detectIntent(prompt: string): AiReply['intent'] {
  const lower = prompt.toLowerCase()
  if (lower.includes('루틴')) return 'routine'
  if (lower.includes('집비움') || lower.includes('혼자') || lower.includes('기다')) return 'alone-time'
  if (lower.includes('리포트') || lower.includes('보고')) return 'report'
  if (lower.includes('상품') || lower.includes('쇼핑') || lower.includes('장난감') || lower.includes('번들')) return 'commerce'
  if (lower.includes('궁합') || lower.includes('잘 맞')) return 'compatibility'
  if (lower.includes('커뮤니티') || lower.includes('모임') || lower.includes('산책팟')) return 'community'
  return 'general'
}

export async function getMockAiReply(payload: AiGatewayPayload): Promise<AiReply> {
  const intent = detectIntent(payload.prompt)
  let text = `${payload.petName}는 ${payload.typeName} 성향이 강해서 오늘은 안정감 있는 루틴과 짧은 교감 루틴을 같이 설계하는 게 좋아요.`

  if (intent === 'routine') {
    text = `${payload.petName}의 오늘 추천 루틴은 “${payload.routineTitles[0] ?? '외출 전 분리 연습'}”부터 시작하는 거예요. 먼저 에너지를 낮추고, 귀가 후에는 짧고 차분한 인사로 마무리하면 루틴 체감이 더 좋아집니다.`
  }

  if (intent === 'alone-time') {
    text = `최근 리포트를 보면 ${payload.recentReport} 패턴이 있었어요. ${payload.typeName} 타입은 혼자 남겨지는 초반 10~15분이 특히 중요해서, 외출 전 과제와 귀가 후 진정 인사를 묶어주는 게 가장 효과적이에요.`
  }

  if (intent === 'report') {
    text = `이번 리포트는 “${payload.recentReport}” 흐름으로 해석할 수 있어요. 즉, 완전히 불안정한 상태가 아니라 초반 전환만 조금 더 매끄럽게 만들어주면 점수가 빠르게 좋아질 가능성이 큽니다.`
  }

  if (intent === 'commerce') {
    text = `${payload.typeName} 타입에는 혼자 있어도 몰입 가능한 후각 놀이와 귀가 후 교감을 돕는 케어템 조합이 좋아요. 지금 저장된 상품 ${payload.savedProductNames[0] ?? '진정 노즈워크 매트'} 쪽이 가장 자연스럽게 이어집니다.`
  }

  if (intent === 'compatibility') {
    text = `${payload.typeName} 성향은 보호자의 반응 방식에 영향을 많이 받아요. 일정한 루틴, 차분한 귀가 인사, 감정 표현은 충분히 하되 과하게 끌어올리지 않는 스타일이 잘 맞습니다.`
  }

  if (intent === 'community') {
    text = `${payload.typeName} 보호자들은 비슷한 고민을 빠르게 공감해줘서 체감 효용이 큰 편이에요. 같은 유형 그룹과 동네 산책 그룹을 같이 보면 정보와 실행 모두 챙기기 좋습니다.`
  }

  return {
    text,
    chips: defaultQuickReplies,
    intent,
    suggestions: buildSuggestions(intent),
    confidence: 0.78,
    source: 'mock',
  }
}