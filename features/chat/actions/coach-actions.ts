import { coachQuickActions } from '@/features/chat/mock/coach-data'
import type { CoachQuickAction } from '@/features/chat/types'

export function getCoachQuickActions(): CoachQuickAction[] {
  return coachQuickActions
}

export function findCoachAction(actionId: string) {
  return coachQuickActions.find((action) => action.id === actionId)
}