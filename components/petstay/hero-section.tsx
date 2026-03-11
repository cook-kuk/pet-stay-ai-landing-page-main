"use client"

import { motion } from "framer-motion"
import { Play, Sparkles, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "./app-context"

export function HeroSection() {
  const { setActiveModal } = useApp()

  return (
    <section id="test" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI 기반 강아지 성격 분석
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
              영상으로 보는 우리 강아지
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                16가지 성격유형
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              우리 아이 성향 분석부터 견주 궁합, 챗봇 상담, 커뮤니티까지. 
              짧은 영상 하나로 우리 강아지의 성격을 알아보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => setActiveModal("video-test")}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
              >
                <Play className="w-5 h-5 mr-2" />
                영상으로 성격유형 검사하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveModal("result-preview")}
                className="rounded-full px-8 py-6 text-lg border-2 active:scale-95"
              >
                우리 아이 결과 예시 보기
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-muted border-2 border-background"
                    />
                  ))}
                </div>
                <span>12,847명 참여</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>4.9점</span>
              </div>
            </div>
          </motion.div>

          {/* Right content - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveModal("result-preview")}
                className="relative w-72 md:w-80 bg-foreground rounded-[3rem] p-3 shadow-2xl cursor-pointer"
              >
                <div className="bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-12 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <div className="w-20 h-6 bg-foreground/20 rounded-full" />
                  </div>

                  {/* Result card content */}
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center mb-4">
                        <span className="text-4xl">🐕</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">활동 의존형</h3>
                      <p className="text-sm text-muted-foreground mt-1">코코 / 포메라니안</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">에너지</span>
                        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">사회성</span>
                        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">안정감</span>
                        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {["#활발함", "#애착형", "#사교적"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl">
                      <Heart className="w-4 h-4 mr-2" />
                      결과 공유하기
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center"
              >
                <span className="text-2xl">🎯</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-card rounded-2xl shadow-lg flex items-center justify-center"
              >
                <span className="text-3xl">🐾</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
