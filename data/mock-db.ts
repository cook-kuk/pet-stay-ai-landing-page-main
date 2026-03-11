import { personalityTypes } from '@/data/personality-types'
import type {
  Bundle,
  ChatMessage,
  CommunityGroup,
  CommunityPost,
  DashboardHighlight,
  FamilyMember,
  OwnerProfile,
  PersonalityResult,
  PetProfile,
  Product,
  Recommendation,
  Report,
  RoutineLog,
  RoutinePlan,
  SavedItem,
  SitterAccess,
  User,
  VideoUpload,
} from '@/types/domain'

export const currentUser: User = {
  id: 'user-1',
  email: 'owner@petstay.ai',
  name: '김지윤',
  avatar: '보호자 김지윤',
  createdAt: '2026-03-01T09:00:00Z',
}

export const ownerProfile: OwnerProfile = {
  id: 'owner-1',
  userId: currentUser.id,
  personalityType: '섬세한 돌봄형',
  lifestyle: '주 3회 재택 + 저녁 산책 루틴',
  location: '성수동',
  preferences: ['분리불안 케어', '주간 리포트', '로컬 산책 모임'],
}

export const petProfiles: PetProfile[] = [
  {
    id: 'pet-1',
    userId: currentUser.id,
    name: '몽이',
    breed: '말티푸',
    ageMonths: 28,
    size: 'small',
    weight: 4.8,
    sex: 'female',
    neutered: true,
    avatar: '몽이',
    mainPersonalityType: 'clingy-lover',
    subTraits: ['낮잠 좋아함', '현관 소리에 민감', '귀가 후 재회 반응 큼'],
    createdAt: '2026-02-10T10:00:00Z',
  },
]

export const videoUploads: VideoUpload[] = [
  {
    id: 'upload-1',
    petProfileId: 'pet-1',
    fileUrl: '/placeholder-user.jpg',
    duration: 18,
    status: 'completed',
    analyzedAt: '2026-03-10T22:10:00Z',
  },
]

export const personalityResults: PersonalityResult[] = [
  {
    id: 'result-1',
    petProfileId: 'pet-1',
    typeSlug: 'clingy-lover',
    confidence: 92,
    summary: '몽이는 보호자와의 연결이 강할수록 안정감을 느끼는 애착형이에요.',
    resultCardData: {
      matchScore: 94,
      caution: '귀가 직후 과한 흥분을 천천히 가라앉히는 루틴이 중요해요.',
      strengths: ['애정 표현이 풍부해요', '가족과의 유대가 강해요', '짧은 훈련 반응이 좋아요'],
      routines: ['외출 전 3분 분리 연습', '귀가 후 진정 인사', '저녁 교감 루틴'],
    },
    createdAt: '2026-03-10T22:12:00Z',
  },
]

export const routinePlans: RoutinePlan[] = [
  {
    id: 'routine-1',
    petProfileId: 'pet-1',
    typeSlug: 'clingy-lover',
    title: '오늘의 안정 루틴',
    planType: 'today',
    items: [
      { id: 'r1', title: '아침 10분 산책', description: '후각 탐색 위주로 천천히 걷기', time: '08:10', completed: true },
      { id: 'r2', title: '외출 전 분리 연습', description: '문 앞 3분 대기 후 간식 보상', time: '09:00' },
      { id: 'r3', title: '귀가 후 진정 인사', description: '30초 차분히 기다렸다가 쓰다듬기', time: '19:10' },
    ],
    createdAt: '2026-03-11T00:00:00Z',
  },
  {
    id: 'routine-2',
    petProfileId: 'pet-1',
    typeSlug: 'clingy-lover',
    title: '외출 전 루틴',
    planType: 'pre-leave',
    items: [
      { id: 'pr1', title: '퍼즐 피더 세팅', description: '현관 반대편에서 시작할 수 있게 두기' },
      { id: 'pr2', title: '외출 신호 낮추기', description: '가방 들기 전에 2분 진정 터치' },
    ],
    createdAt: '2026-03-11T00:00:00Z',
  },
  {
    id: 'routine-3',
    petProfileId: 'pet-1',
    typeSlug: 'clingy-lover',
    title: '7일 개선 플랜',
    planType: 'seven-day',
    items: [
      { id: 'sp1', title: '1일차', description: '3분 분리 연습' },
      { id: 'sp2', title: '3일차', description: '5분 분리 + 간식 과제' },
      { id: 'sp3', title: '7일차', description: '귀가 후 흥분도 점수 기록' },
    ],
    createdAt: '2026-03-11T00:00:00Z',
  },
]

export const routineLogs: RoutineLog[] = [
  {
    id: 'log-1',
    petProfileId: 'pet-1',
    date: '2026-03-11',
    completedItems: ['r1'],
    notes: '아침 산책 후 낮잠이 길어졌어요.',
  },
]

export const reports: Report[] = [
  {
    id: 'report-1',
    petProfileId: 'pet-1',
    reportType: 'after-leave',
    title: '귀가 후 리포트',
    content: '오늘은 외출 2시간 동안 초반 12분 정도 현관 대기가 있었고, 이후에는 후각 매트에 집중했어요.',
    score: 82,
    createdAt: '2026-03-11T10:00:00Z',
  },
  {
    id: 'report-2',
    petProfileId: 'pet-1',
    reportType: 'weekly-change',
    title: '이번 주 변화',
    content: '재회 직후 흥분 시간이 3분에서 1분 20초로 줄었고, 혼자 있는 동안 간식 과제 지속 시간이 늘었어요.',
    score: 88,
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'report-3',
    petProfileId: 'pet-1',
    reportType: 'personality-trend',
    title: '성향 변화 추이',
    content: '애착 성향은 유지되지만 루틴 안정도가 올라가며 기다림 내성이 개선되고 있어요.',
    score: 79,
    createdAt: '2026-03-09T10:00:00Z',
  },
  {
    id: 'report-4',
    petProfileId: 'pet-1',
    reportType: 'routine-effectiveness',
    title: '루틴 효과 분석',
    content: '외출 전 퍼즐 피더를 둔 날에는 초반 짖음과 문 긁기 빈도가 뚜렷하게 감소했어요.',
    score: 91,
    createdAt: '2026-03-08T10:00:00Z',
  },
]

export const groups: CommunityGroup[] = [
  { id: 'g1', groupType: 'type', slug: 'clingy-lover', name: '껌딱지러버 모임', description: '애착형 강아지 보호자들의 루틴 공유방', memberCount: 2180 },
  { id: 'g2', groupType: 'breed', slug: 'maltipoo', name: '말티푸 라이프', description: '말티푸 보호자들의 실전 팁 커뮤니티', memberCount: 1642 },
  { id: 'g3', groupType: 'local', slug: 'seongsu', name: '성수 저녁 산책팟', description: '평일 저녁 가볍게 산책 메이트를 찾는 모임', memberCount: 486 },
  { id: 'g4', groupType: 'type', slug: 'walk-engine', name: '산책엔진 연합', description: '고에너지 산책 코스와 루틴을 공유해요', memberCount: 1350 },
]

export const posts: CommunityPost[] = [
  { id: 'p1', groupId: 'g1', authorId: 'user-1', title: '귀가 후 흥분 줄이는 인사 루틴 공유', content: '현관에서 바로 안아주기보다 30초 차분히 기다렸다가 인사했더니 훨씬 안정적이었어요.', createdAt: '2026-03-11T07:30:00Z' },
  { id: 'p2', groupId: 'g2', authorId: 'user-1', title: '말티푸 눈물 자국 관리템 추천받아요', content: '저자극 제품 중심으로 쓰시는 분들 후기 궁금해요.', createdAt: '2026-03-10T21:00:00Z' },
  { id: 'p3', groupId: 'g3', authorId: 'user-1', title: '성수 서울숲 7시 산책 하실 분?', content: '사회성 훈련 겸 천천히 걷는 코스로 생각 중이에요.', createdAt: '2026-03-11T09:10:00Z' },
  { id: 'p4', groupId: 'g4', authorId: 'user-1', title: '비 오는 날 실내 발산 루틴', content: '노즈워크 10분 + 터그 5분 + 진정 매트 3분 조합 추천해요.', createdAt: '2026-03-09T17:40:00Z' },
]

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'calm-snuffle-mat',
    name: '진정 노즈워크 매트',
    category: '놀이',
    price: 32000,
    discountPrice: 27000,
    tags: ['분리불안', '후각놀이'],
    image: '/placeholder.jpg',
    description: '외출 전 집중 미션을 주기 좋은 후각 놀이 매트예요.',
    typeSlugs: ['clingy-lover', 'sensitive-sensor', 'solo-explorer'],
    reason: '혼자 있는 초반 시간을 안정적으로 시작하도록 도와줘요.',
  },
  {
    id: 'prod-2',
    slug: 'return-home-brush',
    name: '귀가 후 릴렉스 브러시',
    category: '케어',
    price: 22000,
    discountPrice: null,
    tags: ['교감', '귀가루틴'],
    image: '/placeholder-user.jpg',
    description: '귀가 후 흥분을 낮추며 교감 시간을 만들어주는 브러시예요.',
    typeSlugs: ['clingy-lover', 'love-sprinter', 'attention-seeker'],
    reason: '재회 직후 과열된 감정을 부드럽게 내려줘요.',
  },
  {
    id: 'prod-3',
    slug: 'active-walk-harness',
    name: '액티브 워크 하네스',
    category: '산책',
    price: 54000,
    discountPrice: 49000,
    tags: ['산책', '야외활동'],
    image: '/placeholder.jpg',
    description: '장시간 산책과 러닝에 안정적인 고정감을 주는 하네스예요.',
    typeSlugs: ['walk-engine', 'energy-firework', 'adventure-instinct'],
    reason: '활동량이 높은 타입의 움직임을 편안하게 지지해요.',
  },
  {
    id: 'prod-4',
    slug: 'door-stay-mat',
    name: '현관 스테이 매트',
    category: '훈련',
    price: 29000,
    discountPrice: null,
    tags: ['현관훈련', '짖음관리'],
    image: '/placeholder.jpg',
    description: '현관 소리에 반응하는 아이들을 위한 스테이 훈련 매트예요.',
    typeSlugs: ['door-radar', 'guard-captain', 'sofa-guardian'],
    reason: '문 앞 반응을 차분한 대기로 전환하는 데 도움이 돼요.',
  },
  {
    id: 'prod-5',
    slug: 'home-adventure-box',
    name: '실내 탐험 박스',
    category: '놀이',
    price: 43000,
    discountPrice: 38000,
    tags: ['탐험', '실내놀이'],
    image: '/placeholder-logo.png',
    description: '집 안에서도 새로운 미션을 만들 수 있는 탐험형 놀이 키트예요.',
    typeSlugs: ['solo-explorer', 'home-explorer', 'treat-hunter'],
    reason: '지루함을 줄이고 탐색 욕구를 건강하게 채워줘요.',
  },
]

export const bundles: Bundle[] = [
  { id: 'bundle-1', slug: 'clingy-lover-starter', name: '껌딱지러버 안정 키트', typeSlug: 'clingy-lover', description: '외출 전후 안정감과 교감을 함께 설계하는 베스트 조합', price: 69000, items: ['prod-1', 'prod-2'] },
  { id: 'bundle-2', slug: 'walk-engine-outdoor', name: '산책엔진 에너지 발산 키트', typeSlug: 'walk-engine', description: '고에너지 타입의 산책 만족도를 올리는 조합', price: 99000, items: ['prod-3'] },
  { id: 'bundle-3', slug: 'calm-entry-bundle', name: '귀가 후 릴렉스 키트', typeSlug: 'mixed', description: '현관 반응, 짖음, 귀가 동선을 함께 정리하는 번들', price: 79000, items: ['prod-4', 'prod-2'] },
]

export const recommendations: Recommendation[] = [
  { id: 'rec-1', petProfileId: 'pet-1', recommendationType: 'routine', payload: { title: '오늘은 귀가 후 인사 루틴을 더 짧게 유지해보세요.' }, createdAt: '2026-03-11T06:00:00Z' },
  { id: 'rec-2', petProfileId: 'pet-1', recommendationType: 'community', payload: { groupId: 'g1', reason: '같은 애착형 보호자들이 귀가 루틴 팁을 많이 공유해요.' }, createdAt: '2026-03-11T06:05:00Z' },
  { id: 'rec-3', petProfileId: 'pet-1', recommendationType: 'shop', payload: { productId: 'prod-1', reason: '외출 초반 몰입 시간을 늘려줄 수 있어요.' }, createdAt: '2026-03-11T06:10:00Z' },
  { id: 'rec-4', petProfileId: 'pet-1', recommendationType: 'premium', payload: { title: '이번 주 변화 리포트 열람하기', gate: 'premium' }, createdAt: '2026-03-11T06:15:00Z' },
]

export const savedItems: SavedItem[] = [
  { id: 'save-1', userId: currentUser.id, itemType: 'result-card', itemId: 'result-1' },
  { id: 'save-2', userId: currentUser.id, itemType: 'product', itemId: 'prod-1' },
]

export const familyMembers: FamilyMember[] = [
  { id: 'fam-1', petProfileId: 'pet-1', userId: currentUser.id, role: 'owner', permissions: ['view', 'edit', 'share'] },
]

export const sitterAccessList: SitterAccess[] = [
  { id: 'sitter-1', petProfileId: 'pet-1', invitedEmail: 'walker@petstay.ai', permissions: ['view-routine', 'view-report'], expiresAt: '2026-03-20T09:00:00Z' },
]

export const dashboardHighlights: DashboardHighlight[] = [
  { title: '루틴 연속 기록', value: '5일', caption: '지난주보다 2일 증가' },
  { title: '혼자 있는 안정도', value: '82점', caption: '귀가 후 리포트 기준' },
  { title: '추천 커뮤니티', value: '3곳', caption: '몽이 성향과 가까운 그룹' },
]

export const chatSeedMessages: ChatMessage[] = [
  {
    id: 'c1',
    role: 'assistant',
    text: '몽이는 껌딱지러버 성향이 강해서 외출 전후 루틴이 안정감을 크게 좌우해요. 오늘은 어떤 상황이 가장 궁금하세요?',
    chips: ['왜 현관에서 기다릴까?', '귀가 후 흥분 줄이기', '맞는 장난감 추천'],
    createdAt: '2026-03-11T08:00:00Z',
  },
]

export const seedSummary = {
  users: [currentUser],
  ownerProfile,
  petProfiles,
  personalityResults,
  videoUploads,
  routinePlans,
  routineLogs,
  reports,
  groups,
  posts,
  products,
  bundles,
  recommendations,
  savedItems,
  familyMembers,
  sitterAccessList,
  dashboardHighlights,
  personalityTypes,
}