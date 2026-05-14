export default defineEventHandler(async (event) => {
  const body = await readBody<{
    message?: string
    location?: { name?: string; address?: string } | null
  }>(event)

  const message = String(body?.message ?? '').trim()
  if (!message) {
    throw createError({ statusCode: 400, statusMessage: 'message is required' })
  }

  const place = body?.location?.name ?? body?.location?.address ?? 'the selected place'

  return (
    `About ${place}: this is a stub response for “${message.slice(0, 200)}”. ` +
    'Replace this handler with your AI provider (OpenAI, Vertex, etc.).'
  )
})
