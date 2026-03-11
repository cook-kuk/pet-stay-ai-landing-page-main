"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, Play, Send, ShoppingBag, Heart, Users, MessageSquare, MapPin, Star, Zap, Brain, Shield, Dog, Sparkles, Check, Upload, Video, Camera, Bot, Gift, TrendingUp, Clock, Calendar, Dumbbell, Coffee, Moon, Sun, Bone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "./app-context"
import { useState, useEffect, useRef } from "react"
import { personalityTypes, personalityProducts, type PersonalityTypeData } from "./personality-data"

// Re-export for other components - map to legacy format for compatibility
export const allPersonalityTypes = personalityTypes.map(p => ({
  name: p.name,
  traits: p.subtitle,
  tags: p.tags,
  emoji: p.emoji,
  color: p.color,
  mbti: p.mbti,
  description: p.description,
  strengths: p.strengths,
  careAdvice: p.careAdvice,
  compatibility: p.compatibility,
  behaviorTraits: p.behaviors,
  homeAloneReaction: p.aloneReaction,
  recommendedRoutine: p.recommendedRoutine,
  playStyle: p.playStyle,
  category: p.id.includes("clingy") || p.id.includes("emotional") || p.id.includes("gentle") || p.id.includes("energetic-partner") ? "attached" as const : 
            p.id.includes("sensitive") ? "anxious" as const :
            p.id.includes("energy") || p.id.includes("social") || p.id.includes("adventure") ? "energy" as const : "explorer" as const,
  hashtag: p.hashtag,
  summary: p.summary,
}))

// Shop products mapped from personality-data
const shopProducts = personalityProducts

// Purpose-based product recommendations
const purposeBasedProducts: Record<string, { name: string; price: string; originalPrice?: string; tag: string; emoji: string; reason: string; rating: number; reviews: number; bestseller?: boolean }[]> = {
  anxious: [
    { name: "노즈워크 스너플 매트", price: "35,000원", originalPrice: "45,000원", tag: "진정 효과", emoji: "🧶", reason: "후각 자극으로 불안 해소, 집중하면 마음이 편해져요", rating: 4.9, reviews: 1234, bestseller: true },
    { name: "심장박동 펫 인형", price: "48,000원", tag: "분리불안 완화", emoji: "🧸", reason: "보호자 없을 때 심장박동 소리로 안정감 제공", rating: 4.8, reviews: 892 },
    { name: "진정 페로몬 디퓨저", price: "32,000원", originalPrice: "40,000원", tag: "스트레스 해소", emoji: "💨", reason: "과학적으로 검증된 진정 페로몬 방출", rating: 4.7, reviews: 567 },
    { name: "방음 케이지 커버", price: "55,000원", tag: "소음 차단", emoji: "🏠", reason: "외부 소음 차단으로 안정적인 공간 제공", rating: 4.6, reviews: 345 },
    { name: "츄잉 덴탈 스틱 30p", price: "22,000원", tag: "스트레스 해소", emoji: "🦷", reason: "씹는 행위로 스트레스 해소 + 치아 건강", rating: 4.8, reviews: 2103 },
    { name: "릴렉싱 뮤직 스피커", price: "49,000원", tag: "진정 사운드", emoji: "🎵", reason: "강아지 전용 진정 음악 + 백색소음", rating: 4.5, reviews: 234 },
    { name: "보호자 냄새 담요", price: "28,000원", tag: "안정감", emoji: "🛏️", reason: "보호자 옷을 넣어두면 냄새로 안정감 제공", rating: 4.9, reviews: 678, bestseller: true },
    { name: "분리불안 훈련 키트", price: "38,000원", tag: "훈련 도구", emoji: "📦", reason: "단계별 분리 적응 훈련 가이드 + 도구", rating: 4.7, reviews: 412 },
  ],
  explorer: [
    { name: "3단계 퍼즐 피더", price: "32,000원", originalPrice: "42,000원", tag: "두뇌 자극", emoji: "🧩", reason: "난이도 조절 가능, 호기심 충족 + 두뇌 발달", rating: 4.9, reviews: 1567, bestseller: true },
    { name: "슬로우 피더 볼", price: "18,000원", tag: "탐색 본능", emoji: "🥎", reason: "굴리면서 간식이 나와 탐색 본능 충족", rating: 4.8, reviews: 923 },
    { name: "노즈워크 냄새찾기 세트", price: "45,000원", tag: "후각 발달", emoji: "👃", reason: "다양한 냄새 샘플로 후각 탐색 놀이", rating: 4.7, reviews: 456 },
    { name: "인터랙티브 토이 세트", price: "38,000원", originalPrice: "48,000원", tag: "지능 발달", emoji: "🎲", reason: "다양한 방식으로 노는 복합 장난감", rating: 4.8, reviews: 789, bestseller: true },
    { name: "자동 급식기", price: "89,000원", tag: "스마트", emoji: "🤖", reason: "규칙적인 급식 + 외출 시에도 걱정 없음", rating: 4.6, reviews: 567 },
    { name: "삐삐 장난감 6종", price: "24,000원", tag: "혼자 놀이", emoji: "🦆", reason: "다양한 소리와 질감으로 호기심 자극", rating: 4.7, reviews: 1234 },
    { name: "숨기고 찾기 장난감", price: "28,000원", tag: "탐색 놀이", emoji: "🔍", reason: "간식 숨기고 찾는 탐색 본능 놀이", rating: 4.8, reviews: 892 },
    { name: "캣닢볼 (강아지용)", price: "12,000원", tag: "후각 자극", emoji: "🌿", reason: "안전한 허브로 만든 후각 자극 볼", rating: 4.5, reviews: 345 },
  ],
  energy: [
    { name: "에너지 터그 로프", price: "19,000원", originalPrice: "25,000원", tag: "에너지 발산", emoji: "🪢", reason: "튼튼한 소재로 격렬한 터그 놀이 OK", rating: 4.9, reviews: 2341, bestseller: true },
    { name: "소프트 프리스비", price: "15,000원", tag: "야외 놀이", emoji: "🥏", reason: "치아에 안전한 소프트 재질, 무한 던지기", rating: 4.8, reviews: 1892 },
    { name: "공 자동 발사기", price: "78,000원", tag: "무한 공놀이", emoji: "⚾", reason: "보호자가 지쳐도 무한 공던지기 가능", rating: 4.7, reviews: 567 },
    { name: "아질리티 장애물 세트", price: "65,000원", originalPrice: "85,000원", tag: "운동", emoji: "🏃", reason: "집에서도 아질리티 훈련 가능", rating: 4.8, reviews: 456, bestseller: true },
    { name: "강화 씹기 장난감", price: "22,000원", tag: "파괴력 대비", emoji: "💪", reason: "초강력 씹기에도 버티는 내구성", rating: 4.9, reviews: 1567 },
    { name: "산책 하네스 (스포츠)", price: "38,000원", tag: "활동 최적화", emoji: "🦺", reason: "격렬한 운동에도 편안한 착용감", rating: 4.8, reviews: 892 },
    { name: "LED 야광 공 3종", price: "18,000원", tag: "저녁 놀이", emoji: "🔮", reason: "저녁에도 신나는 공놀이 가능", rating: 4.6, reviews: 678 },
    { name: "쿨링 매트", price: "35,000원", tag: "열 발산", emoji: "❄️", reason: "격렬한 운동 후 체온 조절", rating: 4.7, reviews: 1234 },
  ],
  attached: [
    { name: "함께하는 터그 세트", price: "25,000원", originalPrice: "32,000원", tag: "유대감", emoji: "🤝", reason: "보호자와 함께하는 놀이로 유대감 강화", rating: 4.9, reviews: 1892, bestseller: true },
    { name: "훈련 간식 파우치", price: "28,000원", tag: "긍정 강화", emoji: "👜", reason: "함께하는 훈련에 필수 간식 보관", rating: 4.8, reviews: 1234 },
    { name: "스킨십 마사지 글러브", price: "18,000원", tag: "스킨십", emoji: "🧤", reason: "쓸어주면서 자연스러운 스킨십", rating: 4.7, reviews: 892 },
    { name: "연어 트릿 대용량", price: "24,000원", originalPrice: "30,000원", tag: "보상", emoji: "🐟", reason: "훈련 �����상 + 스킨십 타임 간식", rating: 4.9, reviews: 2567, bestseller: true },
    { name: "펫캠 (양방향 통화)", price: "85,000원", tag: "원격 교감", emoji: "📹", reason: "외출 중에도 목소리로 안심시킬 수 있음", rating: 4.6, reviews: 456 },
    { name: "이동장 방석", price: "32,000원", tag: "함께 외출", emoji: "🧳", reason: "어디든 함께 이동할 때 편안함", rating: 4.7, reviews: 678 },
    { name: "커플 반다나 세트", price: "22,000원", tag: "유대감 표현", emoji: "🧣", reason: "보호자와 맞춤 패션으로 유대감 UP", rating: 4.5, reviews: 345 },
    { name: "심박동 녹음 인형", price: "52,000원", tag: "분리 적응", emoji: "💓", reason: "보호자 심박동 녹음하여 분리 시 재생", rating: 4.8, reviews: 789 },
  ],
}

// Community data with new brandable type names (matching the 16 official types)
const communityFeeds = [
  { avatar: "🐕", name: "코코맘", type: "산책엔진", content: "오늘 노즈워크 추천 너무 좋았어요! 우리 코코가 30분 동안 집중하네요 #산책엔진", likes: 42, comments: 8, time: "10분 전", image: true },
  { avatar: "🦮", name: "초코아빠", type: "소파감시자", content: "같은 유형 초코 친구들 혹시 산책 모임 있나요? 동작구 지역이에요! #소파감시자", likes: 28, comments: 15, time: "32분 전" },
  { avatar: "🐶", name: "보리언니", type: "에너지폭죽", content: "AI 상담 받고 분리불안 많이 좋아졌어요. 8분 놀이가 진짜 효과 있네요 #에너지폭죽", likes: 67, comments: 12, time: "1시간 전" },
  { avatar: "🐩", name: "뽀미대디", type: "예민센서", content: "천둥 무서워하는 강아지 어떻게 하면 좋을까요? 진정 음악 틀어도 계속 떨어요 #예민센서", likes: 34, comments: 23, time: "2시간 전" },
  { avatar: "🦊", name: "콩이맘", type: "껌딱지러버", content: "분리불안 훈련 3주차! 이제 10분은 혼자 있어요 감동 #껌딱지러버", likes: 89, comments: 31, time: "3시간 전" },
  { avatar: "🐺", name: "두부아빠", type: "혼놀탐험가", content: "퍼즐 피더 새로 샀는데 5분만에 다 깼어요... 더 어려운 거 추천해주세요 #혼놀탐험가", likes: 56, comments: 18, time: "4시간 전" },
]

const communityGroups = [
  { name: "껌딱지러버 모임", members: "1,247", emoji: "🥺" },
  { name: "산책엔진 운동팟", members: "3,892", emoji: "🏃" },
  { name: "예민센서 케어 그룹", members: "892", emoji: "🦋" },
  { name: "혼놀탐험가 퍼즐러", members: "2,134", emoji: "🔍" },
  { name: "모험본능러 클럽", members: "1,567", emoji: "🏔️" },
  { name: "보호자 질문/후기", members: "5,421", emoji: "💬" },
]

// Sample videos for test with new type names (matching the 16 official types)
const sampleVideos = [
  { id: "1", dogName: "코코", breed: "포메라니안", youtubeId: "T6wGPX0Df0U", resultType: "산책엔진", thumbnail: "https://img.youtube.com/vi/T6wGPX0Df0U/maxresdefault.jpg" },
  { id: "2", dogName: "초코", breed: "시바견", youtubeId: "gnjMKFWMraY", resultType: "혼놀탐험가", thumbnail: "https://img.youtube.com/vi/gnjMKFWMraY/maxresdefault.jpg" },
  { id: "3", dogName: "몽이", breed: "래브라도", youtubeId: "Ws3scZdpnzc", resultType: "껌딱지러버", thumbnail: "https://img.youtube.com/vi/Ws3scZdpnzc/maxresdefault.jpg" },
  { id: "4", dogName: "뭉치", breed: "골든리트리버", youtubeId: "yw7pZuxvQtI", resultType: "관심수집가", thumbnail: "https://img.youtube.com/vi/yw7pZuxvQtI/maxresdefault.jpg" },
]

export function GlobalModal() {
  const { activeModal, setActiveModal, selectedPersonality, setSelectedPersonality, selectedShopType, setSelectedShopType, setTestResult } = useApp()

  if (!activeModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
        onClick={() => setActiveModal(null)}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 max-h-[92vh] bg-background rounded-t-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <div className="sticky top-0 z-10 flex justify-center py-3 bg-background">
            <div className="w-10 h-1 bg-muted rounded-full" />
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(92vh-20px)]">
            {activeModal === "video-test" && <VideoTestModal />}
            {activeModal === "result-preview" && <ResultPreviewModal />}
            {activeModal === "chatbot" && <ChatbotModal />}
            {activeModal === "shop" && <ShopModal />}
            {activeModal === "compatibility" && <CompatibilityModal />}
            {activeModal === "community" && <CommunityModal />}
            {activeModal === "personality-detail" && selectedPersonality && (
              <PersonalityDetailModal personality={selectedPersonality} />
            )}
            {activeModal === "routine" && <RoutineModal />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Video Test Modal
function VideoTestModal() {
  const { setActiveModal, setTestResult } = useApp()
  const [step, setStep] = useState<"select" | "playing" | "questions" | "analyzing" | "result">("select")
  const [selectedVideo, setSelectedVideo] = useState<typeof sampleVideos[0] | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<PersonalityType | null>(null)

  const questions = [
    { q: "영상 속 강아지가 보호자에게 얼마나 자주 눈을 맞추나요?", options: ["자주 쳐다봐요", "가끔씩 확인해요", "거의 안 봐요"] },
    { q: "새로운 물체나 소리에 어떻게 반응하나요?", options: ["호기심 가득", "조심스럽게 접근", "무관심해요"] },
    { q: "놀이할 때 에너지 레벨은 어떤가요?", options: ["에너지 폭발!", "적당히 활발해요", "차분하게 놀아요"] },
  ]

  const handleVideoSelect = (video: typeof sampleVideos[0]) => {
    setSelectedVideo(video)
    setStep("playing")
    setTimeout(() => setStep("questions"), 3000)
  }

  const handleAnswer = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setStep("analyzing")
      let p = 0
      const interval = setInterval(() => {
        p += 5
        setProgress(p)
        if (p >= 100) {
          clearInterval(interval)
          const resultType = allPersonalityTypes.find(t => t.name === selectedVideo?.resultType) || allPersonalityTypes[5]
          setResult(resultType)
          setTestResult(resultType)
          setStep("result")
        }
      }, 100)
    }
  }

  return (
    <div className="p-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">영상으로 성격유형 검사</h2>
      </div>

      {step === "select" && (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">분석할 영상을 선택해주세요</p>
          <div className="grid grid-cols-2 gap-3">
            {sampleVideos.map((video) => (
              <motion.button
                key={video.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVideoSelect(video)}
                className="relative aspect-video rounded-2xl overflow-hidden group"
              >
                <img src={video.thumbnail} alt={video.dogName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-medium text-sm">{video.dogName}</p>
                  <p className="text-white/70 text-xs">{video.breed}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {step === "playing" && selectedVideo && (
        <div className="space-y-4">
          <div className="aspect-video rounded-2xl overflow-hidden bg-foreground">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=1`}
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
            <span className="text-xs text-muted-foreground">분석 중...</span>
          </div>
        </div>
      )}

      {step === "questions" && (
        <div className="space-y-6">
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i <= questionIndex ? "bg-primary" : "bg-secondary"}`} />
            ))}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">질문 {questionIndex + 1}/{questions.length}</p>
            <p className="text-lg font-medium text-foreground mb-4">{questions[questionIndex].q}</p>
            <div className="space-y-2">
              {(Array.isArray(questions[questionIndex].options) ? questions[questionIndex].options : []).map((option, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnswer}
                  className="w-full p-4 bg-secondary hover:bg-secondary/80 rounded-xl text-left text-foreground font-medium transition-colors"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "analyzing" && (
        <div className="py-12 text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto rounded-full border-4 border-primary border-t-transparent"
          />
          <div>
            <p className="text-lg font-bold text-foreground">AI가 분석 중이에요</p>
            <p className="text-sm text-muted-foreground mt-1">영상과 답변을 종합하고 있어요</p>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
      )}

      {step === "result" && result && (
        <div className="space-y-6">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center mb-4`}>
              <span className="text-4xl">{result.emoji}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{result.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{selectedVideo?.dogName} / {selectedVideo?.breed}</p>
            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
              {result.mbti && <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{result.mbti}</span>}
              {result.hashtag && <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold">{result.hashtag}</span>}
            </div>
          </div>

          <p className="text-muted-foreground text-center">{result.summary || result.description}</p>

          <div className="space-y-3">
            <p className="font-medium text-foreground">주요 특성</p>
            {["에너지", "사회성", "독립성", "애착도"].map((trait, i) => (
              <div key={trait} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">{trait}</span>
                <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + Math.random() * 35}%` }}
                    transition={{ delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${result.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm">{tag}</span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setActiveModal("shop")} className="flex-1 bg-gradient-to-r from-primary to-accent text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              맞춤 상품 보기
            </Button>
            <Button onClick={() => setActiveModal(null)} variant="outline" className="flex-1">
              완료
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Result Preview Modal
function ResultPreviewModal() {
  const { setActiveModal, setSelectedPersonality } = useApp()
  const [index, setIndex] = useState(0)
  const previewTypes = allPersonalityTypes.slice(0, 4)

  return (
    <div className="p-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">결과 예시 보기</h2>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-card rounded-3xl p-6 border border-border"
          >
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${previewTypes[index].color} flex items-center justify-center mb-3`}>
                <span className="text-3xl">{previewTypes[index].emoji}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{previewTypes[index].name}</h3>
              <p className="text-sm text-muted-foreground">{previewTypes[index].mbti}</p>
            </div>

            <p className="text-muted-foreground text-center mb-2">{previewTypes[index].summary || previewTypes[index].traits}</p>
            
            {previewTypes[index].hashtag && (
              <p className="text-primary font-bold text-sm text-center mb-4">{previewTypes[index].hashtag}</p>
            )}

            <div className="space-y-2 mb-4">
              {["에너지", "사회성", "독립성", "애착도"].map((trait, i) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-14">{trait}</span>
                  <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${previewTypes[index].color}`} style={{ width: `${60 + (i * 10)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {previewTypes[index].tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-secondary text-foreground rounded-full text-xs">{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setIndex(i => i > 0 ? i - 1 : previewTypes.length - 1)}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            {previewTypes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex(i => i < previewTypes.length - 1 ? i + 1 : 0)}
            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center rotate-180"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <Button onClick={() => setActiveModal("video-test")} className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white">
        <Play className="w-4 h-4 mr-2" />
        내 강아지 검사하기
      </Button>
    </div>
  )
}

// Chatbot Modal
function ChatbotModal() {
  const { setActiveModal } = useApp()
  const [messages, setMessages] = useState<{ type: "bot" | "user"; content: string; options?: string[] }[]>([
    { type: "bot", content: "안녕하세요! PetStay AI 상담사예요.\n무엇을 도와드릴까요?", options: ["문제 행동 상담", "사료/간식 추천", "건강 체크", "훈련 방법"] }
  ])
  const [inputValue, setInputValue] = useState("")
  const chatRef = useRef<HTMLDivElement>(null)

  const responses: Record<string, { content: string; options?: string[] }> = {
    "문제 행동 상담": { content: "어떤 문제 행동으로 고민이신가요?", options: ["분리불안", "짖음", "배변 실수", "물어뜯기"] },
    "분리불안": { content: "분리불안은 많은 강아지들이 겪는 문제예요.\n\n추천 방법:\n1. 짧은 외출부터 시작\n2. 나갈 때 특별한 행동 X\n3. 심장박동 인형 활용\n4. ���해진 시간 혼자 있기 연습\n\n더 자세한 상담이 필요하시면 말씀해주세요!", options: ["맞춤 상품 보기", "다른 상담하기"] },
    "사료/간식 추천": { content: "강아지 나이와 상황을 알려주세요", options: ["퍼피 (1세 미만)", "성견 (1-7세)", "시니어 (7세 이상)"] },
    "퍼피 (1세 미만)": { content: "퍼피용 추천이에요!\n\n- 로얄캐닌 미니 퍼피\n- 오리젠 퍼피\n- 연어 오메가3 보조제\n\n성장기에는 단백질과 DHA가 중요해요!", options: ["맞춤 상품 보기", "다른 상담하기"] },
    "건강 체크": { content: "어떤 건강 관련 도움이 필요하신가요?", options: ["예방접종 일정", "정기 검진", "증상 체크"] },
    "훈련 방법": { content: "어떤 훈련을 원하시나요?", options: ["기본 명령어", "산책 훈련", "사회화 훈련"] },
    "기본 명령어": { content: "기본 명령어 훈련 팁이에요!\n\n1. 앉아 - 간식을 머리 위로\n2. 기다려 - 짧은 시간부터 시작\n3. 이리와 - 밝은 톤으로 부르기\n\n긍정적 강화가 가장 중요해요!", options: ["맞춤 상품 보기", "다른 상담하기"] },
    "다른 상담하기": { content: "또 무엇을 도와드릴까요?", options: ["문제 행동 상담", "사료/간식 추천", "건강 체크", "훈련 방법"] },
  }

  const handleOption = (option: string) => {
    setMessages(prev => [...prev, { type: "user", content: option }])
    setTimeout(() => {
      const response = responses[option]
      if (response) {
        setMessages(prev => [...prev, { type: "bot", ...response }])
      } else if (option === "맞춤 상품 보기") {
        setActiveModal("shop")
      }
    }, 500)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages(prev => [...prev, { type: "user", content: inputValue }])
    setInputValue("")
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", content: "네, 말씀하신 내용 확인했어요!\n더 자세한 상담을 원하시면 아래 옵션에서 선택해주세요.", options: ["문제 행동 상담", "사료/간식 추천", "건강 체크", "훈련 방법"] }])
    }, 800)
  }

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">PetStay AI</h2>
          <p className="text-xs text-muted-foreground">항상 대기 중</p>
        </div>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${msg.type === "user" ? "bg-primary text-white" : "bg-secondary text-foreground"} rounded-2xl p-3`}>
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
              {msg.options && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      className="px-3 py-1.5 bg-background/20 hover:bg-background/30 rounded-full text-xs font-medium transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요"
            className="flex-1 px-4 py-3 bg-secondary rounded-full text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button onClick={handleSend} className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Shop Modal with purpose-based categories
function ShopModal() {
  const { setActiveModal, selectedShopType, setSelectedShopType, testResult } = useApp()
  const [cart, setCart] = useState<{ name: string; price: string }[]>([])
  
  // Determine category from test result or selection
  const getCategoryFromType = (type: string | null) => {
    if (!type) return "explorer"
    const personality = allPersonalityTypes.find(p => p.name === type || p.category === type)
    return personality?.category || type as "anxious" | "explorer" | "energy" | "attached"
  }
  
  const activeCategory = getCategoryFromType(selectedShopType || testResult?.category || null)
  const products = purposeBasedProducts[activeCategory] || purposeBasedProducts.explorer

const categoryOptions = [
    { id: "anxious", label: "예민센서 케어", emoji: "🦋", description: "진정, 안정, 분리불안 케어", types: "예민센서, 껌딱지러버, 흥분부스터" },
    { id: "explorer", label: "혼놀탐험가 키트", emoji: "🔍", description: "두뇌자극, 퍼즐, 노즈워크", types: "혼놀탐험가, 집안탐사대, 간식헌터" },
    { id: "energy", label: "에너지폭죽 세트", emoji: "🚀", description: "운동, 놀이, 에너지 발산", types: "에너지폭죽, 산책엔진, 모험본능러" },
    { id: "attached", label: "사랑직진러 번들", emoji: "💕", description: "유대감, 함께하기, 스킨십", types: "사랑직진러, 기다림장인, 관심수집가" },
  ]

  const addToCart = (product: { name: string; price: string }) => {
    setCart(prev => [...prev, product])
  }

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""))
    return sum + price
  }, 0)

  return (
    <div className="pb-8">
      <div className="sticky top-0 z-10 bg-background">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
            <X className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">맞춤 상품 추천</h2>
          {cart.length > 0 && (
            <span className="ml-auto px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full">{cart.length}</span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm font-medium text-foreground">첫 구매 회원 한정</p>
          <p className="text-2xl font-bold text-primary">20% OFF</p>
          <p className="text-xs text-muted-foreground mt-1">성격유형 검사 완료 시 추가 5% 할인</p>
        </div>

        {/* Category selection */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {categoryOptions.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedShopType(cat.id)}
              className={`p-3 rounded-xl text-left transition-all ${
                activeCategory === cat.id 
                  ? "bg-primary/10 border-2 border-primary" 
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{cat.emoji}</span>
                <span className={`text-sm font-semibold ${activeCategory === cat.id ? "text-primary" : "text-foreground"}`}>
                  {cat.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{cat.description}</p>
              <p className="text-[10px] text-primary/70 mt-1 truncate">{cat.types}</p>
            </motion.button>
          ))}
        </div>

        {/* Products */}
        <div className="space-y-3">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.bestseller && (
                      <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">BEST</span>
                    )}
                    <span className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[10px] rounded">{product.tag}</span>
                  </div>
                  <p className="font-medium text-foreground text-sm mt-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{product.reason}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary text-sm">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart({ name: product.name, price: product.price })}
                  className="self-center p-2.5 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart sticky footer */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 p-4 bg-background border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm text-muted-foreground">장바구니 ({cart.length}개)</span>
              <p className="text-xs text-muted-foreground">20% 할인 적용</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground line-through">{cartTotal.toLocaleString()}원</span>
              <p className="font-bold text-primary text-lg">{Math.floor(cartTotal * 0.8).toLocaleString()}원</p>
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-primary to-accent text-white h-12 text-base">
            구매하기
          </Button>
        </div>
      )}
    </div>
  )
}

// Compatibility Modal
function CompatibilityModal() {
  const { setActiveModal } = useApp()
  const [step, setStep] = useState<"questions" | "result">("questions")
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const questions = [
    { q: "평소 얼마나 활동적인 편인가요?", options: ["집에서 쉬는 게 좋아요", "적당히 활동해요", "매우 활동적이에요"] },
    { q: "강아지와 얼마나 시간을 보낼 수 있나요?", options: ["하루 2시간 미만", "하루 2-4시간", "하루 4시간 이상"] },
    { q: "선호하는 강아지 성격은?", options: ["조용하고 차분한", "균형 잡힌", "활발하고 에너지 넘치는"] },
  ]

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      setStep("result")
    }
  }

  const resultTypes = [
    { name: "차분한 의존형", score: 98, emoji: "🐶" },
    { name: "균형 안정형", score: 85, emoji: "🐕‍🦺" },
    { name: "활동 의존형", score: 72, emoji: "🦊" },
  ]

  return (
    <div className="p-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">견주 궁합 테스트</h2>
      </div>

      {step === "questions" && (
        <div className="space-y-6">
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i <= qIndex ? "bg-primary" : "bg-secondary"}`} />
            ))}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">질문 {qIndex + 1}/{questions.length}</p>
            <p className="text-lg font-medium text-foreground mb-4">{questions[qIndex].q}</p>
            <div className="space-y-2">
              {questions[qIndex].options.map((option, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-4 bg-secondary hover:bg-secondary/80 rounded-xl text-left text-foreground font-medium transition-colors"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center">
                <span className="text-3xl">👩</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-3xl">🐕</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground">궁합 분석 완료!</h3>
          </div>

          <div className="space-y-3">
            <p className="font-medium text-foreground">나와 잘 맞는 유형 TOP 3</p>
            {resultTypes.map((type, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">{type.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{type.name}</p>
                  <div className="w-full bg-secondary rounded-full h-2 mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${type.score}%` }}
                      transition={{ delay: i * 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">{type.score}%</span>
              </div>
            ))}
          </div>

          <Button onClick={() => setActiveModal("video-test")} className="w-full bg-gradient-to-r from-primary to-accent text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            내 강아지 성격유형 알아보기
          </Button>
        </div>
      )}
    </div>
  )
}

// Community Modal
function CommunityModal() {
  const { setActiveModal } = useApp()
  const [tab, setTab] = useState<"feed" | "groups" | "friends">("feed")

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">커뮤니티</h2>
      </div>

      <div className="flex border-b border-border">
        {[
          { id: "feed", label: "피드" },
          { id: "groups", label: "그룹" },
          { id: "friends", label: "친구 찾기" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === t.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === "feed" && (
          <div className="space-y-4">
            {communityFeeds.map((feed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-xl">{feed.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">{feed.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">{feed.type}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{feed.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{feed.content}</p>
                    {feed.image && (
                      <div className="mt-2 h-32 bg-secondary rounded-lg" />
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" /> {feed.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" /> {feed.comments}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "groups" && (
          <div className="space-y-3">
            {communityGroups.map((group, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-2xl">{group.emoji}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.members}명 참여중</p>
                </div>
                <Button size="sm" variant="outline">참여</Button>
              </motion.button>
            ))}
          </div>
        )}

        {tab === "friends" && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground mb-2">근처 산책 친구 찾기</p>
              <p className="text-sm text-muted-foreground mb-4">위치 기반으로 가까운 강아지 친구를 찾아요</p>
              <Button className="bg-gradient-to-r from-primary to-accent text-white">
                <MapPin className="w-4 h-4 mr-2" />
                위치 허용하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Personality Detail Modal with rich content
function PersonalityDetailModal({ personality }: { personality: PersonalityType }) {
  const { setActiveModal, setSelectedShopType } = useApp()
  const [activeTab, setActiveTab] = useState<"overview" | "behavior" | "routine" | "shop">("overview")
  
  const categoryProducts = personality.category ? purposeBasedProducts[personality.category] : []

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
            <X className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">유형 상세</h2>
        </div>
      </div>

      {/* Hero section */}
      <div className={`bg-gradient-to-br ${personality.color} p-6 text-white`}>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <span className="text-4xl">{personality.emoji}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{personality.name}</h3>
            <p className="text-white/80 text-sm mt-1">{personality.summary || personality.traits}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {personality.mbti && (
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium">{personality.mbti}</span>
              )}
              {personality.hashtag && (
                <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur rounded-full text-sm font-bold">{personality.hashtag}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-border">
        {personality.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm">{tag}</span>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-border sticky top-16 bg-background z-10">
        {[
          { id: "overview", label: "개요" },
          { id: "behavior", label: "행동특성" },
          { id: "routine", label: "추천루틴" },
          { id: "shop", label: "맞춤상품" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">{personality.description}</p>

            {personality.strengths && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  주요 강점
                </p>
                <div className="space-y-2">
                  {personality.strengths.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {personality.careAdvice && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  케어 조언
                </p>
                <div className="space-y-2">
                  {personality.careAdvice.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {personality.compatibility && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  견주 궁합
                </p>
                {personality.compatibility.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                    <span className="text-sm text-foreground w-28">{c.type}</span>
                    <div className="flex-1 bg-secondary rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.score}%` }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${personality.color}`}
                      />
                    </div>
                    <span className="text-sm font-bold text-primary">{c.score}%</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "behavior" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {personality.behaviorTraits && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Dog className="w-4 h-4 text-primary" />
                  대표 행동 특징
                </p>
                <div className="space-y-3">
                  {personality.behaviorTraits.map((trait, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                    >
                      <span className="text-lg">{["🔹", "🔸", "🔹", "🔸"][i % 4]}</span>
                      <span className="text-sm text-foreground">{trait}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {personality.homeAloneReaction && (
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  집 비움 반응
                </p>
                <p className="text-sm text-foreground leading-relaxed">{personality.homeAloneReaction}</p>
              </div>
            )}

            {personality.playStyle && (
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  잘 맞는 놀이 방식
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {personality.playStyle.map((play, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 bg-secondary/50 rounded-lg text-center"
                    >
                      <span className="text-sm text-foreground">{play}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "routine" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">보호자에게 추천하는</p>
              <p className="text-lg font-bold text-foreground">하루 루틴 가이드</p>
            </div>

            {personality.recommendedRoutine && (
              <div className="space-y-3">
                {personality.recommendedRoutine.map((routine, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${personality.color} flex items-center justify-center text-white font-bold`}>
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground flex-1">{routine}</span>
                  </motion.div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setActiveModal("routine")}
              className="w-full bg-gradient-to-r from-primary to-accent text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              상세 루틴 보기
            </Button>
          </motion.div>
        )}

        {activeTab === "shop" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">{personality.name}을 위한</p>
              <p className="text-lg font-bold text-foreground">맞춤 상품 추천</p>
              <p className="text-xs text-primary mt-1">첫 구매 20% 할인</p>
            </div>

            <div className="space-y-3">
              {categoryProducts.slice(0, 4).map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {product.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {product.bestseller && (
                          <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">BEST</span>
                        )}
                        <span className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[10px] rounded">{product.tag}</span>
                      </div>
                      <p className="font-medium text-foreground text-sm mt-1 truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.reason}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-foreground">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary text-sm">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <button className="self-center p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                      <ShoppingBag className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => {
                setSelectedShopType(personality.category || personality.name)
                setActiveModal("shop")
              }}
              variant="outline"
              className="w-full"
            >
              맞춤 상품 더보기 ({categoryProducts.length}개)
            </Button>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA buttons */}
      <div className="p-4 border-t border-border bg-background sticky bottom-0">
        <div className="flex gap-3">
          <Button
            onClick={() => setActiveModal("chatbot")}
            variant="outline"
            className="flex-1"
          >
            <Bot className="w-4 h-4 mr-2" />
            챗봇 상담
          </Button>
          <Button
            onClick={() => setActiveModal("video-test")}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            검사하기
          </Button>
        </div>
      </div>
    </div>
  )
}

// Routine Modal
function RoutineModal() {
  const { setActiveModal } = useApp()
  const [selectedTime, setSelectedTime] = useState<"morning" | "afternoon" | "evening">("morning")

  const routines = {
    morning: [
      { time: "07:00", activity: "기상 & 화장실", icon: Sun, duration: "10분" },
      { time: "07:30", activity: "아침 식사", icon: Coffee, duration: "15분" },
      { time: "08:00", activity: "산책 & 운동", icon: Dumbbell, duration: "30분" },
    ],
    afternoon: [
      { time: "12:00", activity: "점심 간식", icon: Bone, duration: "10분" },
      { time: "14:00", activity: "노즈워크 놀이", icon: Brain, duration: "20분" },
      { time: "16:00", activity: "휴식 시간", icon: Moon, duration: "1시간" },
    ],
    evening: [
      { time: "18:00", activity: "저녁 산책", icon: MapPin, duration: "30분" },
      { time: "19:00", activity: "저녁 식사", icon: Coffee, duration: "15분" },
      { time: "21:00", activity: "수면 준비", icon: Moon, duration: "10분" },
    ],
  }

  return (
    <div className="p-4 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">맞춤 루틴 추천</h2>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-6 text-center">
        <p className="text-sm text-muted-foreground">활동 의존형을 위한</p>
        <p className="text-xl font-bold text-foreground">하루 루틴 가이드</p>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { id: "morning", label: "오전", icon: Sun },
          { id: "afternoon", label: "오후", icon: Clock },
          { id: "evening", label: "저녁", icon: Moon },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTime(t.id as typeof selectedTime)}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              selectedTime === t.id ? "bg-primary text-white" : "bg-secondary text-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {routines[selectedTime].map((routine, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <routine.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{routine.activity}</p>
              <p className="text-xs text-muted-foreground">{routine.time}</p>
            </div>
            <span className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-full">{routine.duration}</span>
          </motion.div>
        ))}
      </div>

      <Button onClick={() => setActiveModal("shop")} className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white">
        <ShoppingBag className="w-4 h-4 mr-2" />
        루틴용 상품 보기
      </Button>
    </div>
  )
}

export { allPersonalityTypes, purposeBasedProducts }
