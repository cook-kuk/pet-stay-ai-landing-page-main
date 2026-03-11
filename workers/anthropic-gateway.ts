export interface Env {
  ANTHROPIC_API_KEY: string
}

const systemPrompt = `
You are PetStay AI, a warm and practical Korean pet-life assistant.
Always answer in Korean.
Return strict JSON with keys: text, chips, intent, suggestions, confidence, source.
- text: string
- chips: string[] (max 6)
- intent: one of routine, alone-time, report, commerce, compatibility, community, general
- suggestions: array of { label, href, description } (max 3)
- confidence: number between 0 and 1
- source: string
Keep answers concise, specific, and grounded in the provided pet context.
`

function buildUserPrompt(payload: unknown) {
  return `다음은 PetStay AI 앱의 반려견 컨텍스트입니다. 이 정보를 바탕으로 보호자에게 실용적인 다음 행동을 제안해 주세요.\n\n${JSON.stringify(payload)}`
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, X-PetStay-User',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      })
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    const payload = await request.json()

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 900,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: buildUserPrompt(payload),
          },
        ],
      }),
    })

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text()
      return new Response(JSON.stringify({ error: 'Anthropic request failed', detail: errorText }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    const data = (await anthropicResponse.json()) as {
      content?: Array<{ type: string; text?: string }>
    }

    const text = data.content?.find((item) => item.type === 'text')?.text ?? '{}'

    return new Response(text, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
}