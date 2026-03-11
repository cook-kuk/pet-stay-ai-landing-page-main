"use client"

import { motion } from "framer-motion"
import { Play, ArrowRight, Dog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "./app-context"

export function FinalCtaSection() {
  const { setActiveModal } = useApp()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-accent to-chart-5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-8 left-8 w-16 h-16 bg-background/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-3xl">🐕</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute bottom-8 right-8 w-16 h-16 bg-background/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          >
            <span className="text-3xl">🐾</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-1/2 right-12 w-12 h-12 bg-background/20 rounded-xl flex items-center justify-center backdrop-blur-sm hidden md:flex"
          >
            <span className="text-2xl">💕</span>
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
            >
              <Dog className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              우리 강아지 성향,
              <br className="hidden md:block" />
              이제 영상으로 확인하세요
            </h2>

            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8 text-pretty">
              성향 분석에서 끝나지 않고, 루틴 추천, 궁합, 커뮤니티까지 이어집니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setActiveModal("video-test")}
                className="bg-background text-primary hover:bg-background/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg active:scale-95 transition-transform"
              >
                <Play className="w-5 h-5 mr-2" />
                무료로 시작하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveModal("result-preview")}
                className="bg-transparent border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-6 text-lg active:scale-95 transition-transform"
              >
                데모 보기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-primary-foreground/60 text-sm mt-6">
              가입 없이 바로 시작 / 30초면 충분해요
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Dog className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">PetStay AI</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-4">
            <button onClick={() => setActiveModal("video-test")} className="hover:text-foreground transition-colors">서비스 소개</button>
            <a href="#" className="hover:text-foreground transition-colors">이용약관</a>
            <a href="#" className="hover:text-foreground transition-colors">개인정보처리방침</a>
            <button onClick={() => setActiveModal("chatbot")} className="hover:text-foreground transition-colors">고객센터</button>
          </div>

          <p className="text-xs text-muted-foreground">
            2024 PetStay AI. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
