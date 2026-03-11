export interface Env {
  OPENAI_API_KEY: string
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

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    const payload = await request.json()

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        instructions: systemPrompt,
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: JSON.stringify(payload),
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'OpenAI request failed' }), { status: 500 })
    }

    const data = await response.json() as { output_text?: string }
    const raw = data.output_text ?? '{}'

    return new Response(raw, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
}