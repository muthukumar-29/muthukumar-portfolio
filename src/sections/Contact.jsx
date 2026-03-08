import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, Send, MapPin, Clock, CheckCircle } from 'lucide-react'

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'muthukumarm.2903@gmail.com', href: 'mailto:muthukumarm.2903@gmail.com', color: '#00FFB2' },
  { icon: Github, label: 'GitHub', value: 'github.com/muthukumar-29', href: 'https://github.com/muthukumar-29', color: '#A78BFA' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/muthukumar', href: 'https://linkedin.com/in/muthukumar', color: '#0EA5E9' },
]

export default function Contact({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setSent(true)
    setLoading(false)
  }

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
            {/* Contact links */}
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

            {/* Availability */}
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
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle size={56} className="text-[#00FFB2] mb-4" />
                </motion.div>
                <h3 className={`font-display font-bold text-2xl mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200 ${
                      darkMode
                        ? 'bg-dark-700 border border-white/10 text-white placeholder-slate-600 focus:border-[rgba(0,255,178,0.4)]'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200 ${
                      darkMode
                        ? 'bg-dark-700 border border-white/10 text-white placeholder-slate-600 focus:border-[rgba(0,255,178,0.4)]'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-mono mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project or automation challenge..."
                    className={`w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200 resize-none ${
                      darkMode
                        ? 'bg-dark-700 border border-white/10 text-white placeholder-slate-600 focus:border-[rgba(0,255,178,0.4)]'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-300'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
