import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'AI & Automation',
    color: '#00FFB2',
    icon: '🤖',
    skills: ['n8n Workflows', 'OpenAI API', 'AI Agents', 'LLM Pipelines', 'Prompt Engineering'],
  },
  {
    title: 'Frontend',
    color: '#61DAFB',
    icon: '⚛️',
    skills: ['React JS', 'Angular', 'HTML / CSS / JS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    color: '#68A063',
    icon: '⚙️',
    skills: ['Express.js', 'PHP', 'Python', 'Java', 'REST APIs'],
  },
  {
    title: 'Database',
    color: '#F59E0B',
    icon: '🗄️',
    skills: ['MongoDB', 'MySQL', 'Firebase'],
  },
  {
    title: 'Tools & DevOps',
    color: '#A78BFA',
    icon: '🛠️',
    skills: ['Git / GitHub', 'VS Code', 'Postman', 'Docker'],
  },
]

function SkillChip({ name, color, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        background: `${color}14`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {name}
    </motion.span>
  )
}

export default function Skills({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className={`section-padding ${darkMode ? 'bg-dark-800/30' : 'bg-slate-100/50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
            <span className="text-[#00FFB2] font-mono text-sm">skills.json</span>
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
          </div>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Technical Expertise
          </h2>
          <p className={`mt-4 text-base max-w-xl mx-auto font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Full-stack foundation with a specialisation in AI automation and workflow engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`tech-card ${darkMode ? 'bg-dark-800/50' : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-xl'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${cat.color}50, ${cat.color}, ${cat.color}50)` }} />

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <h3 className={`font-display font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <SkillChip
                    key={skill}
                    name={skill}
                    color={cat.color}
                    delay={inView ? i * 0.05 + j * 0.06 : 0}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <div className={`border-y py-4 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...Array(2)].map((_, repeat) =>
                ['n8n', 'OpenAI', 'React', 'Express.js', 'PHP', 'Python', 'MongoDB', 'MySQL', 'Git', 'REST API', 'AI Agents'].map(tech => (
                  <span key={`${tech}-${repeat}`} className={`inline-flex items-center gap-2 text-sm font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] opacity-60" />
                    {tech}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
