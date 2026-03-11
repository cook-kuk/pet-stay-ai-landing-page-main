"use client"

import { motion } from "framer-motion"
import { Heart, Users, Search, Sparkles } from "lucide-react"
import { useApp } from "./app-context"

const features = [
  {
    icon: Heart,
    title: "견주 x 강아지 궁합",
    description: "보호자의 성향과 우리 아이 성향의 궁합을 분석해요",
    stat: "98%",
    statLabel: "일치도",
    emoji: "💕",
    color: "from-rose-400 to-pink-400",
    action: "compatibility",
  },
  {
    icon: Users,
    title: "내가 강아지라면?",
    description: "견주도 16가지 유형 중 하나로 분류돼요",
    stat: "ENFP",
    statLabel: "유형 예시",
    emoji: "🐶",
    color: "from-amber-400 to-orange-400",
    action: "compatibility",
  },
  {
    icon: Search,
    title: "나와 잘 맞는 강아지",
    description: "내 성향에 맞는 이상적인 반려견 유형을 추천해요",
    stat: "TOP3",
    statLabel: "추천 유형",
    emoji: "✨",
    color: "from-emerald-400 to-teal-400",
    action: "compatibility",
  },
  {
    icon: Sparkles,
    title: "같은 유형 친구 찾기",
    description: "같은 성격유형의 강아지 친구를 만나보세요",
    stat: "2,847",
    statLabel: "활동 친구",
    emoji: "🐾",
    color: "from-blue-400 to-indigo-400",
    action: "community",
  },
]

export function CompatibilitySection() {
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
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Compatibility
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            궁합으로 더 가까워지기
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            성격유형 분석을 넘어서, 견주와 반려견의 궁합까지 알아보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModal(feature.action as "compatibility" | "community")}
              className="group text-left"
            >
              <div className="bg-card rounded-3xl p-6 shadow-lg border border-border h-full relative overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.stat}
                      </p>
                      <p className="text-xs text-muted-foreground">{feature.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    <span>자세히 보기</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fun compatibility preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveModal("compatibility")}
            className="w-full bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              {/* Owner */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-chart-2 to-chart-3 flex items-center justify-center shadow-lg mx-auto mb-3">
                  <span className="text-4xl">👩</span>
                </div>
                <p className="font-bold text-foreground">보호자</p>
                <p className="text-sm text-muted-foreground">균형 탐색형</p>
              </div>

              {/* Compatibility indicator */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-bold text-primary-foreground">98%</span>
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">찰떡궁합</p>
              </div>

              {/* Dog */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg mx-auto mb-3">
                  <span className="text-4xl">🐕</span>
                </div>
                <p className="font-bold text-foreground">코코</p>
                <p className="text-sm text-muted-foreground">활동 의존형</p>
              </div>
            </div>

            <p className="text-center text-muted-foreground mt-6 max-w-lg mx-auto">
              호기심 많은 보호자와 에너지 넘치는 코코는 함께 모험하기 딱 좋은 조합이에요!
            </p>
            <p className="text-center text-primary text-sm font-medium mt-4">
              나의 궁합 테스트하기 →
            </p>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
