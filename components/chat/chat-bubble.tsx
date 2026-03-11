import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types/domain'

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant'
  return (
    <div className={cn('max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm', isAssistant ? 'bg-card text-foreground' : 'ml-auto bg-primary text-primary-foreground')}>
      <p>{message.text}</p>
      {message.chips?.length ? (
        <div className='mt-3 flex flex-wrap gap-2'>
          {message.chips.map((chip) => (
            <span key={chip} className={cn('rounded-full px-3 py-1 text-xs font-medium', isAssistant ? 'bg-secondary text-secondary-foreground' : 'bg-white/20 text-white')}>
              {chip}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}