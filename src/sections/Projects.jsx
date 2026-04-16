import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Healthy Farm',
    description: 'A mobile application that creates a direct connection between farmers and customers, eliminating intermediaries. Built with Android and Kotlin for a smooth, native experience.',
    tech: ['Android', 'Kotlin', 'Mobile'],
    category: 'Mobile App',
    color: '#68A063',
    github: 'https://github.com/muthukumar-29/HealthyFarm',
    demo: 'https://github.com/muthukumar-29/HealthyFarm',
    icon: '🌾',
  },
  {
    title: 'Frisch Für Sie — German Bakery',
    description: 'E-commerce application for a German bakery shop built with the MEAN stack. Contributed extensively on the frontend — product listings, cart, and checkout flows.',
    tech: ['MEAN Stack', 'Angular', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    color: '#F59E0B',
    github: '#',
    demo: 'https://frischfuersie.de/',
    icon: '🥐',
  },
  {
    title: 'E-Commerce Admin Panel',
    description: 'A comprehensive MERN stack admin dashboard covering users, products, orders, and real-time analytics. Includes full authentication and role-based access control.',
    tech: ['MERN Stack', 'React', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    color: '#00C8FF',
    github: 'https://github.com/muthukumar-29/ecommerce-admin',
    demo: 'https://github.com/muthukumar-29/ecommerce-admin',
    icon: '🛒',
  },
  {
    title: 'AI Messenger Automation Bot',
    description: 'Facebook Messenger bot with NLP-powered intent detection, automated response flows, real-time session management via Google Sheets, and n8n as the orchestration backbone.',
    tech: ['Facebook API', 'n8n', 'Node.js', 'OpenAI', 'Google Sheets'],
    category: 'AI Automation',
    color: '#00FFB2',
    github: 'https://github.com/muthukumar-29',
    demo: '#',
    icon: '🤖',
  },
  {
    title: 'Office CRM',
    description: 'A multi-platform CRM system comprising an Android mobile app (Kotlin), a Java Spring Boot AI backend, and a React + Vite admin dashboard. Manages leads, contacts, and internal workflows with Docker-ready deployment.',
    tech: ['React', 'Vite', 'Java', 'Spring Boot', 'Kotlin', 'Android'],
    category: 'Full Stack',
    color: '#EC4899',
    github: 'https://github.com/muthukumar-29/office-crm',
    demo: '#',
    icon: '📊',
  },
  // {
  //   title: 'CRM Automation System',
  //   description: 'End-to-end CRM pipeline with automated lead scoring, follow-up sequences, and real-time data sync. Built with n8n workflows connected to external APIs and dashboards.',
  //   tech: ['n8n', 'REST APIs', 'React', 'MongoDB', 'Node.js'],
  //   category: 'AI Automation',
  //   color: '#EC4899',
  //   github: 'https://github.com/muthukumar-29',
  //   demo: '#',
  //   icon: '📊',
  // },
]

const categories = ['All', 'AI Automation', 'Full Stack', 'Mobile App']

export default function Projects({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-[#00FFB2]" />
          <span className="text-[#00FFB2] font-mono text-sm">projects.list</span>
          <div className="w-8 h-0.5 bg-[#00FFB2]" />
        </div>
        <h2 className={`font-display font-extrabold text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Featured Work
        </h2>
        <p className={`mt-4 text-base max-w-xl mx-auto font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          From mobile apps and full-stack platforms to AI automation systems
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
              activeFilter === cat
                ? 'bg-[#00FFB2] text-dark-900 font-bold shadow-lg shadow-[rgba(0,255,178,0.3)]'
                : darkMode
                ? 'text-slate-400 border border-white/10 hover:border-[rgba(0,255,178,0.3)] hover:text-[#00FFB2]'
                : 'text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          {filtered.map((project, i) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`project-card group ${darkMode ? 'project-card-dark border-white/5' : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-xl'}`}
            >
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${project.color}18` }}>
                      {project.icon}
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${project.color}18`, color: project.color }}>
                      {project.category}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
                        onClick={e => e.stopPropagation()}>
                        <Github size={15} />
                      </a>
                    )}
                    {project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#00FFB2] hover:text-white transition-colors"
                        onClick={e => e.stopPropagation()}>
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className={`font-display font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
              </div>

              <div className={`px-6 pb-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} pt-4`}>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className={`text-xs font-mono px-2 py-1 rounded-lg ${darkMode ? 'bg-dark-700 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-12"
      >
        <a href="https://github.com/muthukumar-29" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex group">
          <Github size={16} />
          View All on GitHub
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </motion.div>
    </section>
  )
}
