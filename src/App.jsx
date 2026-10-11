import { useState, useEffect, useRef, useCallback } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'services', 'projects', 'skills', 'contact']
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function Backdrop() {
  const glowRef = useRef(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    let frame = 0
    const onMove = e => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
        el.style.opacity = '1'
      })
    }
    const onLeave = () => { el.style.opacity = '0' }
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="backdrop__blob backdrop__blob--1" />
      <div className="backdrop__blob backdrop__blob--2" />
      <div ref={glowRef} className="backdrop__cursor" />
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navigateTo = useCallback(sectionId => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Backdrop />

      <Navbar activeSection={activeSection} navigateTo={navigateTo} />

      <main>
        <Home ready navigateTo={navigateTo} />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}

export default App
