export async function parseJSONBody(req) {
  let body = ''

  for await (const chunk of req) {
    body += chunk.toString()
  }


  if (!body.trim()) {
    return {}
  }

  try {
    return JSON.parse(body)
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err.message}`)
  }
}