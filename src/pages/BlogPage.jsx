import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { blogPosts } from '../blogs/blogData'

const allCategories = ['All', ...new Set(blogPosts.map(p => p.category))]

export default function BlogPage({ darkMode }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = blogPosts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || post.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <main className={`min-h-screen pt-24 ${darkMode ? 'bg-dark-900' : 'bg-slate-50'}`}>
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
            <span className="text-[#00FFB2] font-mono text-sm">blog.all</span>
            <div className="w-8 h-0.5 bg-[#00FFB2]" />
          </div>
          <h1 className={`font-display font-extrabold text-5xl md:text-6xl mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Blog & Tutorials
          </h1>
          <p className={`text-lg max-w-2xl mx-auto font-body ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Deep dives into AI automation, n8n workflows, API integrations, and the future of intelligent software.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-8 max-w-xl mx-auto"
        >
          <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full pl-11 pr-5 py-3.5 rounded-2xl text-sm font-body outline-none transition-all ${
              darkMode
                ? 'bg-dark-800 border border-white/10 text-white placeholder-slate-600 focus:border-[rgba(0,255,178,0.4)]'
                : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary-300 shadow-sm'
            }`}
          />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#00FFB2] text-dark-900 font-bold shadow-lg shadow-[rgba(0,255,178,0.25)]'
                  : darkMode
                  ? 'text-slate-400 border border-white/10 hover:border-[rgba(0,255,178,0.3)] hover:text-[#00FFB2]'
                  : 'text-slate-600 border border-slate-200 hover:border-primary-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-lg font-display ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>No posts found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className={`group flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/5 bg-dark-800/50 hover:border-[rgba(0,255,178,0.2)] hover:bg-dark-800'
                      : 'border-slate-200 bg-white hover:border-primary-200 hover:shadow-md'
                  }`}
                >
                  {/* Color bar */}
                  <div
                    className="flex-shrink-0 w-full md:w-1.5 h-1.5 md:h-auto rounded-full"
                    style={{ background: post.color }}
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded-full"
                        style={{ background: `${post.color}18`, color: post.color }}
                      >
                        {post.category}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                      <span className={`text-xs font-mono ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h2 className={`font-display font-bold text-xl mb-2 group-hover:text-[#00FFB2] transition-colors duration-300 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {post.title}
                    </h2>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className={`text-xs font-mono px-2 py-0.5 rounded-md flex items-center gap-1 ${
                            darkMode ? 'bg-dark-700 text-slate-500' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Tag size={9} /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center self-start md:self-center text-[#00FFB2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
