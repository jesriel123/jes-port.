// Chatbot: floating assistant with rule-based responses and a mobile-friendly sheet.
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBotResponse } from '../services/chatbotService'

const createMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  text,
})

function Chatbot({ profile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    createMessage(
      'bot',
      `Hi, I am ${profile.name}'s assistant. Ask me about skills, projects, experience, education, or contact details.`,
    ),
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) {
      return
    }

    const userMessage = createMessage('user', trimmedInput)
    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 650))
    const response = await getBotResponse(trimmedInput)

    setMessages((current) => [...current, createMessage('bot', response)])
    setIsTyping(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:bg-teal-700 md:bottom-6 md:right-6"
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-teal-400" />
        Chat with me
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/20 p-0 backdrop-blur-sm md:inset-auto md:bottom-6 md:right-6 md:block md:bg-transparent md:p-0"
          >
            <div className="flex h-[100dvh] w-full flex-col border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] md:h-[38rem] md:w-[24rem] md:rounded-[2rem]">
              <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                    AI Assistant
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-950">{profile.name}</h2>
                  <p className="text-sm text-slate-500">{profile.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:text-teal-700"
                  aria-label="Close chat"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-5">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-slate-950 text-white'
                          : 'border border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {isTyping ? (
                  <div className="flex justify-start">
                    <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-end gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-2">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    rows="2"
                    className="min-h-[48px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    placeholder="Ask about skills, projects, or contact info..."
                  />
                  <button
                    type="submit"
                    className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!input.trim()}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Chatbot