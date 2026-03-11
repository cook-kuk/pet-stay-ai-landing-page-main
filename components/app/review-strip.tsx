const reviews = [
  { name: '이소연', body: '테스트 결과만 보는 게 아니라 귀가 후 루틴까지 바로 이어져서 실제로 매일 열게 돼요.' },
  { name: '정현우', body: '성향 카드 저장하고 가족이랑 공유하니 산책 방식도 더 통일됐어요.' },
  { name: '박수민', body: '커뮤니티에서 같은 타입 보호자들 루틴을 따라해보니 확실히 덜 헤맸어요.' },
]

export function ReviewStrip() {
  return (
    <div className='grid gap-3'>
      {reviews.map((review) => (
        <div key={review.name} className='rounded-[24px] border border-border/70 bg-card p-4 shadow-sm'>
          <p className='text-sm leading-6 text-muted-foreground'>“{review.body}”</p>
          <p className='mt-3 text-xs font-semibold text-primary/70'>{review.name} · 베타 사용자</p>
        </div>
      ))}
    </div>
  )
}