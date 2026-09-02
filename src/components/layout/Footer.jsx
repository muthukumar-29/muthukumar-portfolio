import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Zap } from 'lucide-react'

export default function Footer({ darkMode }) {
  const year = new Date().getFullYear()
  return (
    <footer className={`border-t ${darkMode ? 'border-white/5 bg-dark-900' : 'border-black/5 bg-slate-100'} px-6 md:px-12 py-6`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#00FFB2] to-[#00C8FF] flex items-center justify-center">
            <Zap size={13} className="text-dark-900" strokeWidth={2.5} />
          </div>
          <span className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Muthukumar<span className="text-[#00FFB2]">.</span>
          </span>
        </div>

        <p className={`text-xs font-body ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          © {year} Muthukumar · Automation Specialist at{' '}
          <a href="https://selfera.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#00FFB2] hover:underline">
            Selfera Pvt Ltd
          </a>
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: 'https://github.com/muthukumar-29', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/muthukumar29', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:contact@muthukumar.dev', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                darkMode ? 'text-slate-500 hover:text-[#00FFB2] hover:bg-white/5' : 'text-slate-500 hover:text-primary-600 hover:bg-black/5'
              }`}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
