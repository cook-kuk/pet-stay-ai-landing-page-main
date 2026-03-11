import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  BookHeart,
  House,
  MessageCircleHeart,
  PawPrint,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const primaryNav: NavItem[] = [
  { href: '/dashboard', label: '홈', icon: House },
  { href: '/routine', label: '루틴', icon: Sparkles },
  { href: '/chat', label: '챗봇', icon: Bot },
  { href: '/community', label: '커뮤니티', icon: Users },
  { href: '/shop', label: '샵', icon: ShoppingBag },
]

export const dashboardShortcuts: NavItem[] = [
  { href: '/report', label: '귀가 후 리포트', icon: BookHeart },
  { href: '/pet-profile', label: '펫 프로필', icon: PawPrint },
  { href: '/family', label: '가족 공유', icon: MessageCircleHeart },
  { href: '/settings', label: '설정', icon: Settings },
]