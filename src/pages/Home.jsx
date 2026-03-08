import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import BlogPreview from '../sections/BlogPreview'
import Contact from '../sections/Contact'

export default function Home({ darkMode }) {
  return (
    <main>
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <BlogPreview darkMode={darkMode} />
      <Contact darkMode={darkMode} />
    </main>
  )
}
