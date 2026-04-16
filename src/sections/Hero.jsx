import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

// Tech Icon SVGs as inline components
const TechIcons = {
  n8n: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#EA4B71" opacity="0.15"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#EA4B71" fontFamily="monospace">n8n</text>
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#10A37F" opacity="0.15"/>
      <path d="M20 8C13.37 8 8 13.37 8 20s5.37 12 12 12 12-5.37 12-12S26.63 8 20 8zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 17c-2.76 0-5.19-1.26-6.83-3.22.03-2.18 4.56-3.38 6.83-3.38s6.8 1.2 6.83 3.38C25.19 26.74 22.76 28 20 28z" fill="#10A37F" opacity="0.8"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#61DAFB" opacity="0.1"/>
      <ellipse cx="20" cy="20" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" fill="none" transform="rotate(0 20 20)"/>
      <ellipse cx="20" cy="20" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" fill="none" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" opacity="0.7" fill="none" transform="rotate(120 20 20)"/>
      <circle cx="20" cy="20" r="2.5" fill="#61DAFB"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#68A063" opacity="0.15"/>
      <path d="M20 8l-10 5.8v11.6L20 31.4l10-5.8V13.8L20 8z" fill="#68A063" opacity="0.2"/>
      <path d="M20 10.4L12.2 15v9.2l7.8 4.5 7.8-4.5V15L20 10.4z" stroke="#68A063" strokeWidth="1.2" fill="none"/>
      <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#68A063" fontFamily="monospace">Node</text>
    </svg>
  ),
  API: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#00FFB2" opacity="0.1"/>
      <rect x="8" y="14" width="24" height="12" rx="3" stroke="#00FFB2" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#00FFB2" fontFamily="monospace">API</text>
    </svg>
  ),
  Workflow: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#A78BFA" opacity="0.1"/>
      <circle cx="10" cy="20" r="3" fill="#A78BFA" opacity="0.8"/>
      <circle cx="20" cy="12" r="3" fill="#A78BFA" opacity="0.8"/>
      <circle cx="30" cy="20" r="3" fill="#A78BFA" opacity="0.8"/>
      <circle cx="20" cy="28" r="3" fill="#A78BFA" opacity="0.8"/>
      <line x1="13" y1="19" x2="17" y2="13.5" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6"/>
      <line x1="23" y1="13.5" x2="27" y2="19" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6"/>
      <line x1="27" y1="21" x2="23" y2="26.5" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6"/>
      <line x1="17" y1="26.5" x2="13" y2="21" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#F59E0B" opacity="0.1"/>
      <path d="M20 10 L28 16 L28 24 L20 30 L12 24 L12 16 Z" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <circle cx="20" cy="20" r="3" fill="#F59E0B" opacity="0.8"/>
      <line x1="20" y1="10" x2="20" y2="13" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="28" y1="16" x2="25.5" y2="17.5" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="28" y1="24" x2="25.5" y2="22.5" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="20" y1="30" x2="20" y2="27" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="12" y1="24" x2="14.5" y2="22.5" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
      <line x1="12" y1="16" x2="14.5" y2="17.5" stroke="#F59E0B" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="40" height="40" rx="10" fill="#F05033" opacity="0.12"/>
      <path d="M31 19.5l-11-11a1.7 1.7 0 00-2.4 0l-2.4 2.4 3 3a2 2 0 012.5 2.5l2.9 2.9a2 2 0 11-1.2 1.2l-2.7-2.7v7.1a2 2 0 11-1.6 0V17.7a2 2 0 01-1.1-2.6l-2.9-3L9 15.5a1.7 1.7 0 000 2.4l11 11a1.7 1.7 0 002.4 0l8.6-8.6a1.7 1.7 0 000-2.4z" fill="#F05033" opacity="0.7"/>
    </svg>
  ),
}

const floatingIcons = [
  { Icon: TechIcons.n8n, x: '8%', y: '20%', size: 52, delay: 0, duration: 7, label: 'n8n' },
  { Icon: TechIcons.OpenAI, x: '85%', y: '15%', size: 56, delay: 1.2, duration: 8.5, label: 'OpenAI' },
  { Icon: TechIcons.React, x: '15%', y: '70%', size: 48, delay: 0.5, duration: 6.5, label: 'React' },
  { Icon: TechIcons.NodeJS, x: '80%', y: '72%', size: 50, delay: 2, duration: 9, label: 'Node.js' },
  { Icon: TechIcons.API, x: '5%', y: '45%', size: 44, delay: 1.8, duration: 7.5, label: 'API' },
  { Icon: TechIcons.Workflow, x: '90%', y: '44%', size: 48, delay: 0.8, duration: 8, label: 'Workflow' },
  { Icon: TechIcons.AI, x: '70%', y: '10%', size: 46, delay: 3, duration: 7.2, label: 'AI' },
  { Icon: TechIcons.Git, x: '25%', y: '85%', size: 44, delay: 1.5, duration: 8.8, label: 'Git' },
  { Icon: TechIcons.n8n, x: '60%', y: '82%', size: 40, delay: 2.5, duration: 6.8, label: 'n8n' },
  { Icon: TechIcons.OpenAI, x: '40%', y: '5%', size: 42, delay: 0.3, duration: 9.5, label: 'OpenAI' },
]

function FloatingIcon({ Icon, x, y, size, delay, duration, label, mouseX, mouseY }) {
  const parallaxStrength = 0.02

  return (
    <motion.div
      className="floating-icon"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.7, 0.9, 0.7],
        scale: [0.8, 1, 1.05, 1],
        y: [0, -18, 4, -10, 0],
        x: [0, 8, -6, 4, 0],
        rotate: [0, 3, -2, 1, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay },
        scale: { duration: 1.5, delay },
        y: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: duration * 1.3, delay: delay + 0.5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: duration * 0.8, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="relative group"
        style={{ width: size, height: size }}
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            boxShadow: [
              '0 0 15px rgba(0,255,178,0.15)',
              '0 0 30px rgba(0,255,178,0.3)',
              '0 0 15px rgba(0,255,178,0.15)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              '0 0 8px rgba(0,255,178,0.08)',
              '0 0 20px rgba(0,255,178,0.2)',
              '0 0 8px rgba(0,255,178,0.08)',
            ],
          }}
          transition={{ duration: duration * 0.6, delay, repeat: Infinity }}
        />
        <Icon />
        {/* Label tooltip */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-[rgba(0,255,178,0.5)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero({ darkMode }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className={`absolute inset-0 ${darkMode ? 'bg-grid-dark' : 'bg-grid-light'} bg-grid opacity-60`}
      />

      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(0,255,178,0.25) 0%, transparent 70%)' }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.4) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map((icon, i) => (
        <FloatingIcon key={i} {...icon} mouseX={mouseX} mouseY={mouseY} />
      ))}

      {/* Particle dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 10}s`,
              '--drift': `${(Math.random() - 0.5) * 100}px`,
              width: Math.random() > 0.7 ? '3px' : '2px',
              height: Math.random() > 0.7 ? '3px' : '2px',
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono ${
            darkMode
              ? 'border-[rgba(0,255,178,0.3)] bg-[rgba(0,255,178,0.06)] text-[#00FFB2]'
              : 'border-primary-300 bg-primary-50 text-primary-700'
          }`}>
            <Sparkles size={12} />
            <span>Full Stack Dev · AI Automation Developer · Automaitee</span>
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-[#00FFB2]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants}>
          <h1 className={`font-display font-extrabold text-6xl md:text-8xl lg:text-9xl leading-none mb-4 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Muthu
            <br />
            <span className="gradient-accent">kumar</span>
          </h1>
        </motion.div>

        {/* Role & description */}
        <motion.div variants={itemVariants}>
          <p className={`font-body text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Full Stack Developer & AI Automation Developer. Building intelligent workflows,
            agents, and integrations that transform how businesses operate — from idea to{' '}
            <span className={darkMode ? 'text-[#00FFB2]' : 'text-primary-600'}>production</span>.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary group"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Stats row */}
        {/* <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 md:gap-12 mt-16">
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '6+', label: 'Projects Shipped' },
            { value: '8.6', label: 'MCA CGPA' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className={`font-display font-bold text-2xl md:text-3xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {value}
              </div>
              <div className={`text-xs font-mono mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{label}</div>
            </div>
          ))}
        </motion.div> */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${darkMode ? 'text-slate-500 hover:text-[#00FFB2]' : 'text-slate-400 hover:text-primary-600'} transition-colors duration-300`}
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
