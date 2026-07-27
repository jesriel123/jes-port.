import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

// Basic CORS for local development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

const PORT = process.env.PORT || 5174

app.post('/api/chat', async (req, res) => {
  try {
    const { message, resume } = req.body || {}
    if (!message) return res.status(400).json({ error: 'message required' })

    console.log('Incoming /api/chat message:', message)

    const apiKey = process.env.GEMINI_API_KEY
    const apiUrl = process.env.GEMINI_API_URL
    const model = process.env.GEMINI_MODEL || 'gemini-1.5'

    if (!apiKey || !apiUrl) {
      return res.status(500).json({ error: 'GEMINI_API_KEY or GEMINI_API_URL not configured on server' })
    }

    // Build a system prompt that instructs the model to answer strictly from resume
    const systemPrompt = `You are a helpful assistant that answers only from the provided resume/context. If the answer is not present in the resume, reply in Filipino (Tagalog) with: "Hindi nakasaad sa resume." Be concise and factual.`

    const resumeContext = JSON.stringify(resume || {})

    const payload = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: `Resume context: ${resumeContext}` },
        { role: 'user', content: message },
      ],
      // optional: temperature: 0 for more deterministic answers
      temperature: 0,
    }

    console.log('Forwarding to Gemini API:', apiUrl, 'model:', model)
    const r = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    console.log('Gemini response status:', r.status)
    const data = await r.json()

    // Log a short excerpt of the response for debugging (no secrets)
    try {
      const excerpt = JSON.stringify(data).slice(0, 1000)
      console.log('Gemini response excerpt:', excerpt)
    } catch (e) {
      // ignore
    }

    // Try common response shapes (generic)
    let text = null
    if (data?.choices && data.choices[0]) {
      text = data.choices[0].message?.content || data.choices[0].text || null
    }
    if (!text && data?.output && data.output[0]) {
      // some APIs return output[0].content[0].text
      text = data.output[0].content?.map((c) => c.text).join('\n')
    }
    if (!text) text = JSON.stringify(data)

    return res.json({ reply: text })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'server error', detail: String(err) })
  }
})

app.listen(PORT, () => {
  console.log(`Chat proxy listening on http://localhost:${PORT}`)
})
