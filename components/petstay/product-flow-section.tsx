"use client"

import { motion } from "framer-motion"
import { Upload, Brain, FileCheck, MessageCircle, Users } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "영상 업로드",
    description: "30초~1분 길이의 강아지 영상을 업로드하세요",
    color: "from-primary to-accent",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI 성향 분석",
    description: "AI가 행동 패턴과 표정을 분석해요",
    color: "from-accent to-chart-5",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "결과 카드 확인",
    description: "16가지 유형 중 우리 아이 유형을 확인해요",
    color: "from-chart-5 to-chart-2",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "챗봇 상담 연결",
    description: "AI 챗봇이 결과를 상세히 설명해드려요",
    color: "from-chart-2 to-chart-3",
  },
  {
    icon: Users,
    step: "05",
    title: "궁합/커뮤니티 확장",
    description: "견주 궁합, 같은 유형 친구 찾기까지!",
    color: "from-chart-3 to-primary",
  },
]

export function ProductFlowSection() {
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
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            영상 하나로 시작하는 여정
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            간단한 5단계로 우리 아이의 성격을 분석하고, 맞춤 케어를 시작하세요
          </p>
        </motion.div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gradient-to-b from-border to-transparent mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <span className="text-xs text-primary font-semibold">{step.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Horizontal cards */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-3xl p-6 shadow-lg border border-border h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4`}>
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs text-primary font-semibold">{step.step}</span>
                  <h3 className="text-lg font-bold text-foreground mt-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
