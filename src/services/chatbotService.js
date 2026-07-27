import { portfolio, projects, skills, timeline } from '../data/portfolioData'

// Read API key from Vite environment variables. If you plan to call a real AI API,
// prefer a server-side proxy to keep the key secret instead of exposing it in the frontend.
const CHATBOT_API_KEY = import.meta.env.VITE_CHATBOT_API_KEY || null

/*
To connect a real AI API later, create a serverless function (for example on Vercel or Netlify)
that calls the AI API using an environment variable for the API key, then update getBotResponse()
to fetch from that endpoint instead of using canned responses. Never call the AI API directly
from the frontend with an exposed API key.
*/

const lowerCaseIncludes = (message, keywords) =>
  keywords.some((keyword) => message.includes(keyword))

export async function getBotResponse(userMessage) {
  // Try server-side Gemini proxy first (more accurate and secure)
  try {
    const proxyBase = import.meta.env.VITE_CHATBOT_PROXY_URL || '' // e.g. 'http://localhost:5174' or empty to use relative '/api'
    const apiPath = proxyBase ? `${proxyBase.replace(/\/$/, '')}/api/chat` : '/api/chat'
    const resp = await fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, resume: { portfolio, projects, skills, timeline } }),
    })
    if (resp.ok) {
      const data = await resp.json()
      if (data?.reply) return data.reply
    }
  } catch (err) {
    // server might not be running locally — fallback to local resume-based answers
    console.warn('Chat proxy unavailable, using local resume fallback', err)
  }

  // Local deterministic fallback (same logic as before) — quick, non-LLM answers
  const message = userMessage.toLowerCase()

  if (lowerCaseIncludes(message, ['who are you', 'what is your name', "what's your name"])) {
    return `${portfolio.name} — ${portfolio.role} based in ${portfolio.location}. ${portfolio.intro}`
  }

  if (lowerCaseIncludes(message, ['tell me about yourself', 'about you', 'summary'])) {
    return portfolio.about
  }

  if (lowerCaseIncludes(message, ['skill', 'skills', 'tech', 'stack', 'know', 'technologies'])) {
    return `Technical skills: ${skills.join(', ')}.`
  }

  if (lowerCaseIncludes(message, ['project', 'projects', 'work', 'portfolio'])) {
    return projects.map((p) => `${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')
  }

  if (lowerCaseIncludes(message, ['experience', 'intern', 'work history', 'role'])) {
    return timeline
      .filter((t) => t.label.toLowerCase() === 'experience' || t.label.toLowerCase() === 'awards')
      .map((t) => `${t.title} — ${t.organization} (${t.dateRange}): ${t.description}`)
      .join('\n')
  }

  if (lowerCaseIncludes(message, ['education', 'school', 'degree', 'college'])) {
    const edu = timeline.find((t) => t.label.toLowerCase() === 'education')
    return edu ? `${edu.title} at ${edu.organization} (${edu.dateRange}): ${edu.description}` : 'No education info available.'
  }

  if (lowerCaseIncludes(message, ['contact', 'email', 'phone', 'linkedin', 'github', 'reach'])) {
    return `Contact — Email: ${portfolio.email}, Phone: ${portfolio.phone}. GitHub: ${portfolio.githubUrl}. LinkedIn: ${portfolio.linkedinUrl}.`
  }

  if (lowerCaseIncludes(message, ['available', 'availability', 'hire', 'open'])) {
    return portfolio.availability
  }

  const resumeHit = resumeSearch(message)
  if (resumeHit) return resumeHit

  return `Base na po ang sagot ko sa resume ni ${portfolio.name}. Pwede mo akong tanungin ng specific: skills, projects, experience, education, contact, o availability.`
}

function resumeSearch(message) {
  const fieldsToSearch = []
  fieldsToSearch.push(portfolio.name)
  fieldsToSearch.push(portfolio.role)
  fieldsToSearch.push(portfolio.location)
  fieldsToSearch.push(portfolio.intro)
  fieldsToSearch.push(portfolio.about)
  fieldsToSearch.push(portfolio.email)
  fieldsToSearch.push(portfolio.phone)
  projects.forEach((p) => fieldsToSearch.push(p.title, p.description, ...(p.techStack || [])))
  timeline.forEach((t) => fieldsToSearch.push(t.title, t.organization, t.description))
  skills.forEach((s) => fieldsToSearch.push(s))

  for (const text of fieldsToSearch) {
    if (!text) continue
    const lower = text.toLowerCase()
    if (message.split(' ').some((w) => lower.includes(w))) {
      return text
    }
  }

  return null
}