import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'AI & Automation',
    color: '#00FFB2',
    icon: '🤖',
    skills: [
      { name: 'n8n Workflows', level: 92 },
      { name: 'OpenAI API', level: 88 },
      { name: 'AI Agents', level: 85 },
      { name: 'Webhook Automation', level: 90 },
    ]
  },
  {
    title: 'Frontend',
    color: '#61DAFB',
    icon: '⚛️',
    skills: [
      { name: 'React JS', level: 88 },
      { name: 'HTML / CSS / JS', level: 90 },
      { name: 'Figma / Canva', level: 78 },
    ]
  },
  {
    title: 'Backend',
    color: '#68A063',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Laravel (PHP)', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'REST APIs', level: 88 },
    ]
  },
  {
    title: 'Database',
    color: '#F59E0B',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 82 },
      { name: 'MySQL', level: 80 },
      { name: 'Firebase', level: 72 },
    ]
  },
  {
    title: 'Tools & DevOps',
    color: '#A78BFA',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 85 },
    ]
  },
]

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono font-medium">{name}</span>
        <span className="text-xs font-mono opacity-60">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}90, ${color})` }}
        />
      </div>
    </div>
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
              className={`tech-card ${darkMode ? '' : 'bg-white border-slate-200 hover:border-primary-300'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${cat.color}50, ${cat.color}, ${cat.color}50)` }} />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className={`font-display font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h3>
              </div>
              <div className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                {cat.skills.map((skill, j) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} delay={i * 0.05 + j * 0.07} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden">
          <div className={`border-y py-4 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
            <div className="flex animate-marquee gap-8 whitespace-nowrap">
              {[...Array(2)].map((_, repeat) =>
                ['n8n', 'OpenAI', 'React', 'Node.js', 'Laravel', 'PHP', 'Python', 'MongoDB', 'MySQL', 'Git', 'Figma', 'REST API', 'Canva'].map(tech => (
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
