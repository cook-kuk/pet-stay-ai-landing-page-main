import type {
  CoachContextSnapshot,
  CoachDrawerPreset,
  CoachIntent,
  CoachQuickAction,
  CoachResponse,
  CoachRichBlock,
  CoachSurface,
} from '@/features/chat/types'

export const coachSnapshot: CoachContextSnapshot = {
  petName: '몽이',
  petAvatar: '몽',
  breed: '말티푸',
  personalityName: '껌딱지러버',
  personalitySlug: 'clingy-lover',
  moodSummary: '오늘은 보호자 동선을 유독 많이 따라다니고, 외출 전에는 긴장이 조금 빨리 올라와요.',
  routineStatus: '오늘 루틴 3개 중 1개 완료, 귀가 후 진정 루틴이 남아 있어요.',
  latestVideoResult: '18초 영상에서 현관 대기, 짧은 낑낑거림, 귀가 후 빠른 안정 신호가 함께 관찰됐어요.',
  latestReportSummary: '최근 집비움 리포트 점수는 82점이에요. 초반 12분만 잘 넘기면 안정감이 좋아져요.',
  savedProductSummary: '안정 노즈워크 매트와 귀가 후 릴렉스 브러시를 저장해둔 상태예요.',
  familySharingSummary: '엄마와 산책 시터가 루틴과 리포트를 함께 보고 있어요.',
  trustLabel: 'Claude 기반 AI 코치',
  weeklyProgress: '이번 주 분리 직후 긴장 시간이 3분 10초 줄었어요.',
  recentPromptMemory: ['오늘 루틴 추천해줘', '집비움 관리 팁 알려줘', '껌딱지러버용 쇼핑 추천 보여줘'],
}

export const coachQuickActions: CoachQuickAction[] = [
  {
    id: 'routine',
    label: '오늘 루틴 추천',
    shortLabel: '오늘 루틴',
    description: '몽이를 기준으로 오늘 꼭 챙기면 좋은 루틴을 바로 정리해줘요.',
    prompt: '몽이를 기준으로 오늘 루틴 추천해줘.',
    intent: 'routine',
    surface: 'routine',
    icon: 'sparkles',
  },
  {
    id: 'alone-time',
    label: '집비움 관리 팁',
    shortLabel: '집비움',
    description: '외출 전, 혼자 있는 중, 귀가 후까지 끊기지 않게 코칭해줘요.',
    prompt: '몽이가 혼자 있을 때 불안하지 않도록 집비움 관리 팁을 알려줘.',
    intent: 'alone-time',
    surface: 'routine',
    icon: 'door',
  },
  {
    id: 'report',
    label: '귀가 후 리포트 설명',
    shortLabel: '리포트',
    description: '최근 리포트 신호를 짚고 오늘 개선 포인트까지 설명해줘요.',
    prompt: '몽이의 귀가 후 리포트를 해설해줘.',
    intent: 'report',
    surface: 'report',
    icon: 'report',
  },
  {
    id: 'commerce',
    label: '쇼핑 추천',
    shortLabel: '쇼핑',
    description: '성향과 오늘 컨디션에 맞는 아이템만 추려서 보여줘요.',
    prompt: '몽이에게 잘 맞는 쇼핑 추천을 해줘.',
    intent: 'commerce',
    surface: 'shop',
    icon: 'shopping',
  },
  {
    id: 'compatibility',
    label: '궁합 분석',
    shortLabel: '궁합',
    description: '보호자 성향과 몽이의 반응 패턴을 함께 보며 잘 맞는 상호작용을 정리해줘요.',
    prompt: '몽이와 보호자 궁합을 분석해줘.',
    intent: 'compatibility',
    surface: 'compatibility',
    icon: 'heart',
  },
  {
    id: 'community',
    label: '커뮤니티 추천',
    shortLabel: '커뮤니티',
    description: '같은 성향, 같은 견종, 같은 지역의 그룹까지 이어줘요.',
    prompt: '몽이에게 맞는 커뮤니티를 추천해줘.',
    intent: 'community',
    surface: 'community',
    icon: 'community',
  },
  {
    id: 'family-share',
    label: '가족과 공유',
    shortLabel: '가족 공유',
    description: '오늘 상태를 가족용 카드로 정리해서 바로 공유할 수 있어요.',
    prompt: '몽이의 현재 상태를 가족과 공유할 수 있게 요약해줘.',
    intent: 'share',
    surface: 'share',
    icon: 'share',
  },
  {
    id: 'sitter-share',
    label: '시터용 요약 만들기',
    shortLabel: '시터용 요약',
    description: '시터가 바로 이해할 수 있게 주의 포인트와 루틴을 묶어줘요.',
    prompt: '몽이의 시터용 인수인계 요약을 만들어줘.',
    intent: 'share',
    surface: 'share',
    icon: 'clipboard',
  },
]

export const surfaceLabels: Array<{ id: CoachSurface; label: string }> = [
  { id: 'coach', label: 'AI 코치' },
  { id: 'routine', label: '오늘 루틴' },
  { id: 'report', label: '리포트 해설' },
  { id: 'shop', label: '쇼핑 추천' },
  { id: 'compatibility', label: '궁합' },
  { id: 'community', label: '커뮤니티' },
  { id: 'share', label: '공유' },
]

function routineBlock(): CoachRichBlock {
  return {
    type: 'routine-checklist',
    title: '오늘 루틴 체크리스트',
    subtitle: '몽이를 기준으로 오늘 꼭 챙기면 좋은 흐름만 정리했어요.',
    items: [
      { id: 'routine-1', title: '짧은 집중 산책', description: '아침 10분 정도 냄새 맡기 중심으로 천천히 걸어주세요.', time: '08:10', completed: true },
      { id: 'routine-2', title: '외출 전 분리 연습', description: '문 앞 3분 대기 후 조용히 나가는 패턴을 반복해 주세요.', time: '09:00' },
      { id: 'routine-3', title: '귀가 후 진정 인사', description: '바로 안아주기보다 30초만 차분하게 기다렸다가 인사해 주세요.', time: '19:10' },
    ],
    ctas: [
      { label: '루틴 저장', description: '오늘 루틴을 보관하고 내일도 이어서 볼 수 있어요.', actionId: 'save-routine' },
      { label: '가족과 공유', description: '같은 루틴을 가족 체크리스트로 보낼 수 있어요.', actionId: 'share-family' },
    ],
  }
}

function reportBlock(): CoachRichBlock {
  return {
    type: 'report-summary',
    title: '최근 집비움 리포트 해설',
    score: 82,
    highlights: ['현관 앞 대기 시간은 줄고 있어요.', '초반 12분만 지나면 혼자 있는 시간이 훨씬 안정적이에요.', '귀가 직후 흥분은 있지만 진정 속도는 빨라졌어요.'],
    caution: '떠나기 전 분위기 조절이 가장 중요해 보여요. 급하게 챙기는 움직임이 바로 신호가 되고 있어요.',
    ctas: [
      { label: '이번 주 변화 보기', href: '/dashboard/reports', description: '주간 변화와 함께 비교해서 볼 수 있어요.' },
      { label: '다음 개선안 듣기', actionId: 'report-next', description: '다음 외출 때 바로 써볼 개선안을 받아보세요.' },
    ],
  }
}

function productBlock(): CoachRichBlock {
  return {
    type: 'product-list',
    title: '몽이에게 잘 맞을 가능성이 높은 아이템',
    subtitle: '애착형 반응과 귀가 후 긴장을 함께 고려해 추렸어요.',
    products: [
      {
        id: 'prod-calm-mat',
        name: '안정 노즈워크 매트',
        price: 32000,
        discountPrice: 27000,
        badge: '성향 맞춤',
        reason: '외출 직전 시선을 바꿔주고 초반 긴장 에너지를 분산시키는 데 좋아요.',
        fitTypes: ['껌딱지러버', '예민센서'],
      },
      {
        id: 'prod-return-brush',
        name: '귀가 후 릴렉스 브러시',
        price: 22000,
        reason: '귀가 직후 흥분을 부드럽게 낮추고 안정 신호를 만드는 데 잘 맞아요.',
        fitTypes: ['껌딱지러버', '사랑직진러'],
      },
      {
        id: 'prod-soft-chew',
        name: '저자극 소프트 츄 세트',
        price: 18000,
        badge: '재구매 높음',
        reason: '혼자 남는 순간보다 떠나기 전 분위기 조절에 더 도움을 주는 타입이에요.',
        fitTypes: ['껌딱지러버', '기다림장인'],
      },
    ],
    ctas: [
      { label: '번들 보기', href: '/bundles', description: '상황별 추천 번들을 한 번에 볼 수 있어요.' },
      { label: '추천 상품 더 보기', href: '/shop', description: '전체 샵에서 더 넓게 비교할 수 있어요.' },
    ],
  }
}

function bundleBlock(): CoachRichBlock {
  return {
    type: 'bundle-list',
    title: '상황별 번들 제안',
    subtitle: '지금 필요한 목적별 조합만 골라봤어요.',
    bundles: [
      { id: 'bundle-clingy', name: '껌딱지러버 안정 키트', price: 69000, description: '외출 전 안정 루틴과 귀가 후 진정 루틴을 함께 설계하는 조합이에요.', items: ['안정 노즈워크 매트', '귀가 후 릴렉스 브러시'], badge: '가장 많이 저장' },
      { id: 'bundle-return', name: '귀가 후 릴렉스 키트', price: 79000, description: '귀가 직후 들뜸을 차분하게 정리하는 흐름에 초점을 둔 구성이에요.', items: ['릴렉스 브러시', '저자극 츄 세트'] },
      { id: 'bundle-separation', name: '집비움 적응 스타터팩', price: 99000, description: '집비움 적응 초반에 가장 많이 쓰는 루틴형 조합이에요.', items: ['안정 매트', '소프트 츄', '체크 카드'] },
    ],
    ctas: [{ label: '번들 페이지 열기', href: '/bundles', description: '번들별 상세 설명과 가격을 볼 수 있어요.' }],
  }
}

function compatibilityBlock(): CoachRichBlock {
  return {
    type: 'compatibility',
    title: '몽이와 보호자 궁합 카드',
    card: {
      score: 91,
      ownerStyle: '계획형이지만 애정 표현이 분명한 보호자와 특히 잘 맞아요.',
      strengths: ['루틴을 지켜주면 안정감이 빠르게 올라와요.', '차분한 귀가 인사를 해주면 흥분이 오래 가지 않아요.', '짧고 자주 반응을 주는 보호자와 정서적으로 잘 맞아요.'],
      frictionPoints: ['급하게 외출 준비를 하면 긴장이 빠르게 올라와요.', '갑작스러운 스킨십보다 예고된 인사가 더 편안해요.'],
      suggestions: ['외출 5분 전부터 분위기를 낮춰주세요.', '귀가 직후 30초는 차분하게 기다려 주세요.', '하루 한 번은 예측 가능한 산책 루틴을 만들어 주세요.'],
    },
    ctas: [
      { label: '공유 카드 만들기', actionId: 'share-card', description: '궁합 결과를 카드로 만들어 공유할 수 있어요.' },
      { label: '내가 강아지라면 보기', href: '/if-i-were-a-dog', description: '보호자 성향과 맞는 유형을 더 살펴볼 수 있어요.' },
    ],
  }
}

function communityBlock(): CoachRichBlock {
  return {
    type: 'community-list',
    title: '지금 몽이와 비슷한 보호자들이 가장 많이 보는 그룹',
    subtitle: '같은 성향, 같은 견종, 같은 지역 흐름을 함께 보여드릴게요.',
    groups: [
      {
        id: 'group-type',
        name: '껌딱지러버 보호자 모임',
        memberCount: 2180,
        description: '외출 전 루틴, 귀가 후 인사법, 애착형 관리 팁이 가장 활발한 그룹이에요.',
        tags: ['같은 유형', '루틴 공유', '질문 많음'],
        previewPosts: ['귀가 후 흥분 줄인 인사 루틴 공유해요', '문 앞 대기 시간을 줄인 노즈워크 조합'],
      },
      {
        id: 'group-breed',
        name: '말티푸 실전 커뮤니티',
        memberCount: 1642,
        description: '말티푸 특유의 예민함과 애착 반응을 함께 다루는 보호자 그룹이에요.',
        tags: ['같은 견종', '제품 후기', '산책 질문'],
        previewPosts: ['말티푸 귀가 후 진정템 추천 받아요', '미용 후 집비움 반응이 달라졌어요'],
      },
      {
        id: 'group-local',
        name: '성수 평일 산책 그룹',
        memberCount: 486,
        description: '퇴근 후 짧게 만나기 좋은 지역 산책 그룹이에요.',
        tags: ['지역 모임', '평일 산책', '오프라인'],
        previewPosts: ['성수에서 20분 코스 같이 걸을 분', '비 오는 날 실내 놀이 팁 교환해요'],
      },
    ],
    ctas: [
      { label: '커뮤니티 참여', href: '/community', description: '추천 그룹을 더 넓게 비교하고 들어갈 수 있어요.' },
      { label: 'AI 추천 그룹 더 보기', actionId: 'more-community', description: '몽이 성향 기준으로 그룹을 더 찾아드릴게요.' },
    ],
  }
}

function shareBlock(title = '가족 공유 카드'): CoachRichBlock {
  return {
    type: 'share-card',
    title,
    card: {
      title: '몽이 오늘 상태 공유',
      summary: '오늘은 외출 전 긴장을 조금 빨리 보였지만, 귀가 후 안정 속도는 좋은 편이에요. 가족 모두 같은 인사 루틴을 맞추면 더 좋아질 가능성이 높아요.',
      recipients: ['엄마', '산책 시터'],
      checklist: ['귀가 직후 30초 기다리기', '외출 전 노즈워크 5분 주기', '하루 1번 짧은 집중 산책 공유'],
    },
    ctas: [
      { label: '가족에게 공유', actionId: 'share-family', description: '가족 그룹에 바로 보낼 수 있는 요약이에요.' },
      { label: '시터용 버전 만들기', actionId: 'share-sitter', description: '시터가 바로 읽을 수 있는 톤으로 바꿔드릴게요.' },
    ],
  }
}

function profileBlock(): CoachRichBlock {
  return {
    type: 'profile-summary',
    title: '몽이 설명 챗봇이 아니라, 생활 코치로 보고 있어요.',
    subtitle: '성향 결과, 오늘 루틴, 최근 리포트, 저장한 상품, 가족 공유 상태까지 함께 보고 있어요.',
    mood: coachSnapshot.moodSummary,
    metrics: [
      { label: '최근 성향', value: coachSnapshot.personalityName },
      { label: '오늘 루틴 상태', value: '3개 중 1개 완료' },
      { label: '최근 리포트', value: '82점 / 초반 긴장 관리 필요' },
    ],
  }
}

export const starterBlocks: CoachRichBlock[] = [profileBlock(), routineBlock(), reportBlock()]

export const initialCoachResponses: CoachResponse[] = [
  {
    text: '몽이를 기준으로 오늘 바로 써볼 수 있는 루틴과 리포트 포인트를 먼저 묶어뒀어요. 지금 필요한 주제를 누르면 Claude가 맥락을 이어서 더 깊게 정리해드릴게요.',
    chips: coachQuickActions.slice(0, 6).map((item) => item.label),
    intent: 'general',
    suggestions: [
      { label: '오늘 루틴 보기', actionId: 'routine', description: '바로 체크할 수 있는 루틴 카드로 볼 수 있어요.' },
      { label: '최근 리포트 해설', actionId: 'report', description: '오늘 점수와 개선 포인트를 한 번에 볼 수 있어요.' },
    ],
    confidence: 0.91,
    source: 'mock',
    transport: 'mock',
    blocks: starterBlocks,
    contextUsed: ['최근 성향 결과', '오늘 루틴 상태', '최근 집비움 리포트'],
  },
]

export function buildBlocksForIntent(intent: CoachIntent): CoachRichBlock[] {
  switch (intent) {
    case 'personality':
      return [
        profileBlock(),
        {
          type: 'expandable',
          title: '왜 껌딱지러버로 해석했는지',
          summary: '몽이는 보호자 동선 추적, 외출 전 대기, 귀가 후 빠른 재결합 욕구가 함께 보여요.',
          details: [
            '현관 앞 대기 시간이 반복적으로 관찰됐어요.',
            '보호자 움직임에 반응하는 속도가 빨라요.',
            '귀가 후 안정은 빠르지만 재결합 욕구가 강하게 나타나요.',
          ],
        },
        { type: 'warning', title: '보호자가 자주 하는 실수', items: ['외출 전 목소리가 커지는 것', '귀가 직후 과한 반응으로 흥분을 키우는 것', '루틴 없이 랜덤하게 안아주는 것'] },
      ]
    case 'routine':
      return [routineBlock(), { type: 'progress', title: '루틴 지속감', value: '5일 연속', delta: '+2일', description: '이번 주에는 귀가 후 진정 루틴이 특히 안정적으로 이어지고 있어요.' }]
    case 'alone-time':
      return [
        {
          type: 'expandable',
          title: '집비움 관리 핵심',
          summary: '혼자 남는 순간보다, 떠나기 전 분위기 조절이 더 중요해 보여요.',
          details: ['외출 5분 전부터 속도를 줄여 주세요.', '문 앞 대기 연습을 3분만 반복해도 신호가 달라져요.', '귀가 후 인사는 30초 차분하게 늦추는 편이 좋아요.'],
        },
        routineBlock(),
        { type: 'warning', title: '오늘 특히 주의할 신호', items: ['가방 드는 순간 빠르게 따라오기', '현관 주변 맴돌기', '외출 직전 낑낑거림'] },
      ]
    case 'report':
      return [reportBlock(), { type: 'progress', title: '이번 주 변화', value: '초반 긴장 -3분 10초', delta: '개선 중', description: '외출 전 노즈워크 루틴을 시작한 이후 변화가 가장 크게 보이고 있어요.' }]
    case 'commerce':
      return [productBlock(), bundleBlock()]
    case 'compatibility':
      return [compatibilityBlock(), { type: 'expandable', title: '잘 맞는 상호작용 방식', summary: '정해진 루틴과 짧고 부드러운 피드백이 가장 잘 맞아요.', details: ['짧은 칭찬을 자주 주세요.', '예고 없는 스킨십보다는 부드럽게 접근해 주세요.', '산책 전후의 흐름을 일정하게 맞춰 주세요.'] }]
    case 'community':
      return [communityBlock(), { type: 'expandable', title: 'AI 추천 그룹 이유', summary: '지금 필요한 건 공감보다 실행 팁과 일상 루틴 사례가 많은 그룹이에요.', details: ['같은 성향 그룹에서 집비움 사례를 가장 많이 다뤄요.', '견종 그룹에서는 제품 후기가 풍부해요.', '지역 그룹은 산책 루틴 유지에 도움이 돼요.'] }]
    case 'share':
      return [shareBlock(), { type: 'warning', title: '가족과 꼭 맞춰야 할 포인트', items: ['귀가 후 인사 방식 통일', '외출 전 톤 낮추기', '간식 타이밍 일관되게 유지하기'] }]
    default:
      return starterBlocks
  }
}

export function buildSuggestionsForIntent(intent: CoachIntent) {
  switch (intent) {
    case 'routine':
      return [
        { label: '루틴 저장', actionId: 'save-routine', description: '오늘 루틴을 저장해 내일도 이어서 볼 수 있어요.' },
        { label: '가족과 공유', actionId: 'share-family', description: '같은 루틴을 가족에게 바로 보낼 수 있어요.' },
      ]
    case 'alone-time':
      return [
        { label: '귀가 후 리포트 해설', actionId: 'report', description: '외출 뒤 어떤 신호가 나왔는지 이어서 볼 수 있어요.' },
        { label: '추천 상품 보기', actionId: 'commerce', description: '불안을 낮추는 아이템을 바로 비교할 수 있어요.' },
      ]
    case 'report':
      return [
        { label: '다음 루틴 받기', actionId: 'routine', description: '리포트를 바탕으로 다음 루틴을 바로 만들어요.' },
        { label: '프리미엄 주간 리포트', href: '/dashboard/reports', description: '주간 흐름을 더 길게 비교해 볼 수 있어요.' },
      ]
    case 'commerce':
      return [
        { label: '번들 보기', href: '/bundles', description: '목적별 번들을 한 번에 비교해 볼 수 있어요.' },
        { label: '저장하기', actionId: 'save-answer', description: '마음에 드는 추천을 저장해 둘 수 있어요.' },
      ]
    case 'compatibility':
      return [
        { label: '결과 카드 만들기', actionId: 'share-card', description: '궁합 카드를 예쁘게 저장할 수 있어요.' },
        { label: '내가 강아지라면', href: '/if-i-were-a-dog', description: '보호자 타입 분석을 이어서 볼 수 있어요.' },
      ]
    case 'community':
      return [
        { label: '커뮤니티 참여', href: '/community', description: '추천 그룹으로 바로 이동할 수 있어요.' },
        { label: '질문 올리기', actionId: 'community-question', description: '지금 고민을 질문 포맷으로 정리해드릴게요.' },
      ]
    case 'share':
      return [
        { label: '가족에게 공유', actionId: 'share-family', description: '가족용 카드로 깔끔하게 공유할 수 있어요.' },
        { label: '시터용 요약', actionId: 'share-sitter', description: '시터가 필요한 정보만 모아 드릴게요.' },
      ]
    default:
      return [
        { label: '오늘 루틴 추천', actionId: 'routine', description: '오늘 바로 실행할 루틴을 받아보세요.' },
        { label: '집비움 관리 팁', actionId: 'alone-time', description: '외출 전후 관리 포인트를 정리해드릴게요.' },
      ]
  }
}

export function buildContextReferences(surface: CoachSurface) {
  const shared = ['반려견 이름: 몽이', '최근 성향 결과: 껌딱지러버', '최근 업로드 영상: 현관 대기 + 귀가 후 빠른 안정']

  switch (surface) {
    case 'routine':
      return [...shared, '최근 루틴 상태: 3개 중 1개 완료', '최근 리포트 요약: 초반 12분 집중 관리 필요']
    case 'report':
      return [...shared, '최근 집비움 리포트: 82점', '가족 공유 상태: 엄마와 시터가 확인 중']
    case 'shop':
      return [...shared, '저장한 추천 상품: 안정 노즈워크 매트', '최근 감정 신호: 외출 직전 긴장 상승']
    case 'compatibility':
      return [...shared, '보호자 스타일: 계획형 + 다정한 피드백', '최근 루틴 상태: 예측 가능한 흐름에 잘 반응']
    case 'community':
      return [...shared, '같은 성향 그룹 활동량: 높음', '지역 그룹 후보: 성수 평일 산책 그룹']
    case 'share':
      return [...shared, '가족 공유 상태: 엄마 + 시터', '시터 메모 필요: 귀가 후 인사 방식 통일']
    default:
      return [...shared, '최근 루틴 상태: 3개 중 1개 완료', '최근 리포트 요약: 82점 / 초반 긴장 관리 필요']
  }
}

export function getDrawerPreset(surface: CoachSurface): CoachDrawerPreset {
  const bySurface: Record<CoachSurface, CoachDrawerPreset> = {
    coach: {
      surface: 'coach',
      title: 'AI 코치 요약',
      description: 'Claude가 지금 참고 중인 핵심 정보와 바로 이어서 할 액션이에요.',
      blocks: starterBlocks,
      primaryAction: { label: '오늘 루틴 바로 듣기', actionId: 'routine', description: '가장 많이 다시 찾는 액션이에요.' },
    },
    routine: {
      surface: 'routine',
      title: '오늘 루틴 드로어',
      description: '지금 바로 체크하고 저장할 수 있는 루틴만 모아뒀어요.',
      blocks: [routineBlock()],
      primaryAction: { label: '루틴 저장', actionId: 'save-routine', description: '오늘 루틴을 저장할 수 있어요.' },
    },
    report: {
      surface: 'report',
      title: '리포트 해설 드로어',
      description: '좋았던 신호와 조심할 신호를 한 번에 정리했어요.',
      blocks: [reportBlock()],
      primaryAction: { label: '다음 개선안 듣기', actionId: 'report-next', description: '다음 외출에 바로 적용해보세요.' },
    },
    shop: {
      surface: 'shop',
      title: '쇼핑 추천 드로어',
      description: '지금 몽이에게 맞는 상품과 번들을 함께 보여드릴게요.',
      blocks: [productBlock(), bundleBlock()],
      primaryAction: { label: '번들 보기', href: '/bundles', description: '상황별 번들로 이어서 볼 수 있어요.' },
    },
    compatibility: {
      surface: 'compatibility',
      title: '궁합 분석 드로어',
      description: '몽이와 보호자 리듬이 잘 맞는 순간과 부딪히는 포인트를 정리했어요.',
      blocks: [compatibilityBlock()],
      primaryAction: { label: '공유 카드 만들기', actionId: 'share-card', description: '결과를 카드로 저장할 수 있어요.' },
    },
    community: {
      surface: 'community',
      title: '커뮤니티 추천 드로어',
      description: '같은 성향, 견종, 지역 그룹 중 지금 가장 쓸모 있는 곳이에요.',
      blocks: [communityBlock()],
      primaryAction: { label: '커뮤니티 참여', href: '/community', description: '추천 그룹으로 이동할 수 있어요.' },
    },
    share: {
      surface: 'share',
      title: '가족 / 시터 공유 드로어',
      description: '가족과 시터가 바로 이해할 수 있는 공유 포맷이에요.',
      blocks: [shareBlock('공유 카드 미리보기')],
      primaryAction: { label: '가족에게 공유', actionId: 'share-family', description: '가족용 카드로 보낼 수 있어요.' },
    },
  }

  return bySurface[surface]
}

export function detectIntent(prompt: string): CoachIntent {
  const text = prompt.toLowerCase()

  if (text.includes('성향') || text.includes('왜') || text.includes('유형')) return 'personality'
  if (text.includes('루틴')) return 'routine'
  if (text.includes('집비움') || text.includes('혼자') || text.includes('외출')) return 'alone-time'
  if (text.includes('리포트') || text.includes('보고')) return 'report'
  if (text.includes('쇼핑') || text.includes('상품') || text.includes('번들')) return 'commerce'
  if (text.includes('궁합') || text.includes('잘 맞')) return 'compatibility'
  if (text.includes('커뮤니티') || text.includes('그룹') || text.includes('모임')) return 'community'
  if (text.includes('가족') || text.includes('시터') || text.includes('공유')) return 'share'
  return 'general'
}

export function inferSurfaceFromIntent(intent: CoachIntent): CoachSurface {
  switch (intent) {
    case 'routine':
    case 'alone-time':
      return 'routine'
    case 'report':
      return 'report'
    case 'commerce':
      return 'shop'
    case 'compatibility':
      return 'compatibility'
    case 'community':
      return 'community'
    case 'share':
      return 'share'
    default:
      return 'coach'
  }
}