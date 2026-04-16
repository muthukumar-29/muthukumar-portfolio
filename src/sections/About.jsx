import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Terminal, Brain, Cpu } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'AI Automation', desc: 'Building LLM-powered agents and pipelines' },
  { icon: Terminal, label: 'n8n Workflows', desc: 'Complex automation design & deployment' },
  { icon: Cpu, label: 'Full Stack Dev', desc: 'MERN stack & API integrations' },
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
        {/* Left — profile card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className={`relative rounded-3xl overflow-hidden p-8 ${darkMode ? 'bg-dark-800/60 border border-white/5' : 'bg-white border border-slate-200'} shadow-2xl`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFB2] via-[#00C8FF] to-[#A78BFA]" />

            {/* Avatar row */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FFB2] to-[#00C8FF] flex items-center justify-center text-dark-900 font-display font-extrabold text-3xl shadow-lg shadow-[rgba(0,255,178,0.3)]">
                  M
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-800" />
              </div>
              <div>
                <div className={`font-display font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Muthukumar M</div>
                <div className="text-[#00FFB2] text-sm font-mono">AI Automation Developer</div>
                <div className={`text-xs mt-1 font-mono ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Rajapalayam, India · Remote-friendly</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-6">
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

            {/* Links row */}
            <div className={`flex items-center gap-4 pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
              {[
                { label: 'GitHub', href: 'https://github.com/muthukumar-29' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muthukumar29' },
                { label: 'LeetCode', href: 'https://leetcode.com/u/muthukumar_29/' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 text-xs font-mono transition-colors duration-200 group ${darkMode ? 'text-slate-500 hover:text-[#00FFB2]' : 'text-slate-400 hover:text-primary-600'}`}
                >
                  {label}
                  <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
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

        {/* Right — bio */}
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
            Developer. Builder.<br />
            <span className="gradient-accent">Automation Developer.</span>
          </h2>

          <div className={`space-y-4 text-base leading-relaxed font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>
              I'm <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>Muthukumar M</strong>, a Full Stack Developer and AI Automation
              Developer from Rajapalayam, India. I hold a B.Sc in Computer Science and have completed
              my MCA at Ayya Nadar Janaki Ammal College, Sivakasi.
            </p>
            <p>
              I work as an AI Automation Developer at{' '}
              <a href="https://automaitee.com" target="_blank" rel="noopener noreferrer"
                className={`font-medium hover:underline ${darkMode ? 'text-[#00FFB2]' : 'text-primary-600'}`}>
                Automaitee
              </a>
              , designing intelligent workflows, AI agents, and integrations that replace manual effort at scale.
              Before that, I spent over two years as a Full Stack Developer at{' '}
              <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>Anjana Infotech</strong>, building
              production web applications with the MERN and MEAN stack.
            </p>
            <p>
              I enjoy working across the full stack — from React frontends to Node.js APIs to database design —
              and I bring that engineering depth into every automation I build. Currently focused on the intersection of{' '}
              <span className={darkMode ? 'text-[#00FFB2]' : 'text-primary-600'}>LLMs and real-world workflow automation</span>.
            </p>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['n8n', 'React', 'Express.js', 'OpenAI', 'PHP', 'MongoDB', 'MySQL', 'Python', 'Git', 'REST API'].map(tag => (
              <span
                key={tag}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono ${darkMode ? 'bg-dark-700 border border-white/10 text-slate-400' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}
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
