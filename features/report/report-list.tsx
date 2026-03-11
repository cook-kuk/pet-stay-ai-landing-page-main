import type { Report } from '@/types/domain'

export function ReportList({ reports }: { reports: Report[] }) {
  return (
    <div className='space-y-3'>
      {reports.map((report) => (
        <article key={report.id} className='rounded-[28px] border border-border/70 bg-card p-4 shadow-sm'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-sm font-semibold'>{report.title}</p>
              <p className='mt-1 text-xs text-muted-foreground'>{new Date(report.createdAt).toLocaleDateString('ko-KR')}</p>
            </div>
            <div className='rounded-full bg-secondary px-3 py-1 text-sm font-semibold'>{report.score}점</div>
          </div>
          <p className='mt-3 text-sm leading-6 text-muted-foreground'>{report.content}</p>
        </article>
      ))}
    </div>
  )
}