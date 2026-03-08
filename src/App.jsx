import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import BlogPage from './pages/BlogPage'
import BlogPost from './pages/BlogPost'
import CustomCursor from './components/ui/CustomCursor'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light')
    }
  }, [darkMode])

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-dark-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <CustomCursor darkMode={darkMode} />
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/blog" element={<BlogPage darkMode={darkMode} />} />
          <Route path="/blog/:slug" element={<BlogPost darkMode={darkMode} />} />
        </Routes>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  )
}
