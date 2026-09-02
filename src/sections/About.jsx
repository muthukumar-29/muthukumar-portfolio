import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Terminal, Brain, Cpu } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'AI Automation', desc: 'Building LLM-powered agents and pipelines' },
  { icon: Terminal, label: 'n8n Workflows', desc: 'Complex automation design & deployment' },
  { icon: Cpu, label: 'Full Stack Apps', desc: 'MERN stack & API integrations' },
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
          <div className={`relative rounded-3xl overflow-hidden p-5 sm:p-8 ${darkMode ? 'bg-dark-800/60 border border-white/5' : 'bg-white border border-slate-200'} shadow-2xl`}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFB2] via-[#00C8FF] to-[#A78BFA]" />

            {/* Avatar row */}
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00FFB2] to-[#00C8FF] flex items-center justify-center text-dark-900 font-display font-extrabold text-2xl sm:text-3xl shadow-lg shadow-[rgba(0,255,178,0.3)]">
                  M
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-400 border-2 border-dark-800" />
              </div>
              <div>
                <div className={`font-display font-bold text-lg sm:text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Muthukumar M</div>
                <div className="text-[#00FFB2] text-xs sm:text-sm font-mono">Automation Specialist</div>
                <div className={`text-[11px] sm:text-xs mt-1 font-mono ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Rajapalayam, India · On-site</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-6">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div key={label} className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl ${darkMode ? 'bg-dark-700/50 border border-white/5' : 'bg-slate-50 border border-slate-200'}`}>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[rgba(0,255,178,0.12)] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#00FFB2]" />
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-semibold font-display ${darkMode ? 'text-white' : 'text-slate-800'}`}>{label}</div>
                    <div className={`text-[11px] sm:text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Links row */}
            <div className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
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

          <h2 className={`font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Developer. Builder.<br />
            <span className="gradient-accent">Automation Specialist.</span>
          </h2>

          <div className={`space-y-4 text-base leading-relaxed font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>
              I'm <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>Muthukumar M</strong>, an Automation Specialist at{' '}
              <a href="https://selfera.co.uk" target="_blank" rel="noopener noreferrer"
                className={`font-medium hover:underline ${darkMode ? 'text-[#00FFB2]' : 'text-primary-600'}`}>
                Selfera Pvt Ltd
              </a> based on-site in Rajapalayam, India. I hold an MCA (Master of Computer Applications) from <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>Ayya Nadar Janaki Ammal College, Sivakasi</strong>.
            </p>
            <p>
              I design and deploy AI-driven automation workflows, intelligent agents, scalable full-stack web applications, and backend integrations.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
