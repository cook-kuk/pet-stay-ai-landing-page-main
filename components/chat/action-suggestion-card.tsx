import Link from 'next/link'
import type { AiActionSuggestion } from '@/types/ai'

export function ActionSuggestionCard({ suggestion }: { suggestion: AiActionSuggestion }) {
  return (
    <Link href={suggestion.href} className='block rounded-[22px] border border-border/70 bg-card p-4 shadow-sm'>
      <p className='text-sm font-semibold'>{suggestion.label}</p>
      <p className='mt-1 text-xs leading-5 text-muted-foreground'>{suggestion.description}</p>
    </Link>
  )
}