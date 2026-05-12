import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

const PARTICLE_COUNT = 12
function Particles() {
  return (
    <div className="particles-wrap" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}

const SECTIONS = [
  { id: 'home',      Component: Home },
  { id: 'about',     Component: About },
  { id: 'skills',    Component: Skills },
  { id: 'services',  Component: Experience },
  { id: 'education', Component: Projects },
  { id: 'contact',   Component: Contact },
]

const sectionIn = {
  hidden:  { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease: [0.22, 1, 0.36, 1] },
  },
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const mouseGlowRef = useRef(null)

  /* Cursor glow */
  useEffect(() => {
    const el = mouseGlowRef.current
    if (!el) return
    const onMove = e => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
      el.classList.add('mouse-glow--visible')
    }
    const onLeave = () => el.classList.remove('mouse-glow--visible')
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* Track active section for navbar highlight */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -35% 0px' }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navigateTo = useCallback(sectionId => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="app-wrapper">
      <div ref={mouseGlowRef} className="mouse-glow" aria-hidden="true" />
      <Particles />
      <div className="animated-bg" aria-hidden="true" />

      <div className="app-content">
        <Navbar activeSection={activeSection} navigateTo={navigateTo} />

        <main>
          {SECTIONS.map(({ id, Component }) => (
            <motion.div
              key={id}
              className="section-reveal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.07 }}
              variants={sectionIn}
            >
              <Component />
            </motion.div>
          ))}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App
