export function StatCard({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <div className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
      <p className='text-xs font-medium text-muted-foreground'>{title}</p>
      <p className='mt-2 text-2xl font-semibold'>{value}</p>
      <p className='mt-1 text-sm text-muted-foreground'>{caption}</p>
    </div>
  )
}