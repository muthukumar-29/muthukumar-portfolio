import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'

const experience = [
  {
    type: 'work',
    role: 'AI Automation Developer',
    org: 'Automaitee Digital',
    orgUrl: 'https://automaitee.com',
    period: 'December 2025 – Present',
    location: 'Remote',
    mode: 'Full Time',
    color: '#00FFB2',
    points: [
      'Designing and deploying AI-powered automation workflows using n8n',
      'Building intelligent AI agents integrated with OpenAI and other LLMs',
      'Creating webhook-driven pipelines and REST API integrations for clients',
      'Automating business processes end-to-end — from data ingestion to delivery',
    ],
  },
  {
    type: 'work',
    role: 'Full Stack Developer',
    org: 'Anjana Infotech',
    period: 'May 2023 – November 2025',
    location: 'Rajapalayam, India',
    mode: 'Part Time',
    color: '#00C8FF',
    points: [
      'Built production web applications using the MERN and MEAN stack',
      'Developed and maintained client-facing frontends with React and Angular',
      'Designed REST APIs and backend services with Node.js and Express',
      'Delivered e-commerce platforms, admin dashboards, and business tools',
    ],
  },
]

const education = [
  {
    degree: 'MCA — Master of Computer Applications',
    institution: 'Ayya Nadar Janaki Ammal College',
    period: '2024 – 2026',
    location: 'Sivakasi, India',
    grade: 'CGPA: 8.6',
    color: '#A78BFA',
  },
  {
    degree: 'B.Sc Computer Science',
    institution: 'Ayya Nadar Janaki Ammal College',
    period: '2021 – 2024',
    location: 'Sivakasi, India',
    grade: 'CGPA: 8.0',
    color: '#00C8FF',
  },
  {
    degree: 'HSC — Higher Secondary Certificate',
    institution: 'PACM Boys Higher Secondary School',
    period: '2019 – 2021',
    location: 'Rajapalayam, India',
    grade: 'Percentage: 86.6%',
    color: '#00FFB2',
  },
  {
    degree: 'SSLC — Secondary School Certificate',
    institution: 'PACM Boys Higher Secondary School',
    period: '2018 – 2019',
    location: 'Rajapalayam, India',
    grade: 'Percentage: 76.1%',
    color: '#F59E0B',
  },
]

function TimelineItem({ item, index, darkMode, isLast }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {!isLast && (
        <div className={`absolute left-[11px] top-8 bottom-0 w-px ${darkMode ? 'bg-white/5' : 'bg-slate-200'}`} />
      )}
      <div
        className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: item.color, background: `${item.color}18` }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
      </div>

      <div className={`mb-8 p-5 rounded-2xl border transition-all duration-300 ${
        darkMode
          ? 'border-white/5 bg-dark-800/50 hover:border-[rgba(0,255,178,0.15)]'
          : 'border-slate-200 bg-white hover:border-primary-200 hover:shadow-md'
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className={`font-display font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {item.role || item.degree}
            </h3>
            {item.orgUrl ? (
              <a href={item.orgUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#00FFB2] text-sm font-mono mt-0.5 hover:underline inline-block">
                {item.org}
              </a>
            ) : (
              <p className="text-[#00FFB2] text-sm font-mono mt-0.5">{item.org || item.institution}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`flex items-center gap-1.5 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Calendar size={11} />
              {item.period}
            </div>
            {item.mode && (
              <span className="mt-1 inline-block text-xs font-mono px-2 py-0.5 rounded-full"
                style={{ background: `${item.color}18`, color: item.color }}>
                {item.mode}
              </span>
            )}
            {item.grade && (
              <div className={`mt-1 text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.grade}</div>
            )}
          </div>
        </div>

        <div className={`flex items-center gap-1.5 text-xs font-mono mb-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <MapPin size={11} />
          {item.location}
        </div>

        {item.points && (
          <ul className="space-y-1.5">
            {item.points.map((pt, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className={`section-padding ${darkMode ? 'bg-dark-800/30' : 'bg-slate-100/50'}`}>
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
            <span className="text-[#00FFB2] font-mono text-sm">experience.log</span>
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
          </div>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Experience & Education
          </h2>
          <p className={`mt-4 text-base max-w-xl mx-auto font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-[rgba(0,255,178,0.12)] flex items-center justify-center">
                <Briefcase size={16} className="text-[#00FFB2]" />
              </div>
              <h3 className={`font-display font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Work Experience</h3>
            </motion.div>

            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} darkMode={darkMode} isLast={i === experience.length - 1} />
            ))}
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-[rgba(167,139,250,0.12)] flex items-center justify-center">
                <GraduationCap size={16} className="text-[#A78BFA]" />
              </div>
              <h3 className={`font-display font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>Education</h3>
            </motion.div>

            {education.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} darkMode={darkMode} isLast={i === education.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
