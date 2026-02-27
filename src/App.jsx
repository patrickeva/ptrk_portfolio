import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

const SECTIONS = [
  { id: 'home',      label: 'Home',       Component: Home },
  { id: 'skills',    label: 'Skills',     Component: Skills },
  { id: 'services',  label: 'Experience', Component: Experience },
  { id: 'education', label: 'Education',  Component: Projects },
  { id: 'contact',   label: 'Contact',    Component: Contact },
]

function App() {
  const [activeSection, setActiveSection]   = useState('home')
  const [displaySection, setDisplaySection] = useState('home')
  const [transitioning, setTransitioning]   = useState(false)
  const [curtainDir, setCurtainDir]         = useState('down')
  const [labelText, setLabelText]           = useState('')
  const [showLabel, setShowLabel]           = useState(false)
  const contentRef = useRef(null)
  const timerRef   = useRef([])

  // Clear all pending timers on unmount
  useEffect(() => {
    return () => timerRef.current.forEach(clearTimeout)
  }, [])

  const navigateTo = useCallback((sectionId) => {
    if (sectionId === activeSection || transitioning) return

    const currentIdx = SECTIONS.findIndex(s => s.id === activeSection)
    const nextIdx    = SECTIONS.findIndex(s => s.id === sectionId)
    const dir        = nextIdx > currentIdx ? 'down' : 'up'
    const nextLabel  = SECTIONS.find(s => s.id === sectionId)?.label ?? ''

    setCurtainDir(dir)
    setTransitioning(true)
    setActiveSection(sectionId)
    setLabelText(nextLabel)

    // Step 1 (t=0): curtain slides IN → screen covered
    // Step 2 (t=350ms): show label, swap content, scroll to top
    // Step 3 (t=600ms): hide label
    // Step 4 (t=900ms): curtain slides OUT → new section revealed

    const t1 = setTimeout(() => {
      setDisplaySection(sectionId)
      setShowLabel(true)
      if (contentRef.current) contentRef.current.scrollTop = 0
      window.scrollTo({ top: 0 })
    }, 350)

    const t2 = setTimeout(() => {
      setShowLabel(false)
    }, 650)

    const t3 = setTimeout(() => {
      setTransitioning(false)
    }, 950)

    timerRef.current = [t1, t2, t3]
  }, [activeSection, transitioning])

  // ScrollReveal on section mount
  useEffect(() => {
    const sr = window.ScrollReveal?.({
      distance: '50px',
      duration: 1000,
      delay: 100,
      reset: false,
    })
    if (!sr) return

    if (displaySection === 'home') {
      sr.reveal('.home-content', { origin: 'top' })
      sr.reveal('.home-content h1', { origin: 'left' })
      sr.reveal('.home-content h3, .home-content p', { origin: 'right' })
    }
    sr.reveal('.heading', { origin: 'top' })
    sr.reveal('.skills-box, .project-card, .edu-card, .services-box', {
      origin: 'bottom',
      interval: 80,
    })
  }, [displaySection])

  // Swiper re-init if needed
  useEffect(() => {
    if (displaySection === 'contact' && window.Swiper) {
      setTimeout(() => {
        new window.Swiper('.mySwiper', {
          slidesPerView: 1,
          spaceBetween: 50,
          loop: true,
          grabCursor: true,
          pagination: { el: '.swiper-pagination', clickable: true },
          navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        })
      }, 100)
    }
  }, [displaySection])

  const CurrentSection = SECTIONS.find(s => s.id === displaySection)?.Component ?? Home

  return (
    <div className="app-wrapper">
      {/* Dot grid background */}
      <div className="animated-bg" aria-hidden="true" />

      {/* ── CURTAIN WIPE ── */}
      <div
        className={`curtain curtain--${curtainDir}${transitioning ? ' curtain--active' : ''}`}
        aria-hidden="true"
      />

      {/* Section name label shown during curtain */}
      <span className={`curtain-label${showLabel ? ' curtain-label--show' : ''}`}>
        {labelText}
      </span>

      {/* ── MAIN APP ── */}
      <div className="app-content">
        <Navbar activeSection={activeSection} navigateTo={navigateTo} />

        <main
          ref={contentRef}
          className={`section-view${transitioning ? ' section-view--hidden' : ' section-view--visible'}`}
        >
          <CurrentSection />
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App