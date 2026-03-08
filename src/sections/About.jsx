import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Terminal, Brain, Cpu } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'AI Automation', desc: 'Building LLM-powered agents and pipelines' },
  { icon: Terminal, label: 'n8n Expert', desc: 'Complex workflow design & deployment' },
  { icon: Cpu, label: 'API Integrations', desc: 'Connecting systems at scale' },
]

export default function About({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left — visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Profile card */}
          <div className={`relative rounded-3xl overflow-hidden p-8 ${darkMode ? 'bg-dark-800/60 border border-white/5' : 'bg-white border border-slate-200'} shadow-2xl`}>
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFB2] via-[#00C8FF] to-[#A78BFA]" />

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FFB2] to-[#00C8FF] flex items-center justify-center text-dark-900 font-display font-extrabold text-3xl shadow-lg shadow-[rgba(0,255,178,0.3)]">
                  M
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-800" />
              </div>
              <div>
                <div className={`font-display font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Muthukumar</div>
                <div className="text-[#00FFB2] text-sm font-mono">AI Automation Engineer</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>@ Automaitee</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div key={label} className={`flex items-center gap-4 p-3 rounded-xl ${darkMode ? 'bg-dark-700/50 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                  <div className="w-9 h-9 rounded-lg bg-[rgba(0,255,178,0.12)] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#00FFB2]" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold font-display ${darkMode ? 'text-white' : 'text-slate-800'}`}>{label}</div>
                    <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Company link */}
            <a
              href="https://automaitee.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 flex items-center gap-2 text-sm font-mono ${darkMode ? 'text-slate-500 hover:text-[#00FFB2]' : 'text-slate-500 hover:text-primary-600'} transition-colors duration-200 group`}
            >
              <span>automaitee.com</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#00FFB2] to-[#00C8FF] text-dark-900 text-xs font-display font-bold shadow-xl shadow-[rgba(0,255,178,0.3)] hidden lg:block"
          >
            🤖 AI First
          </motion.div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
            <span className="text-[#00FFB2] font-mono text-sm">about.me</span>
          </div>

          <h2 className={`font-display font-extrabold text-4xl md:text-5xl leading-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Automating the future,<br />
            <span className="gradient-accent">one workflow at a time</span>
          </h2>

          <div className={`space-y-4 text-base leading-relaxed font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>
              I'm an AI Automation Engineer at <a href="https://automaitee.com" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-[#00FFB2]' : 'text-primary-600'} font-medium hover:underline`}>Automaitee</a>,
              where I design and build intelligent automation systems that transform manual business processes into
              seamless, AI-powered workflows.
            </p>
            <p>
              My expertise spans <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>n8n workflow automation</strong>, AI agent development with OpenAI and
              other LLMs, REST API integrations, and backend automation pipelines. I thrive at the
              intersection of artificial intelligence and practical business automation.
            </p>
            <p>
              From building AI press meet assistants to CRM automation systems and intelligent chatbots,
              I focus on creating solutions that <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>actually save time and drive results</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-8">
            {['n8n', 'OpenAI', 'Node.js', 'React', 'REST APIs', 'AI Agents', 'Webhooks', 'Automation'].map(tag => (
              <span
                key={tag}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono ${
                  darkMode
                    ? 'bg-dark-700 border border-white/10 text-slate-400'
                    : 'bg-slate-100 border border-slate-200 text-slate-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
