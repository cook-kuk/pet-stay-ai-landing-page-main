'use server'

export async function shareProfileAction(input: { petId: string; destination: string }) {
  return {
    success: true,
    message: `${input.petId} 프로필 공유 링크가 ${input.destination} 채널로 준비되었어요.`,
  }
}