"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, Sparkles, RotateCcw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  type: "bot" | "user"
  content: string
  options?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "안녕하세요! PetStay AI 챗봇이에요. 우리 강아지 성격에 대해 궁금한 점이 있으신가요?",
    options: ["우리 강아지 성격유형 알아보기", "성격유형별 특징 알려줘", "견주 궁합 테스트 해보기"],
  },
]

const chatResponses: Record<string, { content: string; options?: string[] }[]> = {
  "우리 강아지 성격유형 알아보기": [
    {
      content: "좋아요! 우리 강아지의 성격유형을 알아볼까요?",
    },
    {
      content: "먼저 간단한 질문을 드릴게요. 우리 강아지가 혼자 있을 때 주로 어떤 행동을 하나요?",
      options: ["창밖을 계속 바라봐요", "장난감 가지고 혼자 잘 놀아요", "잠을 자거나 쉬어요", "안절부절 못해요"],
    },
  ],
  "창밖을 계속 바라봐요": [
    {
      content: "보호자를 기다리는 모습이네요! 애착이 강한 타입일 수 있어요.",
    },
    {
      content: "다음 질문이에요. 다른 강아지를 만나면 우리 강아지는 어떻게 반응하나요?",
      options: ["신나서 다가가요", "경계하면서 지켜봐요", "무관심해요", "피하려고 해요"],
    },
  ],
  "장난감 가지고 혼자 잘 놀아요": [
    {
      content: "독립심이 강한 아이네요! 혼자서도 시간을 잘 보내는 타입이에요.",
    },
    {
      content: "다음 질문이에요. 새로운 환경에 가면 우리 강아지는 어떻게 행동하나요?",
      options: ["호기심 가득 탐험해요", "보호자 옆에 붙어있어요", "조심스럽게 살펴봐요", "숨으려고 해요"],
    },
  ],
  "잠을 자거나 쉬어요": [
    {
      content: "차분하고 안정적인 성향이네요! 에너지 관리를 잘 하는 타입이에요.",
    },
    {
      content: "다음 질문이에요. 간식을 줄 때 우리 강아지는 어떻게 반응하나요?",
      options: ["엄청 흥분해요", "차분하게 받아먹어요", "눈치 보다가 먹어요", "별로 관심 없어요"],
    },
  ],
  "안절부절 못해요": [
    {
      content: "보호자와 함께 있을 때 가장 행복한 타입이에요! 분리불안 케어가 필요할 수 있어요.",
    },
    {
      content: "다음 질문이에요. 산책할 때 우리 강아지는 어떤 스타일인가요?",
      options: ["앞서서 끌고 다녀요", "내 옆에서 맞춰 걸어요", "냄새 맡느라 느려요", "빨리 집에 가려 해요"],
    },
  ],
  "신나서 다가가요": [
    {
      content: "사교성이 뛰어난 아이네요!",
    },
    {
      content: "분석 결과, 우리 강아지는 '사교 활발형'에 가까워 보여요! 다른 강아지나 사람들과 어울리는 것을 좋아하고, 에너지가 넘치는 타입이에요.",
      options: ["더 자세한 분석 받기", "다른 성격유형 알아보기", "처음으로 돌아가기"],
    },
  ],
  "호기심 가득 탐험해요": [
    {
      content: "탐험심이 강한 아이네요!",
    },
    {
      content: "분석 결과, 우리 강아지는 '독립 탐험형'에 가까워 보여요! 호기심이 많고 새로운 것을 좋아하며, 혼자서도 잘 노는 타입이에요.",
      options: ["더 자세한 분석 받기", "다른 성격유형 알아보기", "처음으로 돌아가기"],
    },
  ],
  "성격유형별 특징 알려줘": [
    {
      content: "PetStay AI는 강아지를 16가지 성격유형으로 분류해요. 크게 4가지 카테고리가 있어요:",
    },
    {
      content: "1. 활동 의존형 - 보호자와 함께 활동할 때 에너지가 충전되는 타입\n2. 독립 탐험형 - 호기심 많고 혼자서도 잘 노는 타입\n3. 안정 애착형 - 차분하고 보호자에게 깊은 애착을 보이는 타입\n4. 사교 활발형 - 다른 강아지나 사람들과 어울리기 좋아하는 타입",
      options: ["활동 의존형 자세히", "독립 탐험형 자세히", "안정 애착형 자세히", "사교 활발형 자세히"],
    },
  ],
  "활동 의존형 자세히": [
    {
      content: "'활동 의존형' 강아지의 특징이에요:",
    },
    {
      content: "- 보호자와 함께하는 활동에서 에너지를 얻어요\n- 놀이 시간을 매우 중요하게 생각해요\n- 혼자 있으면 심심해하거나 불안해할 수 있어요\n- 칭찬과 관심에 크게 반응해요\n\n추천 케어: 매일 최소 30분 이상 함께 놀아주기, 외출 전 집중 놀이 시간 갖기",
      options: ["다른 유형 알아보기", "우리 강아지 검사하기", "처음으로 돌아가기"],
    },
  ],
  "독립 탐험형 자세히": [
    {
      content: "'독립 탐험형' 강아지의 특징이에요:",
    },
    {
      content: "- 혼자서도 잘 놀고 시간을 보내요\n- 새로운 환경이나 물건에 호기심이 많아요\n- 자기만의 공간을 좋아해요\n- 강요하면 오히려 피해요\n\n추천 케어: 노즈워크 장난감 제공, 탐험할 수 있는 환경 만들어주기",
      options: ["다른 유형 알아보기", "우리 강아지 검사하기", "처음으로 돌아가기"],
    },
  ],
  "안정 애착형 자세히": [
    {
      content: "'안정 애착형' 강아지의 특징이에요:",
    },
    {
      content: "- 보호자 옆에 있는 것만으로도 행복해해요\n- 차분하고 안정적인 성향이에요\n- 규칙적인 일과를 좋아해요\n- 갑작스러운 변화에 민감해요\n\n추천 케어: 일정한 루틴 유지, 함께 있는 조용한 시간 만들기",
      options: ["다른 유형 알아보기", "우리 강아지 검사하기", "처음으로 돌아가기"],
    },
  ],
  "사교 활발형 자세히": [
    {
      content: "'사교 활발형' 강아지의 특징이에요:",
    },
    {
      content: "- 다른 강아지나 사람을 만나면 신나해요\n- 에너지가 넘치고 활동적이에요\n- 새로운 친구 사귀는 것을 좋아해요\n- 주목받는 것을 즐겨요\n\n추천 케어: 정기적인 강아지 친구 만남, 다양한 사회화 기회 제공",
      options: ["다른 유형 알아보기", "우리 강아지 검사하기", "처음으로 돌아가기"],
    },
  ],
  "견주 궁합 테스트 해보기": [
    {
      content: "견주 궁합 테스트는 보호자의 라이프스타일과 강아지 성격이 얼마나 잘 맞는지 분석해드려요!",
    },
    {
      content: "먼저 보호자님에 대해 알려주세요. 평소 생활 패턴이 어떤가요?",
      options: ["활동적이고 외출이 많아요", "집에서 조용히 지내요", "불규칙해요", "바쁜 직장인이에요"],
    },
  ],
  "활동적이고 외출이 많아요": [
    {
      content: "활동적인 라이프스타일이시네요!",
    },
    {
      content: "보호자님은 '활동 의존형'이나 '사교 활발형' 강아지와 궁합이 좋아요! 함께 산책하고 활동하는 것을 즐길 수 있어요.",
      options: ["우리 강아지 궁합 확인하기", "다른 성격유형 알아보기", "처음으로 돌아가기"],
    },
  ],
  "집에서 조용히 지내요": [
    {
      content: "차분한 라이프스타일이시네요!",
    },
    {
      content: "보호자님은 '안정 애착형' 강아지와 궁합이 좋아요! 함께 편안하게 시간을 보내는 것을 즐길 수 있어요.",
      options: ["우리 강아지 궁합 확인하기", "다른 성격유형 알아보기", "처음으로 돌아가기"],
    },
  ],
  default: [
    {
      content: "이해했어요! 더 자세한 분석을 원하시면 영상으로 우리 강아지 성격유형 검사를 해보세요.",
      options: ["우리 강아지 성격유형 알아보기", "성격유형별 특징 알려줘", "견주 궁합 테스트 해보기"],
    },
  ],
}

export function InteractiveChatbotSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOptionClick = async (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: option,
    }
    setMessages((prev) => [...prev, userMessage])

    // Handle special cases
    if (option === "처음으로 돌아가기") {
      setIsTyping(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setMessages(initialMessages)
      setIsTyping(false)
      return
    }

    if (option === "다른 유형 알아보기" || option === "다른 성격유형 알아보기") {
      const responses = chatResponses["성격유형별 특징 알려줘"]
      setIsTyping(true)
      for (const response of responses) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        const botMessage: Message = {
          id: Date.now().toString() + Math.random(),
          type: "bot",
          content: response.content,
          options: response.options,
        }
        setMessages((prev) => [...prev, botMessage])
      }
      setIsTyping(false)
      return
    }

    // Get response
    const responses = chatResponses[option] || chatResponses.default
    setIsTyping(true)

    for (const response of responses) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const botMessage: Message = {
        id: Date.now().toString() + Math.random(),
        type: "bot",
        content: response.content,
        options: response.options,
      }
      setMessages((prev) => [...prev, botMessage])
    }

    setIsTyping(false)
  }

  const handleReset = () => {
    setMessages(initialMessages)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const botMessage: Message = {
      id: Date.now().toString() + "bot",
      type: "bot",
      content: `"${inputValue}"에 대해 관심을 가져주셔서 감사해요! 더 정확한 분석을 위해 아래 옵션 중 하나를 선택해주세요.`,
      options: ["우리 강아지 성격유형 알아보기", "성격유형별 특징 알려줘", "견주 궁합 테스트 해보기"],
    }
    setMessages((prev) => [...prev, botMessage])
    setIsTyping(false)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            AI Chatbot Demo
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            AI 챗봇과 직접
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              대화해보세요
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            PetStay AI 챗봇이 어떻게 작동하는지 직접 체험해보세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          {/* Phone frame */}
          <div className="bg-foreground rounded-[3rem] p-3 shadow-2xl">
            <div className="bg-background rounded-[2.5rem] overflow-hidden">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-primary-foreground font-semibold text-sm">PetStay AI</h4>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-primary-foreground/70 text-xs">온라인</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex gap-2 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {msg.type === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl rounded-tr-sm"
                            : "bg-secondary text-foreground rounded-2xl rounded-tl-sm"
                        } px-4 py-3`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                        {msg.options && (
                          <div className="mt-3 space-y-2">
                            {msg.options.map((option) => (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="w-full text-left px-3 py-2 rounded-xl border border-primary/30 bg-background text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-3 bg-card border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:shadow-lg transition-shadow"
                  >
                    <Send className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-lg border border-border">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">실제 서비스에서는 더 상세한 분석이 제공돼요</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
