"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ShoppingBag } from "lucide-react"
import { useApp } from "./app-context"
import { allPersonalityTypes } from "./global-modal"

const categoryLabels: Record<string, { label: string; color: string }> = {
  anxious: { label: "불안/예민", color: "bg-pink-100 text-pink-700" },
  explorer: { label: "탐험/호기심", color: "bg-emerald-100 text-emerald-700" },
  energy: { label: "에너지/활동", color: "bg-orange-100 text-orange-700" },
  attached: { label: "애착/교감", color: "bg-blue-100 text-blue-700" },
}

export function PersonalityTypesSection() {
  const { setActiveModal, setSelectedPersonality, setSelectedShopType } = useApp()
  const [filter, setFilter] = useState<string | null>(null)

  const handleTypeClick = (type: typeof allPersonalityTypes[0]) => {
    setSelectedPersonality(type)
    setActiveModal("personality-detail")
  }

  const filteredTypes = filter 
    ? allPersonalityTypes.filter(t => t.category === filter)
    : allPersonalityTypes

  return (
    <section id="types" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            16 Personality Types
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            우리 아이는 어떤 유형일까요?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI가 분석하는 16가지 강아지 성격유형. 카드를 클릭하면 상세 정보와 맞춤 상품을 확인할 수 있어요.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === null ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            전체 보기
          </button>
          {Object.entries(categoryLabels).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === key ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredTypes.map((type, index) => (
            <motion.button
              key={type.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTypeClick(type)}
              className="group text-left"
            >
              <div className="bg-card rounded-2xl p-4 shadow-md hover:shadow-xl transition-all h-full border border-border relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative">
                  {/* Category badge */}
                  {type.category && categoryLabels[type.category] && (
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium mb-2 ${categoryLabels[type.category].color}`}>
                      {categoryLabels[type.category].label}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                      <span className="text-lg">{type.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm truncate">
                        {type.name}
                      </h3>
                      {type.mbti && (
                        <span className="text-[10px] text-muted-foreground">{type.mbti}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-2">
                    {type.summary || type.traits}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {type.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hashtag for social sharing */}
                  {type.hashtag && (
                    <p className="text-[10px] text-primary font-medium truncate">{type.hashtag}</p>
                  )}

                  {/* Hover reveal actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-primary font-medium flex items-center">
                      자세히 보기 <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setActiveModal("video-test")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            우리 아이 성격유형 검사하기
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={() => setActiveModal("shop")}
            className="inline-flex items-center px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            유형별 맞춤 상품 보기
          </button>
        </motion.div>
      </div>
    </section>
  )
}
