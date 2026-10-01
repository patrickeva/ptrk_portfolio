import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, MotionConfig, motion, animate, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'skills', 'services', 'education', 'contact']
const INTRO_KEY = 'intro-seen'

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return true
  }
}

function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: v => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="preloader__inner">
        <div className="preloader__name" aria-label="Patrick Eva">
          {'Patrick Eva'.split('').map((ch, i) => (
            <span className="char-mask" key={i}>
              <motion.span
                className="char"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.035 }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            </span>
          ))}
        </div>
        <div className="preloader__bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span className="preloader__count">{String(count).padStart(3, '0')}</span>
      </div>
    </motion.div>
  )
}

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
  const [loading, setLoading] = useState(() => !hasSeenIntro())
  const [activeSection, setActiveSection] = useState('home')

  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* private mode */ }
    setLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

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
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={finishIntro} />}
      </AnimatePresence>

      <ScrollProgress />
      <Backdrop />

      <Navbar activeSection={activeSection} navigateTo={navigateTo} />

      <main>
        <Home ready={!loading} navigateTo={navigateTo} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  )
}

export default App
