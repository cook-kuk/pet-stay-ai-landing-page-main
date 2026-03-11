export function QuickReplyChip({ label }: { label: string }) {
  return <button className='rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-foreground'>{label}</button>
}