import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Send, MapPin, Clock, CheckCircle, AlertCircle, X } from 'lucide-react'

const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:3001/api/contact'

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'muthukumarm.2903@gmail.com', href: 'mailto:muthukumarm.2903@gmail.com', color: '#00FFB2' },
  { icon: Github, label: 'GitHub', value: 'github.com/muthukumar-29', href: 'https://github.com/muthukumar-29', color: '#A78BFA' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/muthukumar29', href: 'https://www.linkedin.com/in/muthukumar29', color: '#0EA5E9' },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  else if (form.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'

  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'

  if (!form.subject.trim()) errors.subject = 'Subject is required'

  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters'

  return errors
}

function FieldError({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-rose-400 font-mono"
        >
          <AlertCircle size={11} />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export default function Contact({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value })
      setErrors(e => ({ ...e, [field]: newErrors[field] }))
    }
  }

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }))
    const newErrors = validate(form)
    setErrors(e => ({ ...e, [field]: newErrors[field] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Server error: ${res.status}`)

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please email me directly.')
    }
  }

  const inputClass = (field) => `
    w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200
    ${errors[field] && touched[field]
      ? darkMode
        ? 'bg-dark-700 border border-rose-500/50 text-white placeholder-slate-600 focus:border-rose-400/70'
        : 'bg-slate-50 border border-rose-300 text-slate-900 placeholder-slate-400 focus:border-rose-400'
      : darkMode
        ? 'bg-dark-700 border border-white/10 text-white placeholder-slate-600 focus:border-[rgba(0,255,178,0.4)]'
        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-300'
    }
  `

  return (
    <section id="contact" className={`section-padding ${darkMode ? 'bg-dark-800/30' : 'bg-slate-100/50'}`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
            <span className="text-[#00FFB2] font-mono text-sm">contact.init()</span>
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
          </div>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Let's Build Together
          </h2>
          <p className={`mt-4 text-base max-w-xl mx-auto font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Have an automation challenge? Let's discuss how AI can solve it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
                  darkMode
                    ? 'border-white/5 bg-dark-800/60 hover:border-[rgba(0,255,178,0.2)]'
                    : 'border-slate-200 bg-white hover:border-primary-200 hover:shadow-md'
                }`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className={`text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
                  <div className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{value}</div>
                </div>
              </a>
            ))}

            <div className={`p-4 rounded-2xl border ${darkMode ? 'border-white/5 bg-dark-800/60' : 'border-slate-200 bg-white'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>India (Remote-friendly)</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={13} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>IST (UTC+5:30) · Responds in 24h</span>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`lg:col-span-3 rounded-3xl border p-8 ${
              darkMode ? 'border-white/5 bg-dark-800/60' : 'border-slate-200 bg-white'
            } shadow-xl`}
          >
            <AnimatePresence mode="wait">

              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 rounded-full bg-[rgba(0,255,178,0.12)] flex items-center justify-center">
                      <CheckCircle size={40} className="text-[#00FFB2]" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#00FFB2]"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1, delay: 0.3, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>

                  <div>
                    <h3 className={`font-display font-bold text-2xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Message Sent!
                    </h3>
                    <p className={`text-sm max-w-xs mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Thanks for reaching out. Check your inbox — a confirmation email is on its way. I'll reply within 24 hours.
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono ${
                    darkMode ? 'bg-dark-700 text-slate-500' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <motion.span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-[#00FFB2]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    Delivered via Nodemailer
                  </div>

                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline text-xs py-2 px-5 mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}

              {/* Form state */}
              {status !== 'success' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Error banner */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 p-4 mb-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      >
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <p className="text-xs font-mono leading-relaxed flex-1">{errorMsg}</p>
                        <button onClick={() => setStatus('idle')} className="flex-shrink-0 hover:text-rose-300 transition-colors">
                          <X size={14} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your name"
                        className={inputClass('name')}
                      />
                      <FieldError msg={touched.name && errors.name} />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email</label>
                      <input
                        type="text"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="your@email.com"
                        className={inputClass('email')}
                      />
                      <FieldError msg={touched.email && errors.email} />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={e => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        placeholder="What's this about?"
                        className={inputClass('subject')}
                      />
                      <FieldError msg={touched.subject && errors.subject} />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Message</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={e => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="Tell me about your project or automation challenge..."
                        className={`${inputClass('message')} resize-none`}
                      />
                      <FieldError msg={touched.message && errors.message} />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
