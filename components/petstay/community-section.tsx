"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, MapPin, Star, Bot } from "lucide-react"
import { useApp } from "./app-context"

const communityFeatures = [
  {
    icon: Users,
    title: "같은 성향 강아지 모임",
    description: "비슷한 성격의 강아지들과 교류해요",
    members: "1,247",
    emoji: "🐕",
  },
  {
    icon: Star,
    title: "같은 품종 커뮤니티",
    description: "품종별 특화 정보와 팁을 공유해요",
    members: "3,892",
    emoji: "🏆",
  },
  {
    icon: MapPin,
    title: "산책 친구 찾기",
    description: "가까운 동네 산책 친구를 찾아요",
    members: "892",
    emoji: "🦮",
  },
  {
    icon: MessageSquare,
    title: "보호자 질문/후기",
    description: "경험과 노하우를 나눠요",
    members: "5,421",
    emoji: "💬",
  },
  {
    icon: Bot,
    title: "AI 추천 그룹",
    description: "AI가 추천하는 맞춤 그룹에 참여해요",
    members: "2,156",
    emoji: "✨",
  },
]

const communityPosts = [
  {
    avatar: "🐕",
    name: "코코맘",
    type: "활동 의존형",
    content: "오늘 노즈워크 추천 너무 좋았어요! 우리 코코가 30분 동안 집중하네요",
    likes: 42,
    comments: 8,
    time: "10분 전",
  },
  {
    avatar: "🦮",
    name: "초코아빠",
    type: "차분한 관찰형",
    content: "같은 유형 초코 친구들 혹시 산책 모임 있나요? 동작구 지역이에요!",
    likes: 28,
    comments: 15,
    time: "32분 전",
  },
  {
    avatar: "🐶",
    name: "보리언니",
    type: "에너지 폭발형",
    content: "AI 상담 받고 분리불안 많이 좋아졌어요. 8분 놀이가 진짜 효과 있네요",
    likes: 67,
    comments: 12,
    time: "1시간 전",
  },
]

export function CommunitySection() {
  const { setActiveModal } = useApp()

  return (
    <section id="community" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Community
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            함께하는 반려 생활
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            같은 성향, 같은 품종의 친구들과 함께 정보를 나누고 소통하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Community features */}
          <div className="space-y-4">
            {communityFeatures.map((feature, index) => (
              <motion.button
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModal("community")}
                className="w-full group text-left"
              >
                <div className="bg-card rounded-2xl p-4 shadow-md border border-border flex items-center gap-4 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{feature.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{feature.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-primary">{feature.members}</p>
                    <p className="text-xs text-muted-foreground">멤버</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Community posts preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveModal("community")}
              className="w-full bg-card rounded-3xl shadow-lg border border-border overflow-hidden text-left"
            >
              <div className="p-4 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground">실시간 커뮤니티</h3>
                  <span className="text-xs text-primary font-medium">전체보기 →</span>
                </div>
              </div>

              <div className="divide-y divide-border">
                {communityPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                        <span className="text-xl">{post.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground text-sm">{post.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                            {post.type}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-secondary/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {["🐕", "🦮", "🐶", "🐩"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span>+12,847명이 활동 중</span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
