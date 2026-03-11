"use client"

import { motion } from "framer-motion"
import { Bot, Send, Clock, Footprints, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "./app-context"

const chatMessages = [
  {
    type: "bot",
    avatar: "🤖",
    message: "코코는 활동 의존형 성향이 강해 보여요.",
    delay: 0,
  },
  {
    type: "bot",
    avatar: "🤖",
    message: "혼자 있는 시간보다 보호자와의 상호작용에서 에너지가 크게 올라가는 타입이에요.",
    delay: 0.3,
  },
  {
    type: "bot",
    avatar: "🤖",
    message: "오늘 외출 전에는 8분 놀이 + 노즈워크를 추천해요.",
    delay: 0.6,
  },
]

const quickReplies = [
  { icon: Clock, text: "오늘 루틴 추천받기" },
  { icon: Footprints, text: "집비움 관리 보기" },
  { icon: Heart, text: "궁합 분석 보기" },
]

export function ChatbotDemoSection() {
  const { setActiveModal } = useApp()

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Phone mockup with chat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-72 md:w-80 bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden min-h-[500px]">
                  {/* Chat header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-primary-foreground font-semibold text-sm">PetStay AI</h4>
                      <p className="text-primary-foreground/70 text-xs">코코의 전담 AI 상담사</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-4">
                    {/* Dog info card */}
                    <div className="bg-secondary rounded-2xl p-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                        <span className="text-xl">🐕</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">코코</p>
                        <p className="text-xs text-muted-foreground">활동 의존형 · 포메라니안</p>
                      </div>
                    </div>

                    {/* Messages */}
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: msg.delay }}
                        className="flex gap-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                          <span className="text-sm">{msg.avatar}</span>
                        </div>
                        <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                          <p className="text-sm text-foreground leading-relaxed">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Quick replies */}
                    <div className="space-y-2 pt-2">
                      {quickReplies.map((reply, index) => (
                        <motion.button
                          key={reply.text}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-2xl border border-primary/30 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                        >
                          <reply.icon className="w-4 h-4" />
                          {reply.text}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Input area */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-card border-t border-border rounded-b-[2.5rem]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary rounded-full px-4 py-2.5">
                        <span className="text-sm text-muted-foreground">메시지를 입력하세요...</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Send className="w-4 h-4 text-primary-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center"
              >
                <span className="text-2xl">💬</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              AI Chatbot
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              AI 챗봇이 결과를
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                상세하게 설명해드려요
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              단순한 결과표가 아니에요. AI 챗봇이 우리 아이의 성격을 깊이 있게 분석하고, 
              상황별 맞춤 조언을 제공해드려요.
            </p>

            <div className="space-y-4">
              {[
                "성격유형 기반 행동 패턴 설명",
                "오늘의 맞춤 루틴 추천",
                "문제 행동 원인 분석 및 솔루션",
                "견주와의 궁합 기반 케어 팁",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => setActiveModal("chatbot")}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-8"
              >
                챗봇 체험해보기
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
