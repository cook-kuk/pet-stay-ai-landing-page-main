"use client"

import { motion } from "framer-motion"
import { Zap, Share2, Repeat } from "lucide-react"

const pillars = [
  {
    icon: Zap,
    title: "유입",
    subtitle: "영상만으로 쉽게 시작",
    description: "복잡한 설문 없이 30초 영상 하나로 시작해요. 누구나 쉽게 참여할 수 있어요.",
    stats: "30초",
    statsLabel: "평균 참여 시간",
    color: "from-primary to-accent",
    emoji: "⚡",
  },
  {
    icon: Share2,
    title: "바이럴",
    subtitle: "결과 카드로 자연스러운 공유",
    description: "예쁜 결과 카드와 궁합 콘텐츠로 SNS 공유가 자연스럽게 일어나요.",
    stats: "3.2배",
    statsLabel: "공유 전환율",
    color: "from-accent to-chart-5",
    emoji: "📱",
  },
  {
    icon: Repeat,
    title: "리텐션",
    subtitle: "챗봇 + 커뮤니티 + 반복 사용",
    description: "매일 달라지는 루틴 추천과 커뮤니티로 지속적인 방문을 유도해요.",
    stats: "72%",
    statsLabel: "7일 재방문율",
    color: "from-chart-5 to-chart-2",
    emoji: "🔄",
  },
]

export function WhyItWorksSection() {
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
            Why It Works
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            왜 PetStay AI인가요?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            검증된 그로스 전략으로 사용자를 끌어모으고, 유지해요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border h-full relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${pillar.color} opacity-10 rounded-full blur-3xl`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-lg mb-6`}>
                    <span className="text-3xl">{pillar.emoji}</span>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                      {pillar.title}
                    </h3>
                    <p className="text-foreground font-medium mt-1">{pillar.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-4 border-t border-border">
                    <p className={`text-3xl font-bold bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                      {pillar.stats}
                    </p>
                    <p className="text-sm text-muted-foreground">{pillar.statsLabel}</p>
                  </div>
                </div>
              </div>

              {/* Connector line (desktop only) */}
              {index < pillars.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Growth funnel visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-lg border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">그로스 플라이휠</h3>
                <p className="text-muted-foreground">
                  영상 업로드부터 커뮤니티 참여까지, 자연스러운 순환 구조
                </p>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { emoji: "📹", label: "업로드" },
                  { emoji: "🎯", label: "분석" },
                  { emoji: "📱", label: "공유" },
                  { emoji: "💬", label: "소통" },
                  { emoji: "🔁", label: "재방문" },
                ].map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-xl">{step.emoji}</span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{step.label}</span>
                    {index < 4 && (
                      <div className="hidden md:block absolute ml-20">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
