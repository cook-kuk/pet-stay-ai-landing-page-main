"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "./app-context"

const demoVideos = [
  {
    id: "1",
    title: "활동 의존형 강아지 예시",
    description: "에너지 넘치고 보호자와 함께하는 것을 좋아하는 활동 의존형",
    youtubeId: "T6wGPX0Df0U",
    thumbnail: "https://img.youtube.com/vi/T6wGPX0Df0U/maxresdefault.jpg",
    type: "활동 의존형",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "2",
    title: "독립 탐험형 강아지 예시",
    description: "호기심 많고 혼자서도 잘 노는 독립 탐험형",
    youtubeId: "gnjMKFWMraY",
    thumbnail: "https://img.youtube.com/vi/gnjMKFWMraY/maxresdefault.jpg",
    type: "독립 탐험형",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "3",
    title: "안정 애착형 강아지 예시",
    description: "차분하고 보호자에게 깊은 애착을 보이는 안정 애착형",
    youtubeId: "Ws3scZdpnzc",
    thumbnail: "https://img.youtube.com/vi/Ws3scZdpnzc/maxresdefault.jpg",
    type: "안정 애착형",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "4",
    title: "사교 활발형 강아지 예시",
    description: "다른 강아지나 사람들과 어울리기 좋아하는 사교 활발형",
    youtubeId: "yw7pZuxvQtI",
    thumbnail: "https://img.youtube.com/vi/yw7pZuxvQtI/maxresdefault.jpg",
    type: "사교 활발형",
    color: "from-pink-500 to-rose-500",
  },
]

export function VideoDemoSection() {
  const { setActiveModal } = useApp()
  const [selectedVideo, setSelectedVideo] = useState<typeof demoVideos[0] | null>(null)
  const [isMuted, setIsMuted] = useState(true)

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
            Video Examples
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            실제 강아지들의
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              성격유형 분석 예시
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            다양한 성격유형의 강아지들이 어떻게 행동하는지 영상으로 확인해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {demoVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-muted shadow-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${video.color} flex items-center justify-center shadow-lg`}
                  >
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </motion.div>
                </div>

                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${video.color} text-white text-xs font-semibold`}>
                    {video.type}
                  </span>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{video.title}</h3>
                  <p className="text-white/70 text-xs line-clamp-2">{video.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Phone frame */}
                <div className="bg-foreground rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden">
                    {/* Header */}
                    <div className={`h-12 bg-gradient-to-r ${selectedVideo.color} flex items-center justify-between px-6`}>
                      <span className="text-white font-semibold text-sm">{selectedVideo.type}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-white" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedVideo(null)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Video */}
                    <div className="aspect-[9/16] bg-foreground">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${selectedVideo.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2">{selectedVideo.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{selectedVideo.description}</p>
                      <Button
                        className={`w-full bg-gradient-to-r ${selectedVideo.color} text-white rounded-2xl`}
                        onClick={() => {
                          setSelectedVideo(null)
                          setActiveModal("video-test")
                        }}
                      >
                        우리 강아지도 검사하기
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
