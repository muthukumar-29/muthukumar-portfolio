import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react'
import { blogPosts } from '../blogs/blogData'

export default function BlogPost({ darkMode }) {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className={`min-h-screen pt-24 flex items-center justify-center ${darkMode ? 'bg-dark-900' : 'bg-slate-50'}`}>
        <div className="text-center">
          <h1 className={`font-display font-bold text-4xl mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Post not found</h1>
          <Link to="/blog" className="btn-outline inline-flex">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <main className={`min-h-screen pt-24 ${darkMode ? 'bg-dark-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Back */}
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 text-sm font-mono mb-8 transition-colors duration-200 ${
              darkMode ? 'text-slate-500 hover:text-[#00FFB2]' : 'text-slate-500 hover:text-primary-600'
            }`}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-mono px-3 py-1.5 rounded-full"
              style={{ background: `${post.color}18`, color: post.color }}
            >
              {post.category}
            </span>
            <span className={`flex items-center gap-1 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Clock size={11} /> {post.readTime}
            </span>
            <span className={`flex items-center gap-1 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Calendar size={11} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className={`font-display font-extrabold text-4xl md:text-5xl leading-tight mb-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {post.title}
          </h1>

          <p className={`text-lg font-body leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                  darkMode ? 'bg-dark-800 border border-white/10 text-slate-500' : 'bg-white border border-slate-200 text-slate-500'
                }`}
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mt-10 mb-10" style={{ background: `linear-gradient(90deg, ${post.color}60, transparent)` }} />
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}`}
          style={{
            '--tw-prose-body': darkMode ? '#94a3b8' : '#475569',
            '--tw-prose-headings': darkMode ? '#f1f5f9' : '#0f172a',
            '--tw-prose-code': '#00FFB2',
            '--tw-prose-pre-bg': darkMode ? '#0a1510' : '#f8fafc',
            '--tw-prose-links': '#00FFB2',
          }}
        >
          <style>{`
            .prose h2 { font-family: 'Syne', sans-serif; font-weight: 800; }
            .prose h3 { font-family: 'Syne', sans-serif; font-weight: 700; }
            .prose code:not(pre code) {
              background: rgba(0,255,178,0.1);
              color: #00FFB2;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.85em;
            }
            .prose pre {
              background: ${darkMode ? '#0A1510' : '#f8fafc'};
              border: 1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : '#e2e8f0'};
              border-radius: 12px;
            }
            .prose a { color: #00FFB2; text-decoration: none; }
            .prose a:hover { text-decoration: underline; }
            .prose strong { color: ${darkMode ? '#e2e8f0' : '#1e293b'}; }
            .prose ul li::marker { color: #00FFB2; }
            .prose ol li::marker { color: #00FFB2; }
            .prose blockquote {
              border-left-color: #00FFB2;
              background: rgba(0,255,178,0.05);
              border-radius: 0 8px 8px 0;
              padding: 16px 20px;
            }
          `}</style>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.article>
      </div>

      {/* Related posts */}
      <div className={`mt-16 py-16 border-t ${darkMode ? 'border-white/5 bg-dark-800/30' : 'border-slate-200 bg-slate-100/50'}`}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h2 className={`font-display font-bold text-2xl mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>More Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPosts.map(p => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className={`group p-4 rounded-xl border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/5 bg-dark-800/50 hover:border-[rgba(0,255,178,0.2)]'
                    : 'border-slate-200 bg-white hover:border-primary-200'
                }`}
              >
                <div className="h-0.5 rounded-full mb-3" style={{ background: p.color }} />
                <p className={`text-xs font-mono mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{p.readTime}</p>
                <h3 className={`text-sm font-display font-bold group-hover:text-[#00FFB2] transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
