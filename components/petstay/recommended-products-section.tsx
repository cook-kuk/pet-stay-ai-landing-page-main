"use client"

import { motion } from "framer-motion"
import { Star, ShoppingBag, ChevronRight, ArrowRight } from "lucide-react"
import { useApp } from "./app-context"
import { purposeBasedProducts } from "./global-modal"

const categories = [
  { 
    id: "anxious", 
    label: "예민센서 케어", 
    emoji: "🦋", 
    description: "예민하고 불안한 아이들의 마음을 달래줄 아이템",
    gradient: "from-violet-400 to-purple-400",
    types: ["예민센서", "껌딱지러버", "흥분부스터"]
  },
  { 
    id: "explorer", 
    label: "혼놀탐험가 키트", 
    emoji: "🔍", 
    description: "탐험과 두뇌 자극이 필요한 똑똑이들을 위한 상품",
    gradient: "from-amber-400 to-orange-400",
    types: ["혼놀탐험가", "집안탐사대", "소파감시자", "간식헌터"]
  },
  { 
    id: "energy", 
    label: "에너지폭죽 세트", 
    emoji: "🚀", 
    description: "지칠 줄 모르는 체력 괴물들을 위한 필수템",
    gradient: "from-red-500 to-orange-500",
    types: ["에너지폭죽", "산책엔진", "모험본능러"]
  },
  { 
    id: "attached", 
    label: "사랑직진러 번들", 
    emoji: "💕", 
    description: "보호자와의 유대감이 최고인 아이들을 위한 상품",
    gradient: "from-pink-400 to-rose-400",
    types: ["사랑직진러", "기다림장인", "관심수집가"]
  },
]

export function RecommendedProductsSection() {
  const { setActiveModal, setSelectedShopType } = useApp()

  const handleCategoryClick = (categoryId: string) => {
    setSelectedShopType(categoryId)
    setActiveModal("shop")
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Purpose-Based Shopping
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            유형별 추천 아이템
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            성격유형에 맞는 목적 기반 상품 추천. 우리 아이에게 딱 맞는 아이템을 찾아보세요.
          </p>
        </motion.div>

        {/* Category cards with products preview */}
        <div className="space-y-8">
          {categories.map((category, catIndex) => {
            const products = purposeBasedProducts[category.id] || []
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                {/* Category header */}
                <div className={`bg-gradient-to-r ${category.gradient} p-4 md:p-6`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white">{category.label}</h3>
                      <p className="text-white/80 text-sm">{category.description}</p>
                    </div>
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="hidden sm:flex items-center gap-1 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      전체 보기 <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Products preview */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {products.slice(0, 4).map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="bg-secondary/50 rounded-xl p-3 cursor-pointer group"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <div className="w-full aspect-square bg-background rounded-lg flex items-center justify-center text-3xl mb-3 group-hover:scale-105 transition-transform">
                          {product.emoji}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 flex-wrap">
                            {product.bestseller && (
                              <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">BEST</span>
                            )}
                            <span className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[10px] rounded">{product.tag}</span>
                          </div>
                          <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{product.reason}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-foreground">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary text-sm">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile view all button */}
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="sm:hidden w-full mt-4 py-3 bg-secondary text-foreground rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    {category.label} 상품 전체 보기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setActiveModal("shop")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-primary/25 transition-shadow"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            전체 맞춤 상품 보기
          </button>
          <p className="text-sm text-muted-foreground mt-3">
            성격유형 검사 완료 시 추가 5% 할인
          </p>
        </motion.div>
      </div>
    </section>
  )
}
