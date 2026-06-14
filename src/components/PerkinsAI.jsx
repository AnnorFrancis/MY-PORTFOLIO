import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'react-feather'

const WHATSAPP = '233538713916'
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg || 'Hi Perkins, I found you through your website.')}`

// Lightweight on-brand concierge. Matches intent by keywords and replies with
// a helpful answer + a next step. Also a live demo of the AI chatbots Perkins builds.
const KB = [
  {
    keys: ['website', 'web', 'site', 'web app', 'ecommerce', 'e-commerce', 'landing'],
    reply:
      'Websites are the flagship. I build premium, mobile-ready sites, web apps and online stores with React & Next.js — from a one-page launch (₵800) to full business sites (₵2,500+) and custom web apps (₵5,000+). Want a quick recommendation for your project?',
    cta: 'Discuss my website',
  },
  {
    keys: ['ai', 'automation', 'chatbot', 'bot', 'automate'],
    reply:
      "You're talking to one right now 🙂 I build custom AI assistants, WhatsApp & website chatbots, and workflow automations that save businesses hours every week. Setups start around ₵1,500 plus an optional monthly care plan. Want one like this for your business?",
    cta: 'Get an AI assistant',
  },
  {
    keys: ['design', 'flyer', 'brand', 'logo', 'graphic', 'poster', 'card'],
    reply:
      'I design flyers, brand identity kits, social graphics and business cards with a premium, gold-standard look. Single designs from ₵80; full brand starter kits from ₵600. What are you looking to create?',
    cta: 'Start a design',
  },
  {
    keys: ['writing', 'cv', 'resume', 'sop', 'statement', 'thesis', 'essay', 'research', 'academic', 'application'],
    reply:
      'I write and edit CVs, cover letters, SOPs, personal statements, research papers and theses — backed by a Philosophy & Political Science degree. CV + cover letter from ₵200; SOPs from ₵300. What do you need help with?',
    cta: 'Get writing help',
  },
  {
    keys: ['video', 'birthday', 'anniversary', 'wedding', 'reel', 'promo'],
    reply:
      'I create custom celebration and promo videos — birthdays, anniversaries, weddings and business reels — emotional, polished and shareable. Want one made for an occasion or your brand?',
    cta: 'Order a video',
  },
  {
    keys: ['social', 'marketing', 'instagram', 'facebook', 'ads', 'meta', 'manage'],
    reply:
      'I run done-for-you social media management & Meta/Instagram ads on a monthly basis (₵600–₵2,500/mo) so your business stays visible and grows. Want a plan for your pages?',
    cta: 'Grow my socials',
  },
  {
    keys: ['it', 'tech', 'repair', 'laptop', 'windows', 'network', 'support', 'computer'],
    reply:
      'I handle Windows installs, laptop/desktop maintenance, networking and remote support — one-off fixes from ₵80 or small-business IT retainers monthly. What do you need sorted?',
    cta: 'Get IT support',
  },
  {
    keys: ['tutor', 'tutoring', 'exam', 'lesson', 'teach', 'study'],
    reply:
      'I tutor university students in Philosophy, Political Science, Sociology and Psychology — 1-on-1, exam prep and research coaching, in person or online. Want to book a session?',
    cta: 'Book tutoring',
  },
  {
    keys: ['price', 'pricing', 'cost', 'how much', 'rate', 'budget', 'fee'],
    reply:
      'Pricing is transparent and package-based. Websites ₵800–₵15,000 · Design ₵80–₵600 · AI chatbots ₵1,500+ · Social media ₵600–₵2,500/mo · Writing ₵150–₵400. Tell me your project and I&apos;ll point you to the right package.',
    cta: 'See full pricing',
    scrollTo: '#pricing',
  },
  {
    keys: ['contact', 'whatsapp', 'email', 'call', 'reach', 'human', 'talk', 'person'],
    reply:
      "Of course — you can reach Francis directly on WhatsApp at +233 538 713 916 or by email. Tap below and let's talk.",
    cta: 'Chat on WhatsApp',
  },
  {
    keys: ['hi', 'hello', 'hey', 'good', 'morning', 'afternoon', 'evening', 'yo'],
    reply:
      'Hi there! 👋 I&apos;m Perkins AI. I can help with websites, AI automation, branding & design, video, writing, social media, IT and tutoring. What are you working on?',
  },
]

const FALLBACK =
  "Great question! Perkins covers websites, AI automation, branding & design, video, academic writing, social media, IT support and tutoring. Tell me a bit more, or tap a topic below — or chat with Francis directly on WhatsApp."

const QUICK = [
  'What services do you offer?',
  'How much for a website?',
  'Tell me about AI chatbots',
  'Talk to a human',
]

function matchReply(text) {
  const t = text.toLowerCase()
  if (t.includes('service') || t.includes('what do you') || t.includes('everything') || t.includes('offer')) {
    return {
      reply:
        'Perkins is a full creative & digital department in one place: ① Websites & web apps ② AI automation & chatbots ③ Branding & flyer design ④ Video & motion ⑤ Academic & professional writing ⑥ Social media management ⑦ IT support ⑧ Digital products ⑨ Tutoring. Which one interests you?',
    }
  }
  for (const item of KB) {
    if (item.keys.some((k) => t.includes(k))) return item
  }
  return { reply: FALLBACK }
}

export default function PerkinsAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi 👋 I&apos;m Perkins AI — your concierge. Ask me anything about websites, AI, design, writing or pricing. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, typing])

  const send = (text) => {
    const content = (text ?? input).trim()
    if (!content) return
    setMessages((m) => [...m, { from: 'user', text: content }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const res = matchReply(content)
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: res.reply, cta: res.cta, scrollTo: res.scrollTo }])
    }, 650)
  }

  const handleCta = (msg) => {
    if (msg.scrollTo) {
      document.querySelector(msg.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
      return
    }
    window.open(waLink(`Hi Perkins, ${msg.cta ? msg.cta.toLowerCase() : 'I have an enquiry'} — I came from your website.`), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[60] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
        style={{ backgroundImage: 'linear-gradient(120deg, #F1E2B4, #C9A24B 45%, #9A7B2E)' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : { boxShadow: ['0 0 0 0 rgba(201,162,75,0.5)', '0 0 0 14px rgba(201,162,75,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Open Perkins AI assistant"
      >
        {open ? <X size={26} className="text-dark" /> : <MessageCircle size={26} className="text-dark" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-5 z-[60] w-[92vw] max-w-[380px] rounded-2xl overflow-hidden border border-primary/30 bg-dark-card shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border-dark bg-dark">
              <img src="/perkins-logo.png" alt="Perkins" className="w-9 h-9" />
              <div className="flex-1">
                <div className="font-bold text-text-primary leading-tight" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  Perkins AI
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online — usually instant
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-4 py-4 space-y-3 h-[320px] overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-gold-gradient text-dark rounded-br-sm font-medium'
                        : 'bg-graphite text-text-primary rounded-bl-sm border border-border-dark'
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: m.text }} />
                    {m.cta && (
                      <button
                        onClick={() => handleCta(m)}
                        className="mt-2 block w-full text-center text-xs font-semibold px-3 py-2 rounded-lg bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-colors"
                      >
                        {m.cta} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-graphite border border-border-dark rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border-dark text-text-secondary hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 p-3 border-t border-border-dark bg-dark"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Perkins AI…"
                className="flex-1 bg-graphite border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-gold-gradient text-dark"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="text-center text-[10px] text-text-tertiary pb-2">Powered by Perkins AI · build one for your business</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
