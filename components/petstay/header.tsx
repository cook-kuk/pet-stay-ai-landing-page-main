"use client"

import { motion } from "framer-motion"
import { Dog, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Dog className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">PetStay AI</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#test" className="text-muted-foreground hover:text-foreground transition-colors">성격유형 검사</a>
          <a href="#types" className="text-muted-foreground hover:text-foreground transition-colors">16가지 유형</a>
          <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">커뮤니티</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-muted-foreground">로그인</Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-6">
            무료 시작하기
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4"
        >
          <nav className="flex flex-col gap-4">
            <a href="#test" className="text-foreground py-2">성격유형 검사</a>
            <a href="#types" className="text-foreground py-2">16가지 유형</a>
            <a href="#community" className="text-foreground py-2">커뮤니티</a>
            <hr className="border-border" />
            <Button variant="ghost" className="w-full justify-start">로그인</Button>
            <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full">
              무료 시작하기
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
