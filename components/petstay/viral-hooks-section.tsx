"use client"

import { motion } from "framer-motion"
import { Dog, Heart, Users, Sparkles } from "lucide-react"
import { useApp } from "./app-context"

const hooks = [
  {
    icon: Dog,
    title: "우리 강아지 MBTI는?",
    description: "16가지 유형으로 알아보는 우리 아이 성격",
    color: "from-primary to-accent",
    emoji: "🐕",
    action: "video-test" as const,
  },
  {
    icon: Heart,
    title: "나와 우리 강아지 궁합은?",
    description: "견주와 반려견의 찰떡 궁합 분석",
    color: "from-accent to-chart-5",
    emoji: "💕",
    action: "compatibility" as const,
  },
  {
    icon: Users,
    title: "내가 강아지라면 무슨 유형?",
    description: "견주도 함께 하는 성격 테스트",
    color: "from-chart-5 to-chart-2",
    emoji: "🤔",
    action: "compatibility" as const,
  },
  {
    icon: Sparkles,
    title: "나와 잘 맞는 강아지 유형은?",
    description: "이상적인 반려견 유형 추천",
    color: "from-chart-2 to-primary",
    emoji: "✨",
    action: "compatibility" as const,
  },
]

export function ViralHooksSection() {
  const { setActiveModal } = useApp()

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            어떤 것이 궁금하세요?
          </h2>
          <p className="text-muted-foreground">
            재미있는 테스트로 우리 아이와 더 가까워지세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {hooks.map((hook, index) => (
            <motion.button
              key={hook.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModal(hook.action)}
              className="group text-left"
            >
              <div className="relative bg-card rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all h-full border border-border overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${hook.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${hook.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{hook.emoji}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {hook.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hook.description}
                  </p>

                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>테스트 시작</span>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
