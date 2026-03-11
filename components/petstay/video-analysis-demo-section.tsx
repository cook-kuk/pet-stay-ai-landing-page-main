"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Sparkles, ChevronRight, RotateCcw, Share2, Heart, Zap, Users, Shield, Brain, Dog,
  Video, FileText, MessageCircle, Camera, Upload, Eye, Send, Bot, X, ChevronLeft, 
  Pause, Volume2, VolumeX, Check, Gift, Star, TrendingUp, Award, ShoppingBag, Bone
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sampleVideos = [
  {
    id: "1",
    youtubeId: "T6wGPX0Df0U",
    title: "신나게 뛰노는 골든리트리버",
    thumbnail: "https://img.youtube.com/vi/T6wGPX0Df0U/hqdefault.jpg",
    dogName: "골든이",
    resultType: "활동 의존형",
  },
  {
    id: "2",
    youtubeId: "gnjMKFWMraY",
    title: "호기심 많은 시바견",
    thumbnail: "https://img.youtube.com/vi/gnjMKFWMraY/hqdefault.jpg",
    dogName: "시바",
    resultType: "독립 탐험형",
  },
  {
    id: "3",
    youtubeId: "Ws3scZdpnzc",
    title: "주인과 함께 자는 강아지",
    thumbnail: "https://img.youtube.com/vi/Ws3scZdpnzc/hqdefault.jpg",
    dogName: "뽀삐",
    resultType: "안정 애착형",
  },
  {
    id: "4",
    youtubeId: "yw7pZuxvQtI",
    title: "친구들과 노는 강아지",
    thumbnail: "https://img.youtube.com/vi/yw7pZuxvQtI/hqdefault.jpg",
    dogName: "코코",
    resultType: "사교 활발형",
  },
]

const personalityResults: Record<string, {
  type: string
  subType: string
  emoji: string
  color: string
  gradient: string
  description: string
  traits: { icon: React.ElementType; label: string; score: number }[]
  strengths: string[]
  careAdvice: string[]
  compatibility: { type: string; score: number }[]
  hashtags: string[]
}> = {
  "활동 의존형": {
    type: "활동 의존형",
    subType: "ENTP",
    emoji: "🏃",
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-500",
    description: "보호자와 함께할 때 가장 행복한 에너자이저! 놀이 시간을 위해 산다고 해도 과언이 아니에요.",
    traits: [
      { icon: Zap, label: "에너지", score: 95 },
      { icon: Heart, label: "애착도", score: 88 },
      { icon: Users, label: "사회성", score: 72 },
      { icon: Brain, label: "독립성", score: 45 },
    ],
    strengths: ["무한 체력의 소유자", "보호자의 기분을 잘 읽음", "학습 속도가 빠름", "긍정 에너지 뿜뿜"],
    careAdvice: ["매일 30분 이상 활발한 놀이", "분리불안 예방 훈련", "두뇌 자극 장난감 활용"],
    compatibility: [
      { type: "활동적인 견주", score: 98 },
      { type: "가정주부/재택근무", score: 85 },
      { type: "바쁜 직장인", score: 45 },
    ],
    hashtags: ["#에너자이저", "#같이놀자", "#무한체력", "#애교폭발"],
  },
  "독립 탐험형": {
    type: "독립 탐험형",
    subType: "INTP",
    emoji: "🔍",
    color: "text-emerald-500",
    gradient: "from-emerald-500 to-teal-500",
    description: "호기심 대마왕! 새로운 것을 탐험하는 것을 좋아하고, 혼자서도 잘 지내는 독립적인 성향이에요.",
    traits: [
      { icon: Brain, label: "독립성", score: 92 },
      { icon: Zap, label: "호기심", score: 88 },
      { icon: Shield, label: "안정감", score: 75 },
      { icon: Heart, label: "애착도", score: 58 },
    ],
    strengths: ["혼자서도 잘 놀아요", "문제 해결 능력이 뛰어나요", "새로운 환경 적응이 빨라요", "집중력이 좋아요"],
    careAdvice: ["노즈워크 장난감 제공", "혼자만의 공간 마련", "강요하지 않기"],
    compatibility: [
      { type: "바쁜 직장인", score: 95 },
      { type: "독립적인 성향", score: 88 },
      { type: "활동적인 견주", score: 62 },
    ],
    hashtags: ["#탐험가", "#호기심대마왕", "#독립심", "#똒똒이"],
  },
  "안정 애착형": {
    type: "안정 애착형",
    subType: "ISFJ",
    emoji: "🤗",
    color: "text-blue-500",
    gradient: "from-blue-500 to-indigo-500",
    description: "보호자 옆이 제일 편한 포근한 성격! 차분하고 안정적이며, 깊은 유대감을 형성해요.",
    traits: [
      { icon: Heart, label: "애착도", score: 95 },
      { icon: Shield, label: "안정감", score: 90 },
      { icon: Users, label: "신뢰도", score: 85 },
      { icon: Zap, label: "에너지", score: 55 },
    ],
    strengths: ["보호자에게 깊은 신뢰", "차분하고 예의 바름", "규칙적인 생활 선호", "스트레스에 강함"],
    careAdvice: ["일정한 루틴 유지", "조용한 스킨십 시간", "급격한 변화 피하기"],
    compatibility: [
      { type: "가정주부/재택근무", score: 98 },
      { type: "차분한 성격", score: 92 },
      { type: "활동적인 견주", score: 58 },
    ],
    hashtags: ["#포근이", "#엄마아빠최고", "#차분함", "#믿음직"],
  },
  "사교 활발형": {
    type: "사교 활발형",
    subType: "ESFP",
    emoji: "🎉",
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
    description: "인싸 중의 인싸! 사람이든 강아지든 모두와 친구가 되고 싶어하는 사교적인 성격이에요.",
    traits: [
      { icon: Users, label: "사회성", score: 98 },
      { icon: Zap, label: "에너지", score: 85 },
      { icon: Heart, label: "친화력", score: 92 },
      { icon: Brain, label: "독립성", score: 48 },
    ],
    strengths: ["누구와도 금방 친해져요", "분위기 메이커", "스트레스 해소가 빨라요", "표현이 풍부해요"],
    careAdvice: ["정기적인 강아지 친구 만남", "다양한 사회화 경험", "과한 흥분 조절 훈련"],
    compatibility: [
      { type: "사교적인 견주", score: 95 },
      { type: "다견 가정", score: 90 },
      { type: "1인 가구", score: 55 },
    ],
    hashtags: ["#인싸견", "#파티피플", "#친구가많아", "#사교성갑"],
  },
}

type ChatMessage = {
  id: string
  type: "bot" | "user" | "video" | "analyzing" | "result" | "video-playing" | "questions"
  content?: string
  videoId?: string
  videoTitle?: string
  result?: typeof personalityResults[string] & { dogName: string }
  options?: { label: string; value: string; icon?: React.ElementType }[]
  questionStep?: number
}

type DemoMode = "main" | "video-test" | "result-preview" | "chatbot" | "photo-test" | "compatibility" | "report" | "shop"

// 성격유형별 추천 상품 (확장)
const recommendedProducts: Record<string, { 
  name: string; 
  price: string; 
  originalPrice?: string;
  tag: string; 
  emoji: string;
  category: "장난감" | "간식" | "케어" | "용품";
  rating: number;
  reviews: number;
  bestseller?: boolean;
}[]> = {
  "활동 의존형": [
    { name: "터그 로프 장난감", price: "15,000원", originalPrice: "20,000원", tag: "활동량 해소", emoji: "🪢", category: "장난감", rating: 4.8, reviews: 324, bestseller: true },
    { name: "프리스비 소프트", price: "12,000원", tag: "야외 놀이", emoji: "🥏", category: "장난감", rating: 4.7, reviews: 189 },
    { name: "노즈워크 볼", price: "22,000원", tag: "두뇌 자극", emoji: "⚽", category: "장난감", rating: 4.9, reviews: 456 },
    { name: "연어 트릿 100g", price: "14,000원", tag: "훈련 보상", emoji: "🐟", category: "간식", rating: 4.8, reviews: 892 },
    { name: "에너지 보충 져키", price: "18,000원", originalPrice: "22,000원", tag: "고단백", emoji: "🥩", category: "간식", rating: 4.6, reviews: 234, bestseller: true },
    { name: "쿨링 매트", price: "35,000원", tag: "열 발산", emoji: "❄️", category: "용품", rating: 4.5, reviews: 167 },
  ],
  "독립 탐험형": [
    { name: "3단계 퍼즐 피더", price: "32,000원", originalPrice: "40,000원", tag: "두뇌 자극", emoji: "🧩", category: "장난감", rating: 4.9, reviews: 567, bestseller: true },
    { name: "삐삐 장난감 세트", price: "18,000원", tag: "혼자 놀이", emoji: "🦆", category: "장난감", rating: 4.7, reviews: 234 },
    { name: "스너플 매트 L", price: "35,000원", tag: "노즈워크", emoji: "🧶", category: "장난감", rating: 4.8, reviews: 412 },
    { name: "오리고기 져키", price: "16,000원", tag: "고단백", emoji: "🦴", category: "간식", rating: 4.7, reviews: 345 },
    { name: "자동 급식기", price: "89,000원", originalPrice: "110,000원", tag: "스마트", emoji: "🤖", category: "용품", rating: 4.6, reviews: 189, bestseller: true },
    { name: "캣닢 볼 (강아지용)", price: "9,000원", tag: "탐험 자극", emoji: "🌿", category: "장난감", rating: 4.4, reviews: 98 },
  ],
  "안정 애착형": [
    { name: "진정 디퓨저 세트", price: "28,000원", originalPrice: "35,000원", tag: "분리불안 완화", emoji: "💨", category: "케어", rating: 4.8, reviews: 678, bestseller: true },
    { name: "심장박동 인형", price: "45,000원", tag: "안정감", emoji: "🧸", category: "장난감", rating: 4.9, reviews: 456 },
    { name: "오소독스 쿠션 M", price: "55,000원", tag: "편안한 수면", emoji: "🛋️", category: "용품", rating: 4.7, reviews: 234 },
    { name: "츄잉 덴탈껌 20p", price: "18,000원", tag: "스트레스 해소", emoji: "🦷", category: "간식", rating: 4.6, reviews: 567 },
    { name: "연어 오메가3", price: "35,000원", originalPrice: "42,000원", tag: "피모 건강", emoji: "💊", category: "케어", rating: 4.8, reviews: 345, bestseller: true },
    { name: "릴렉싱 뮤직 스피커", price: "49,000원", tag: "힐링", emoji: "🎵", category: "용품", rating: 4.5, reviews: 123 },
  ],
  "사교 활발형": [
    { name: "공 던지기 세트 5종", price: "18,000원", originalPrice: "25,000원", tag: "함께 놀이", emoji: "🎾", category: "장난감", rating: 4.8, reviews: 789, bestseller: true },
    { name: "간식 파우치 (방수)", price: "25,000원", tag: "외출용", emoji: "👜", category: "용품", rating: 4.7, reviews: 345 },
    { name: "치킨 트릿 대용량", price: "22,000원", originalPrice: "28,000원", tag: "사회화 훈련", emoji: "🍗", category: "간식", rating: 4.9, reviews: 1023, bestseller: true },
    { name: "접이식 이동장", price: "65,000원", tag: "외출 필수", emoji: "🧳", category: "용품", rating: 4.6, reviews: 234 },
    { name: "LED 야광 목줄", price: "19,000원", tag: "안전 산책", emoji: "💡", category: "용품", rating: 4.7, reviews: 456 },
    { name: "강아지 명함 태그", price: "15,000원", tag: "소셜", emoji: "🏷️", category: "용품", rating: 4.5, reviews: 89 },
  ],
}

// 카테고리별 아이콘
const categoryIcons: Record<string, React.ElementType> = {
  "장난감": Gift,
  "간식": Bone,
  "케어": Heart,
  "용품": ShoppingBag,
}

const featureButtons = [
  { id: "video-test", label: "영상으로 성격유형 검사", icon: Video, color: "from-primary to-accent", available: true },
  { id: "result-preview", label: "우리아이 결과 예시보기", icon: Eye, color: "from-pink-500 to-rose-500", available: true },
  { id: "chatbot", label: "AI 상담 챗봇", icon: MessageCircle, color: "from-emerald-500 to-teal-500", available: true },
]

const comingSoonFeatures = [
  { id: "photo-test", icon: Camera, label: "사진 분석", available: true },
  { id: "compatibility", icon: Users, label: "견주 궁합", available: true },
  { id: "shop", icon: ShoppingBag, label: "맞춤 쇼핑", available: true },
]

const previewResults = [
  { ...personalityResults["활동 의존형"], dogName: "뽀삐" },
  { ...personalityResults["독립 탐험형"], dogName: "초코" },
  { ...personalityResults["안정 애착형"], dogName: "몽이" },
  { ...personalityResults["사교 활발형"], dogName: "루이" },
]

const analysisQuestions = [
  { 
    question: "강아지가 새로운 장소에 가면 어떻게 행동하나요?",
    options: [
      { label: "신나서 여기저기 탐험해요", value: "explore" },
      { label: "처음엔 경계하다가 적응해요", value: "cautious" },
      { label: "저한테 붙어서 안 떨어져요", value: "clingy" },
      { label: "다른 강아지들한테 다가가요", value: "social" },
    ]
  },
  {
    question: "혼자 집에 있을 때 강아지는?",
    options: [
      { label: "잘 기다려요, 문제없어요", value: "independent" },
      { label: "좀 불안해하는 것 같아요", value: "anxious" },
      { label: "엄청 반가워하며 맞이해요", value: "excited" },
      { label: "자기 장난감 가지고 놀아요", value: "playful" },
    ]
  },
  {
    question: "산책 중 다른 강아지를 만나면?",
    options: [
      { label: "적극적으로 인사하러 가요", value: "friendly" },
      { label: "관심 없어요, ��� 갈 길 가요", value: "indifferent" },
      { label: "조심스럽게 다가가요", value: "careful" },
      { label: "흥분해서 놀자고 해요", value: "playful" },
    ]
  },
]

export function VideoAnalysisDemoSection() {
  const [mode, setMode] = useState<DemoMode>("main")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [selectedVideo, setSelectedVideo] = useState<typeof sampleVideos[0] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [previewIndex, setPreviewIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [questionStep, setQuestionStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [shopMode, setShopMode] = useState<"browse" | "detail" | "cart">("browse")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<{ name: string; price: string; emoji: string }[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  const resetToMain = () => {
    setMode("main")
    setMessages([])
    setSelectedVideo(null)
    setIsAnalyzing(false)
    setAnalysisProgress(0)
    setQuestionStep(0)
    setAnswers([])
    setIsVideoPlaying(false)
    setShopMode("browse")
    setSelectedType(null)
    setSelectedCategory(null)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (content: string, options?: ChatMessage["options"]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "bot",
      content,
      options,
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
    }
    setMessages(prev => [...prev, newMessage])
  }

  const startVideoTest = () => {
    console.log("[v0] startVideoTest called")
    setMode("video-test")
    setMessages([])
    setSelectedVideo(null)
    setQuestionStep(0)
    setAnswers([])
    setTimeout(() => {
      addBotMessage(
        "안녕하세요! 영상으로 강아지 성격을 분석해드릴게요.\n\n아래 예시 영상 중 하나를 선택해주세요:"
      )
    }, 500)
  }

  const showSampleVideos = () => {
    addUserMessage("예시 영상으로 테스트할게요")
    setTimeout(() => {
      addBotMessage("분석할 영상을 선택해주세요:")
    }, 500)
  }

  const selectVideo = (video: typeof sampleVideos[0]) => {
    setSelectedVideo(video)
    addUserMessage(`"${video.title}" 영상 선택`)
    
    // Show video playing in chat
    setTimeout(() => {
      const videoPlayingMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "video-playing",
        videoId: video.youtubeId,
        videoTitle: video.title,
      }
      setMessages(prev => [...prev, videoPlayingMessage])
      setIsVideoPlaying(true)
    }, 300)

    // Bot asks questions while watching
    setTimeout(() => {
      addBotMessage(
        "영상을 보면서 몇 가지 질문에 답해주시면 더 정확한 분석이 가능해요!",
      )
    }, 1500)

    setTimeout(() => {
      const questionMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "questions",
        questionStep: 0,
      }
      setMessages(prev => [...prev, questionMessage])
    }, 2500)
  }

  const handleQuestionAnswer = (answer: string, questionIndex: number) => {
    const question = analysisQuestions[questionIndex]
    const selectedOption = question.options.find(o => o.value === answer)
    
    addUserMessage(selectedOption?.label || answer)
    setAnswers(prev => [...prev, answer])
    
    if (questionIndex < analysisQuestions.length - 1) {
      // Next question
      setTimeout(() => {
        const nextQuestionMessage: ChatMessage = {
          id: Date.now().toString(),
          type: "questions",
          questionStep: questionIndex + 1,
        }
        setMessages(prev => [...prev, nextQuestionMessage])
        setQuestionStep(questionIndex + 1)
      }, 800)
    } else {
      // All questions answered, start analysis
      setTimeout(() => {
        addBotMessage("좋아요! 영상과 답변을 종합해서 분석을 시작할게요.")
        startAnalysis()
      }, 800)
    }
  }

  const startAnalysis = () => {
    if (!selectedVideo) return
    
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setIsVideoPlaying(false)

    setTimeout(() => {
      const analyzingMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "analyzing",
      }
      setMessages(prev => [...prev, analyzingMessage])
    }, 500)

    const analysisSteps = [
      "영상에서 움직임 패턴을 분석하고 있어요...",
      "표정과 꼬리 흔드는 패턴을 확인 중...",
      "답변 내용과 영상을 교차 분석 중...",
      "16가지 유형 중 최적의 매칭을 찾고 있어요..."
    ]
    
    let stepIndex = 0
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 20 + 10
        
        if (newProgress > (stepIndex + 1) * 25 && stepIndex < analysisSteps.length - 1) {
          stepIndex++
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          
          setTimeout(() => {
            const result = personalityResults[selectedVideo.resultType]
            const resultMessage: ChatMessage = {
              id: Date.now().toString(),
              type: "result",
              result: { ...result, dogName: selectedVideo.dogName },
            }
            setMessages(prev => prev.filter(m => m.type !== "analyzing").concat(resultMessage))
            
            setTimeout(() => {
              addBotMessage(
                `${selectedVideo.dogName}의 성격유형은 "${result.type}"이에요! 결과가 마음에 드셨나요?`,
                [
                  { label: "결과 공유하기", value: "share", icon: Share2 },
                  { label: "케어 팁 더보기", value: "care-tips", icon: Heart },
                  { label: "다시 테스트하기", value: "restart", icon: RotateCcw },
                ]
              )
            }, 500)
          }, 500)
          
          return 100
        }
        return newProgress
      })
    }, 600)
  }

  const startChatbot = () => {
    console.log("[v0] startChatbot called")
    setMode("chatbot")
    setMessages([])
    setTimeout(() => {
      addBotMessage(
        "안녕하세요! PetStay AI 상담사예요.\n강아지에 대해 무엇이든 물어보세요!",
        [
          { label: "문제행동 상담", value: "behavior" },
          { label: "사료/간식 추천", value: "food" },
          { label: "건강 체크", value: "health" },
          { label: "훈련 방법", value: "training" },
        ]
      )
    }, 500)
  }

  const startPhotoTest = () => {
    console.log("[v0] startPhotoTest called")
    setMode("photo-test")
    setMessages([])
    setTimeout(() => {
      addBotMessage(
        "사진으로 성격을 분석해드릴게요!\n\n사진에서 강아지��� 표정, 자세, 환경 등을 AI가 분석합니다.",
        [
          { label: "예시 사진 보기", value: "sample-photo", icon: Eye },
          { label: "사진 업로드", value: "upload-photo", icon: Upload },
        ]
      )
    }, 500)
  }

  const startCompatibility = () => {
    console.log("[v0] startCompatibility called")
    setMode("compatibility")
    setMessages([])
    setTimeout(() => {
      addBotMessage(
        "견주님과 강아지의 궁합을 알아볼까요?\n\n먼저 견주님의 라이프스타일을 알려주세요.",
        [
          { label: "활동적인 편이에요", value: "active", icon: Zap },
          { label: "집에서 쉬는 게 좋아요", value: "homebody", icon: Shield },
          { label: "사교적인 성격이에요", value: "social", icon: Users },
          { label: "독립적인 성향이에요", value: "independent", icon: Brain },
        ]
      )
    }, 500)
  }

  const startReport = () => {
    setMode("report")
    setMessages([])
    setTimeout(() => {
      addBotMessage(
        "강아지 맞춤 리포트를 생성해드릴게요!\n\n성격유형 검사 결과를 기반으로 상세 분석 리포트를 제공합니다.",
        [
          { label: "샘플 리포트 보기", value: "sample-report", icon: FileText },
          { label: "내 강아지 검사하기", value: "test-first", icon: Sparkles },
        ]
      )
    }, 500)
  }

  const startShop = () => {
    console.log("[v0] startShop called")
    setMode("shop")
    setShopMode("browse")
    setSelectedType(null)
    setSelectedCategory(null)
    setMessages([])
  }

  const addToCart = (product: { name: string; price: string; emoji: string }) => {
    setCart(prev => [...prev, product])
  }

  const handleChatbotOption = (value: string) => {
    const responses: Record<string, { user: string; bot: string; options?: ChatMessage["options"] }> = {
      behavior: {
        user: "문제행동 상담이요",
        bot: "어떤 행동이 걱정되시나요?",
        options: [
          { label: "분리불안", value: "separation" },
          { label: "짖음/공격성", value: "barking" },
          { label: "배변 실수", value: "toilet" },
          { label: "물어뜯기", value: "chewing" },
        ]
      },
      food: {
        user: "사료/간식 추천해주세요",
        bot: "강아지 나이가 어떻게 되나요?",
        options: [
          { label: "퍼피 (1세 미만)", value: "puppy-food" },
          { label: "성견 (1-7세)", value: "adult-food" },
          { label: "시니어 (7세 이상)", value: "senior-food" },
        ]
      },
      health: {
        user: "건강 관련 질문이요",
        bot: "어떤 점이 궁금하신가요?",
        options: [
          { label: "예방접종 일정", value: "vaccine" },
          { label: "정기검진 주기", value: "checkup" },
          { label: "이상 증상 체크", value: "symptom" },
        ]
      },
      training: {
        user: "훈련 방법이 궁금해요",
        bot: "어떤 훈련을 원하시나요?",
        options: [
          { label: "기본 복종", value: "basic-training" },
          { label: "배변 훈련", value: "potty-training" },
          { label: "산책 매너", value: "walk-training" },
        ]
      },
      separation: {
        user: "분리불안이 있어요",
        bot: "분리불안은 많은 강아지가 겪는 문제예요.\n\n추천 솔루션:\n1. 짧은 외출부터 연습하기\n2. 외출 전 과도한 인사 피하기\n3. 혼자 있을 때 줄 장난감 준비\n4. 안정감 주는 음악 틀어두기\n\n성격유형에 따라 맞춤 솔루션이 달라요!",
        options: [
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
          { label: "다른 질문하기", value: "other" },
        ]
      },
      barking: {
        user: "짖음이 심해요",
        bot: "짖음의 원인 파악이 중요해요.\n\n일반적인 원인:\n- 경계심/불안\n- 요구 행동\n- 지루함\n- 흥분\n\n성격유형 검사를 하면 원인을 더 정확히 파악할 수 있어요!",
        options: [
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
          { label: "다른 질문하기", value: "other" },
        ]
      },
      toilet: {
        user: "배변 실수가 있어요",
        bot: "배변 훈련 팁을 드릴게요!\n\n1. 일정한 시간에 배변 유도\n2. 성공 시 즉각적인 보상\n3. 실수해도 절대 혼내지 않기\n4. 배변 장소 냄새로 기억시키기\n\n꾸준함이 핵심이에요!",
        options: [
          { label: "더 자세한 상담", value: "detailed-toilet" },
          { label: "다른 질문하기", value: "other" },
        ]
      },
      chewing: {
        user: "물어뜯기가 심해요",
        bot: "물어뜯기는 다양한 원인이 있어요.\n\n- 이갈이 시기 (퍼피)\n- 스트레스 해소\n- 지루함\n- 에너지 발산\n\n대안 제공이 중요해요:\n- 껌, 노즈워크 장난감\n- 충분한 산책과 놀이",
        options: [
          { label: "장난감 추천받기", value: "toy-recommend" },
          { label: "다른 질문하기", value: "other" },
        ]
      },
      "puppy-food": {
        user: "퍼피 (1세 미만)이에요",
        bot: "퍼피용 사료 추천해드릴게요!\n\n필수 체크포인트:\n- 고단백 (25% 이상)\n- DHA 포함 (두뇌 발달)\n- 칼슘/인 균형\n\n추천 브랜드:\n- 로얄캐닌 퍼피\n- 오리젠 퍼피\n- 아카나 퍼피",
      },
      "adult-food": {
        user: "성견 (1-7세)이에요",
        bot: "성견용 사료 추천해드릴게요!\n\n체크포인트:\n- 적정 단백질 (20-25%)\n- 오메가 지방산\n- 관절 건강 성분\n\n추천 브랜드:\n- 오리젠 어덜트\n- 아카나 어덜트\n- 웰니스 코어",
      },
      "senior-food": {
        user: "시니어 (7세 이상)이에요",
        bot: "시니어용 사료 추천해드릴게요!\n\n필수 체크:\n- 저칼로리\n- 글루코사민 (관절)\n- 소화가 쉬운 성분\n\n추천 브랜드:\n- 로얄캐닌 에이징\n- 힐스 시니어\n- 오리젠 시니어",
      },
      vaccine: {
        user: "예방접종 일정이 궁금해요",
        bot: "기본 예방접종 일정이에요:\n\n6-8주: 종합백신 1차\n10-12주: 종합백신 2차 + 코로나\n14-16주: 종합백신 3차 + 광견병\n\n이후 매년 추가접종 필요해요!",
      },
      checkup: {
        user: "정기검진 주기가 궁금해요",
        bot: "건강 검진 권장 주기:\n\n- 1세 미만: 매월\n- 1-7세: 1년에 1회\n- 7세 이상: 6개월에 1회\n\n검진 항목:\n혈액검사, 소변검사, 심장사상충, 치과검진",
      },
      symptom: {
        user: "이상 증상이 있어요",
        bot: "어떤 증상이 있나요?",
        options: [
          { label: "구토/설사", value: "vomit" },
          { label: "기침/재채기", value: "cough" },
          { label: "식욕부진", value: "no-appetite" },
          { label: "기타 증상", value: "other-symptom" },
        ]
      },
      vomit: {
        user: "구토/설사 증상이 있어요",
        bot: "주의가 필요해요!\n\n즉시 병원 방문 필요한 경우:\n- 피가 섞인 구토/설사\n- 24시간 이상 지속\n- 무기력함 동반\n\n응급처치:\n- 금식 (6-12시간)\n- 소량의 물 제공\n- 부드러운 음식으로 시작",
      },
      "sample-photo": {
        user: "예시 사진 볼게요",
        bot: "사진 분석 예시예요!\n\n[표정 분석]\n- 입꼬리 올라감: 행복 지수 높음\n- 눈 크기: 경계/편안함 판단\n- 귀 각도: 흥미/불안 체크\n\n[자세 분석]\n- 꼬리 위치와 흔드는 패턴\n- 몸의 긴장도\n- 발 위치",
        options: [
          { label: "사진 분석 시작하기", value: "start-photo" },
          { label: "영상으로 검사하기", value: "test", icon: Video },
        ]
      },
      "start-photo": {
        user: "사진 분석할게요",
        bot: "아직 데모 버전에서는 사진 업로드가 지원되지 않아요.\n\n영상 검사로 더 정확한 분석을 받아보세요!",
        options: [
          { label: "영상으로 검사하기", value: "test", icon: Video },
        ]
      },
      active: {
        user: "활동적인 편이에요",
        bot: "활동적인 견주님이시군요!\n\n추천 강아지 유형:\n- 활동 의존형 (베스트 매칭!)\n- 사교 활발형\n\n함께 운동하고 놀 수 있는 에너지 넘치는 강아지와 잘 맞아요!",
        options: [
          { label: "우리 강아지 궁합 보기", value: "test", icon: Sparkles },
        ]
      },
      homebody: {
        user: "집에서 쉬는 게 좋아요",
        bot: "집순이/집돌이 견주님이시군요!\n\n추천 강아지 유형:\n- 안정 애착형 (베스트 매칭!)\n- 독립 탐험형\n\n함께 소파에서 휴식하는 것을 좋아하는 차분한 강아지와 잘 맞아요!",
        options: [
          { label: "우리 강아지 궁합 보기", value: "test", icon: Sparkles },
        ]
      },
      social: {
        user: "사교적인 성격이에요",
        bot: "사교적인 견주님이시군요!\n\n추천 강아지 유형:\n- 사교 활발형 (베스트 매칭!)\n- 활동 의존형\n\n함께 강아지 모임이나 카페를 다닐 수 있는 사교적인 강아지와 잘 맞아요!",
        options: [
          { label: "우리 강아지 궁합 보기", value: "test", icon: Sparkles },
        ]
      },
      independent: {
        user: "독립적인 성향이에요",
        bot: "독립적인 견주님이시군요!\n\n추천 강아지 유형:\n- 독립 탐험형 (베스트 매칭!)\n- 안정 애착형\n\n서로의 공간을 존중하면서도 깊은 유대를 나�� 수 있는 강아지와 잘 맞아요!",
        options: [
          { label: "우리 강아지 궁합 보기", value: "test", icon: Sparkles },
        ]
      },
      "sample-report": {
        user: "샘플 리포트 볼게요",
        bot: "리포트 미리보기예요!\n\n[포함 내용]\n1. 성격유형 상세 분석\n2. 행동 패턴 해석\n3. 맞춤 케어 가이드\n4. 견주 궁합 분석\n5. 추천 활동/장난감\n6. 주의사항 체크리스트\n\n검사 완료 후 PDF로 다운로드 가능해요!",
        options: [
          { label: "검사하고 리포트 받기", value: "test", icon: Sparkles },
        ]
      },
      "shop-active": {
        user: "활동�� 상품 볼게요",
        bot: "활동 의존형 강아지를 위한 추천 상품이에요!\n\n" + 
          recommendedProducts["활동 의존형"].map(p => `${p.emoji} ${p.name} - ${p.price} (${p.tag})`).join("\n"),
        options: [
          { label: "장바구니 담기", value: "add-cart", icon: ShoppingBag },
          { label: "다른 유형 보기", value: "shop-other" },
        ]
      },
      "shop-brain": {
        user: "두뇌자극 상품 볼게요",
        bot: "독립 탐험형 강아지를 위한 추천 상품이에요!\n\n" + 
          recommendedProducts["독립 탐험형"].map(p => `${p.emoji} ${p.name} - ${p.price} (${p.tag})`).join("\n"),
        options: [
          { label: "장바구니 담기", value: "add-cart", icon: ShoppingBag },
          { label: "다른 유형 보기", value: "shop-other" },
        ]
      },
      "shop-calm": {
        user: "안정/힐링 상품 볼게요",
        bot: "안정 애착형 강아지를 위한 추천 상품이에요!\n\n" + 
          recommendedProducts["안정 애착형"].map(p => `${p.emoji} ${p.name} - ${p.price} (${p.tag})`).join("\n"),
        options: [
          { label: "장바구니 담기", value: "add-cart", icon: ShoppingBag },
          { label: "다른 유형 보기", value: "shop-other" },
        ]
      },
      "shop-social": {
        user: "사회화 상품 볼게요",
        bot: "사교 활발형 강아지를 위한 추천 상품이에요!\n\n" + 
          recommendedProducts["사교 활발형"].map(p => `${p.emoji} ${p.name} - ${p.price} (${p.tag})`).join("\n"),
        options: [
          { label: "장바구니 담기", value: "add-cart", icon: ShoppingBag },
          { label: "다른 유형 보기", value: "shop-other" },
        ]
      },
      "shop-other": {
        user: "다른 유형 볼게요",
        bot: "어떤 유형의 상품을 보시겠어요?",
        options: [
          { label: "활동형 상품", value: "shop-active", icon: Zap },
          { label: "두뇌자극 상품", value: "shop-brain", icon: Brain },
          { label: "안정/힐링 상품", value: "shop-calm", icon: Heart },
          { label: "사회화 상품", value: "shop-social", icon: Users },
        ]
      },
      "add-cart": {
        user: "장바구니에 담을게요",
        bot: "상품이 장바구니에 담겼어요!\n\n첫 구매 시 20% 할인 쿠폰이 적용됩니다.\n\n성격유형 검사를 완료하면 맞춤 상품을 더 정확하게 추천해드려요!",
        options: [
          { label: "검사하고 맞춤 추천받기", value: "test", icon: Sparkles },
          { label: "더 쇼핑하기", value: "shop-other", icon: ShoppingBag },
        ]
      },
      "test-first": {
        user: "검사부터 할게요",
        bot: "좋아요! 성격유형 검사를 먼저 진행해볼까요?",
        options: [
          { label: "영상으로 검사하기", value: "test", icon: Video },
        ]
      },
      "care-tips": {
        user: "케어 팁 더 알려주세요",
        bot: "",
      },
      "sample-photo": {
        user: "예시 사진 볼게요",
        bot: "사진 분석 예시에요!\n\n[분석 항목]\n1. 표정 인식 (행복/긴장/호기심)\n2. 자세 분석 (경계/편안/흥분)\n3. 환경 특성 (실내/야외)\n\n예시 결과: 활발한 골든 리트리버\n- 표정: 행복 (92%)\n- 자세: 편안함 (85%)\n- 추정 성격: 사교 활발형\n\n실제 영상 분석이 더 정확해요!",
        options: [
          { label: "영상으로 검사하기", value: "test", icon: Video },
          { label: "처음으로", value: "home" },
        ]
      },
      "active": {
        user: "활동적인 편이에요",
        bot: "활동적인 견주님이시군요!\n\n추천 궁합 유형:\n1. 활동 의존형 (98%)\n2. 사교 활발형 (92%)\n3. 독립 탐험형 (78%)\n\n함께 운동하고 놀 수 있는 에너지 넘치는 강아지와 잘 맞으실 거예요!",
        options: [
          { label: "활동 의존형 상품 보기", value: "shop-active", icon: ShoppingBag },
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
        ]
      },
      "homebody": {
        user: "집에서 쉬는 게 좋아요",
        bot: "홈바디 견주님이시군요!\n\n추천 궁합 유형:\n1. 안정 애착형 (98%)\n2. 독립 탐험형 (88%)\n3. 활동 의존형 (62%)\n\n함께 조용히 시간을 보내는 걸 좋아하는 강아지와 잘 맞으실 거예요!",
        options: [
          { label: "안정 애착형 상품 보기", value: "shop-calm", icon: ShoppingBag },
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
        ]
      },
      "social": {
        user: "사교적인 성격이에요",
        bot: "사교적인 견주님이시군요!\n\n추천 궁합 유형:\n1. 사교 활발형 (96%)\n2. 활동 의존형 (90%)\n3. 안정 애착형 (72%)\n\n사람과 강아지 모두와 잘 어울리는 친화력 좋은 강아지와 잘 맞으실 거예요!",
        options: [
          { label: "사교 활발형 상품 보기", value: "shop-social", icon: ShoppingBag },
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
        ]
      },
      "independent": {
        user: "독립적인 성향이에요",
        bot: "독립적인 견주님이시군요!\n\n추천 궁합 유형:\n1. 독립 탐험형 (98%)\n2. 안정 애착형 (82%)\n3. 사교 활발형 (65%)\n\n혼자서도 잘 지내는 자립적인 강아지와 잘 맞으실 거예요!",
        options: [
          { label: "독립 탐험형 상품 보기", value: "shop-brain", icon: ShoppingBag },
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
        ]
      },
      "sample-report": {
        user: "샘플 리포트 볼게요",
        bot: "리포트 미리보기예요!\n\n[PetStay AI 성격분석 리포트]\n\n1. 성격유형 상세 분석\n   - 활동 의존형 (ENTP)\n   - 주요 특성 점수\n\n2. 행동 패턴 해석\n   - 에너지 레벨: 상\n   - 사회화 수준: 중상\n\n3. 맞춤 케어 가이드\n   - 일일 운동량: 1시간+\n   - 추천 놀이: 공놀이, 터그\n\n4. 견주 궁합 분석\n   - 최적 견주 유형\n\n5. 맞춤 상품 추천 (10개)\n\n정식 리포트는 PDF로 다운로드 가능해요!",
        options: [
          { label: "검사하고 리포트 받기", value: "test", icon: Sparkles },
          { label: "처음으로", value: "home" },
        ]
      },
      other: {
        user: "다른 질문이요",
        bot: "어떤 것이 궁금하신가요?",
        options: [
          { label: "문제행동 상담", value: "behavior" },
          { label: "사료/간식 추천", value: "food" },
          { label: "건강 체크", value: "health" },
          { label: "훈련 방법", value: "training" },
        ]
      },
      "toy-recommend": {
        user: "장난감 추천해주세요",
        bot: "물어뜯기용 ���천 장난감이에요!\n\n내구성 좋은 장난감:\n- 콩 클래식 (간식 넣기)\n- 나일라본 (덴탈 껌)\n- 로프 장난감\n\n노즈워크:\n- 스너플 매트\n- 간식 퍼즐\n\n성격유형에 따라 더 정확한 추천이 가능해요!",
        options: [
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
        ]
      },
    }

    // Special handling for care-tips
    if (value === "care-tips" && selectedVideo) {
      const result = personalityResults[selectedVideo.resultType]
      addUserMessage("케어 팁 더 알려주세요")
      setTimeout(() => {
        addBotMessage(
          `${selectedVideo.dogName}(${result.type})을 위한 케어 팁이에요!\n\n${result.careAdvice.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}\n\n견주 궁합:\n${result.compatibility.map(c => `- ${c.type}: ${c.score}%`).join('\n')}`,
          [
            { label: "공유하기", value: "share", icon: Share2 },
            { label: "처음으로", value: "home" },
          ]
        )
      }, 800)
      return
    }

    const response = responses[value]
    if (response) {
      addUserMessage(response.user)
      setTimeout(() => {
        addBotMessage(response.bot, response.options)
      }, 800)
    }
  }

  const handleUserSubmit = () => {
    if (!userInput.trim()) return
    addUserMessage(userInput)
    setUserInput("")
    
    setTimeout(() => {
      addBotMessage(
        "좋은 질문이에요! 더 정확한 답변을 위해 성격유형 검사를 먼저 해보시는 건 어떨까요?",
        [
          { label: "성격유형 검사하기", value: "test", icon: Sparkles },
          { label: "다른 질문하기", value: "other" },
        ]
      )
    }, 1000)
  }

  const handleOptionClick = (value: string) => {
    switch (value) {
      case "sample":
        showSampleVideos()
        break
      case "upload":
      case "upload-photo":
        addUserMessage("업로드할게요")
        setTimeout(() => {
          addBotMessage("데모 버전에서는 업로드가 지원되지 않아요. 예시로 먼저 체험해보세요!", [
            { label: "예시로 체험하기", value: "sample", icon: Play },
          ])
        }, 500)
        break
      case "analyze":
        startAnalysis()
        break
      case "reselect":
        addUserMessage("다른 영상 선택할게요")
        setSelectedVideo(null)
        setTimeout(() => showSampleVideos(), 500)
        break
      case "share":
        addUserMessage("공유할게요!")
        setTimeout(() => {
          addBotMessage("공유 링크가 복사됐어요! SNS에서 친구들과 결과를 비교해보세요.", [
            { label: "처음으로", value: "home" },
          ])
        }, 500)
        break
      case "care-tips":
        if (selectedVideo) {
          const result = personalityResults[selectedVideo.resultType]
          addUserMessage("케어 팁 더 알려주세요")
          setTimeout(() => {
            addBotMessage(
              `${selectedVideo.dogName}(${result.type})를 위한 케어 팁이에요!\n\n${result.careAdvice.map((tip, i) => `${i + 1}. ${tip}`).join("\n")}\n\n맞춤 상품도 확인해보세요!`,
              [
                { label: "맞춤 상품 보기", value: "go-shop", icon: ShoppingBag },
                { label: "처음으로", value: "home" },
              ]
            )
          }, 500)
        }
        break
      case "go-shop":
        if (selectedVideo) {
          setMode("shop")
          setSelectedType(selectedVideo.resultType)
        }
        break
      case "shop-active":
        setMode("shop")
        setSelectedType("활동 의존형")
        break
      case "shop-brain":
        setMode("shop")
        setSelectedType("독립 탐험형")
        break
      case "shop-calm":
        setMode("shop")
        setSelectedType("안정 애착형")
        break
      case "shop-social":
        setMode("shop")
        setSelectedType("사교 활발형")
        break
      case "restart":
        addUserMessage("다시 테스트할게요")
        setSelectedVideo(null)
        setQuestionStep(0)
        setAnswers([])
        setTimeout(() => showSampleVideos(), 500)
        break
      case "consult":
        addUserMessage("AI 상담 받고 싶어요")
        startChatbot()
        break
      case "test":
        startVideoTest()
        break
      case "home":
        resetToMain()
        break
      default:
        handleChatbotOption(value)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Live Demo
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            PetStay AI
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              직접 체험해보세요
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            영상 분석부터 AI 상담까지, 실제 서비스를 미리 경험해보세요
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* Phone Frame */}
          <div className="relative mx-auto" style={{ maxWidth: "375px" }}>
            {/* Phone outer frame */}
            <div className="bg-foreground/90 rounded-[3rem] p-3 shadow-2xl">
              {/* Screen */}
              <div className="bg-background rounded-[2.25rem] overflow-hidden relative" style={{ height: "700px" }}>
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="w-28 h-6 bg-foreground/90 rounded-full" />
                </div>

                {/* Content */}
                <div className="h-full flex flex-col pt-12">
                  <AnimatePresence mode="wait">
                    {mode === "main" && (
                      <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col p-4"
                      >
                        {/* Header */}
                        <div className="text-center py-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center shadow-lg">
                            <Dog className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">PetStay AI</h3>
                          <p className="text-muted-foreground text-sm mt-1">강아지 성격유형 검사</p>
                        </div>

                        {/* Feature buttons */}
                        <div className="flex-1 space-y-3">
                          {featureButtons.map((feature, index) => (
                            <motion.button
                              key={feature.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => {
                                console.log("[v0] Feature button clicked:", feature.id)
                                if (feature.id === "video-test") startVideoTest()
                                else if (feature.id === "result-preview") setMode("result-preview")
                                else if (feature.id === "chatbot") startChatbot()
                              }}
                              className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md`}>
                                <feature.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground">{feature.label}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </motion.button>
                          ))}

                          {/* Additional features */}
                          <div className="pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-3 px-1">더 많은 기능</p>
                            <div className="grid grid-cols-3 gap-2">
                              {comingSoonFeatures.map((item, i) => (
                                <button
                                  key={i}
                                  onClick={() => {
                                    console.log("[v0] Additional feature clicked:", item.id)
                                    if (item.id === "photo-test") startPhotoTest()
                                    else if (item.id === "compatibility") startCompatibility()
                                    else if (item.id === "shop") startShop()
                                  }}
                                  className="bg-secondary/50 hover:bg-secondary rounded-xl p-3 flex flex-col items-center gap-2 transition-colors"
                                >
                                  <item.icon className="w-5 h-5 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{item.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 pt-3">
                            <div className="bg-secondary/30 rounded-xl p-2 text-center">
                              <p className="text-lg font-bold text-primary">127K</p>
                              <p className="text-xs text-muted-foreground">검사 완료</p>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-2 text-center">
                              <p className="text-lg font-bold text-primary">4.9</p>
                              <p className="text-xs text-muted-foreground">만족도</p>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-2 text-center">
                              <p className="text-lg font-bold text-primary">16</p>
                              <p className="text-xs text-muted-foreground">유형</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {mode === "result-preview" && (
                      <motion.div
                        key="result-preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-border">
                          <button onClick={resetToMain} className="p-2 hover:bg-secondary rounded-full">
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>
                          <h3 className="font-semibold text-foreground flex-1">결과 예시 보기</h3>
                        </div>

                        {/* Result cards carousel */}
                        <div className="flex-1 overflow-hidden relative">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={previewIndex}
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              className="absolute inset-0 p-4 overflow-y-auto"
                            >
                              <ResultCard 
                              result={previewResults[previewIndex]} 
                              compact 
                              onShopClick={(type) => {
                                setMode("shop")
                                setSelectedType(type)
                              }}
                            />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="p-4 flex items-center justify-center gap-4">
                          <button
                            onClick={() => setPreviewIndex(prev => prev > 0 ? prev - 1 : previewResults.length - 1)}
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center"
                          >
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>
                          <div className="flex items-center gap-2">
                            {previewResults.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setPreviewIndex(i)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  i === previewIndex ? "bg-primary" : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => setPreviewIndex(prev => prev < previewResults.length - 1 ? prev + 1 : 0)}
                            className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center"
                          >
                            <ChevronRight className="w-5 h-5 text-foreground" />
                          </button>
                        </div>

                        {/* CTA */}
                        <div className="p-4 border-t border-border">
                          <Button
                            onClick={startVideoTest}
                            className="w-full bg-gradient-to-r from-primary to-accent text-white"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            우리 강아지도 검사하기
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {mode === "shop" && (
                      <motion.div
                        key="shop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Shop header */}
                        <div className="flex items-center gap-3 p-4 border-b border-border">
                          <button 
                            onClick={() => {
                              if (selectedType && !selectedCategory) {
                                setSelectedType(null)
                              } else if (selectedCategory) {
                                setSelectedCategory(null)
                              } else {
                                resetToMain()
                              }
                            }} 
                            className="p-2 hover:bg-secondary rounded-full"
                          >
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">
                              {selectedType ? `${selectedType} 맞춤 추천` : "성격유형별 맞춤 쇼핑"}
                            </h3>
                            {cart.length > 0 && (
                              <p className="text-xs text-primary">장바구니 {cart.length}개</p>
                            )}
                          </div>
                          <button className="relative p-2 hover:bg-secondary rounded-full">
                            <ShoppingBag className="w-5 h-5 text-foreground" />
                            {cart.length > 0 && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                                {cart.length}
                              </span>
                            )}
                          </button>
                        </div>

                        {/* Shop content */}
                        <div className="flex-1 overflow-y-auto">
                          {!selectedType ? (
                            // Type selection
                            <div className="p-4 space-y-4">
                              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 text-center">
                                <p className="text-sm font-medium text-foreground mb-1">첫 구매 회원 한정</p>
                                <p className="text-2xl font-bold text-primary">20% OFF</p>
                                <p className="text-xs text-muted-foreground mt-1">성격유형 검사 후 맞춤 상품 구매 시</p>
                              </div>
                              
                              <p className="text-sm font-medium text-foreground">유형을 선택하세요</p>
                              
                              {Object.keys(recommendedProducts).map((type) => {
                                const typeData = personalityResults[type]
                                const products = recommendedProducts[type]
                                const bestseller = products.find(p => p.bestseller)
                                
                                return (
                                  <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className="w-full bg-card border border-border rounded-2xl p-4 text-left hover:shadow-md transition-shadow"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeData.gradient} flex items-center justify-center text-xl`}>
                                        {typeData.emoji}
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-semibold text-foreground">{type}</p>
                                        <p className="text-xs text-muted-foreground">{products.length}개 상품</p>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    {bestseller && (
                                      <div className="mt-3 flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
                                        <span className="text-lg">{bestseller.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-medium text-foreground truncate">BEST: {bestseller.name}</p>
                                        </div>
                                        <span className="text-xs font-bold text-primary">{bestseller.price}</span>
                                      </div>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          ) : !selectedCategory ? (
                            // Category selection within type
                            <div className="p-4 space-y-4">
                              {/* Type banner */}
                              <div className={`bg-gradient-to-r ${personalityResults[selectedType].gradient} rounded-2xl p-4 text-white`}>
                                <div className="flex items-center gap-3">
                                  <span className="text-3xl">{personalityResults[selectedType].emoji}</span>
                                  <div>
                                    <p className="font-bold">{selectedType}</p>
                                    <p className="text-sm text-white/80">{personalityResults[selectedType].description.slice(0, 30)}...</p>
                                  </div>
                                </div>
                              </div>

                              {/* Category filters */}
                              <div className="flex gap-2 overflow-x-auto pb-2">
                                {["전체", "장난감", "간식", "케어", "용품"].map((cat) => (
                                  <button
                                    key={cat}
                                    onClick={() => cat === "전체" ? null : setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                      cat === "전체" ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
                                    }`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>

                              {/* Products grid */}
                              <div className="space-y-3">
                                {recommendedProducts[selectedType].map((product, i) => (
                                  <div
                                    key={i}
                                    className="bg-card border border-border rounded-xl p-3 flex gap-3"
                                  >
                                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                      {product.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        {product.bestseller && (
                                          <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded">BEST</span>
                                        )}
                                        <span className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-xs rounded">{product.category}</span>
                                      </div>
                                      <p className="font-medium text-foreground text-sm mt-1 truncate">{product.name}</p>
                                      <div className="flex items-center gap-1 mt-0.5">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <span className="text-xs text-foreground">{product.rating}</span>
                                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                                      </div>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="font-bold text-primary text-sm">{product.price}</span>
                                        {product.originalPrice && (
                                          <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => addToCart({ name: product.name, price: product.price, emoji: product.emoji })}
                                      className="self-center p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                                    >
                                      <ShoppingBag className="w-4 h-4 text-primary" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* Recommendation banner */}
                              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                                <p className="text-sm text-foreground mb-2">더 정확한 맞춤 추천을 원하시나요?</p>
                                <Button
                                  onClick={startVideoTest}
                                  size="sm"
                                  className="bg-gradient-to-r from-primary to-accent text-white"
                                >
                                  <Sparkles className="w-4 h-4 mr-1" />
                                  성격유형 검사하기
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        {/* Cart summary */}
                        {cart.length > 0 && (
                          <div className="p-4 border-t border-border bg-card">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">장바구니 ({cart.length})</span>
                              <span className="font-bold text-foreground">
                                {cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, "")), 0).toLocaleString()}원
                              </span>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-primary to-accent text-white">
                              구매하기 (20% 할인 적용)
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {(mode === "video-test" || mode === "chatbot" || mode === "photo-test" || mode === "compatibility" || mode === "report") && (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Chat header */}
                        <div className="flex items-center gap-3 p-4 border-b border-border">
                          <button onClick={resetToMain} className="p-2 hover:bg-secondary rounded-full">
                            <ChevronLeft className="w-5 h-5 text-foreground" />
                          </button>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">PetStay AI</h3>
                            <p className="text-xs text-green-500">온라인</p>
                          </div>
                        </div>

                        {/* Chat messages */}
                        <div
                          ref={chatContainerRef}
                          className="flex-1 overflow-y-auto p-4 space-y-4"
                        >
                          {messages.map((message) => (
                            <ChatMessageComponent
                              key={message.id}
                              message={message}
                              onOptionClick={handleOptionClick}
                              onVideoSelect={selectVideo}
                              onQuestionAnswer={handleQuestionAnswer}
                              onShopClick={(type) => {
                                setMode("shop")
                                setSelectedType(type)
                              }}
                              sampleVideos={sampleVideos}
                              analysisProgress={analysisProgress}
                              analysisQuestions={analysisQuestions}
                              isVideoPlaying={isVideoPlaying}
                              isMuted={isMuted}
                              onToggleMute={() => setIsMuted(!isMuted)}
                            />
                          ))}
                        </div>

                        {/* Input area */}
                        <div className="p-4 border-t border-border bg-background">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleUserSubmit()}
                              placeholder="메시지를 입력하세요..."
                              className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button
                              onClick={handleUserSubmit}
                              disabled={!userInput.trim()}
                              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center disabled:opacity-50"
                            >
                              <Send className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChatMessageComponent({
  message,
  onOptionClick,
  onVideoSelect,
  onQuestionAnswer,
  onShopClick,
  sampleVideos,
  analysisProgress,
  analysisQuestions,
  isVideoPlaying,
  isMuted,
  onToggleMute,
}: {
  message: ChatMessage
  onOptionClick: (value: string) => void
  onVideoSelect: (video: typeof sampleVideos[0]) => void
  onQuestionAnswer: (answer: string, questionIndex: number) => void
  onShopClick: (type: string) => void
  sampleVideos: typeof sampleVideos
  analysisProgress: number
  analysisQuestions: typeof analysisQuestions
  isVideoPlaying: boolean
  isMuted: boolean
  onToggleMute: () => void
}) {
  if (message.type === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] bg-gradient-to-r from-primary to-accent text-white rounded-2xl rounded-br-md px-4 py-2.5">
          <p className="text-sm">{message.content}</p>
        </div>
      </motion.div>
    )
  }

  if (message.type === "video-playing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <div className="max-w-[90%] bg-card rounded-2xl rounded-bl-md overflow-hidden border border-border">
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${message.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${message.videoId}`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={onToggleMute}
              className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-foreground">{message.videoTitle}</p>
            <p className="text-xs text-muted-foreground mt-1">AI가 영상을 분석하고 있어요</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (message.type === "questions") {
    const questionIndex = message.questionStep || 0
    const question = analysisQuestions[questionIndex]
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <div className="max-w-[90%]">
          <div className="bg-card rounded-2xl rounded-bl-md p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{questionIndex + 1}</span>
              </div>
              <span className="text-xs text-muted-foreground">질문 {questionIndex + 1}/{analysisQuestions.length}</span>
            </div>
            <p className="text-sm text-foreground font-medium mb-3">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onQuestionAnswer(option.value, questionIndex)}
                  className="w-full text-left px-3 py-2 bg-secondary/50 hover:bg-secondary rounded-xl text-sm text-foreground transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (message.type === "analyzing") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <div className="max-w-[85%] bg-card rounded-2xl rounded-bl-md p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-foreground">AI 분석 중...</p>
              <p className="text-xs text-muted-foreground">{Math.min(Math.round(analysisProgress), 100)}%</p>
            </div>
          </div>
          <div className="bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(analysisProgress, 100)}%` }}
            />
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              { label: "움직임 패턴 분석", done: analysisProgress > 25 },
              { label: "표정/꼬리 패턴", done: analysisProgress > 50 },
              { label: "답변 교차 분석", done: analysisProgress > 75 },
              { label: "유형 매칭", done: analysisProgress >= 100 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? "bg-green-500" : "bg-muted"}`}>
                  {item.done && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
                <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (message.type === "result" && message.result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <div className="max-w-[95%]">
          <ResultCard result={message.result} compact onShopClick={onShopClick} />
        </div>
      </motion.div>
    )
  }

  // Bot message
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%]">
        <div className="bg-card rounded-2xl rounded-bl-md px-4 py-2.5 border border-border">
          <p className="text-sm text-foreground whitespace-pre-line">{message.content}</p>
        </div>
        
        {/* Sample video selection */}
        {(message.content?.includes("분석할 영상을 선택") || message.content?.includes("예시 영상 중 하나를 선택")) && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {sampleVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => onVideoSelect(video)}
                className="relative aspect-video rounded-xl overflow-hidden group"
              >
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs line-clamp-1">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Options */}
        {message.options && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onOptionClick(option.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {option.icon && <option.icon className="w-3.5 h-3.5" />}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ResultCard({ result, compact = false, onShopClick }: { result: typeof personalityResults[string] & { dogName: string }; compact?: boolean; onShopClick?: (type: string) => void }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
      {/* Header */}
      <div className={`bg-gradient-to-r ${result.gradient} p-4 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
            {result.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-lg">{result.dogName}</h4>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">{result.subType}</span>
            </div>
            <p className="text-white/90 text-sm">{result.type}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 space-y-4 ${compact ? "text-sm" : ""}`}>
        <p className="text-foreground text-sm leading-relaxed">{result.description}</p>

        {/* Traits */}
        <div className="space-y-2">
          {result.traits.map((trait) => (
            <div key={trait.label} className="flex items-center gap-2">
              <trait.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground w-12">{trait.label}</span>
              <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.score}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full bg-gradient-to-r ${result.gradient}`}
                />
              </div>
              <span className="text-xs font-semibold text-foreground w-8 text-right">{trait.score}</span>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="flex flex-wrap gap-1.5">
          {result.strengths.slice(0, 3).map((strength) => (
            <span key={strength} className="px-2 py-1 bg-secondary rounded-full text-xs text-foreground">
              {strength}
            </span>
          ))}
        </div>

        {/* Compatibility preview */}
        <div className="bg-secondary/50 rounded-xl p-3">
          <p className="text-xs font-medium text-foreground mb-2">견주 궁합 TOP</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">{result.compatibility[0].type}</span>
            <div className="flex-1 bg-background rounded-full h-1.5 overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${result.gradient}`} style={{ width: `${result.compatibility[0].score}%` }} />
            </div>
            <span className="text-sm font-bold text-primary">{result.compatibility[0].score}%</span>
          </div>
        </div>

        {/* Recommended products */}
        {recommendedProducts[result.type] && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-3 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <p className="text-xs font-medium text-foreground">맞춤 상품 추천</p>
              <span className="ml-auto text-xs text-primary font-medium">첫 ��매 20% 할인</span>
            </div>
            <div className="space-y-1.5">
              {recommendedProducts[result.type].slice(0, 2).map((product) => (
                <div key={product.name} className="flex items-center gap-2 bg-background/60 rounded-lg p-2">
                  <span className="text-lg">{product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.tag}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">{product.price}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onShopClick?.(result.type)}
              className="w-full mt-2 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium rounded-lg transition-colors"
            >
              맞춤 상품 더보기 ({recommendedProducts[result.type].length}개)
            </button>
          </div>
        )}

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1">
          {result.hashtags.map((tag) => (
            <span key={tag} className={`text-xs font-medium ${result.color}`}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
