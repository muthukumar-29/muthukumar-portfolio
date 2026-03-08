import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { blogPosts } from '../blogs/blogData'

export default function BlogPreview({ darkMode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const featured = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="section-padding max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
            <span className="text-[#00FFB2] font-mono text-sm">blog.latest</span>
          </div>
          <h2 className={`font-display font-extrabold text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Thoughts & Tutorials
          </h2>
          <p className={`mt-3 text-base font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            AI automation insights, n8n tutorials, and workflow tips
          </p>
        </div>
        <Link to="/blog" className="btn-outline inline-flex flex-shrink-0 group">
          All Posts
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className={`block rounded-2xl border overflow-hidden transition-all duration-500 group ${
                darkMode
                  ? 'border-white/5 bg-dark-800/50 hover:border-[rgba(0,255,178,0.2)]'
                  : 'border-slate-200 bg-white hover:border-primary-200 hover:shadow-lg'
              }`}
            >
              {/* Color top accent */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}80)` }} />

              <div className="p-6">
                {/* Category + read time */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{ background: `${post.color}18`, color: post.color }}
                  >
                    {post.category}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className={`font-display font-bold text-base leading-snug mb-3 group-hover:text-[#00FFB2] transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-1 mt-5 text-xs font-mono text-[#00FFB2] group-hover:gap-2 transition-all duration-300">
                  Read more <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
