'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Linkedin, Mail, Download, GraduationCap, Briefcase,
  Code, Brain, Users, BookOpen, Award, Menu, X,
} from 'lucide-react'

// ── Constants ────────────────────────────────────────────────────────────────

const TYPED_ROLES = [
  'Computer Vision Researcher',
  'Machine Learning Researcher',
  'Autonomous Vehicles Engineer',
  'Entrepreneurship Leader',
  'Mechatronics Engineer',
]

// ── TypeWriter ────────────────────────────────────────────────────────────────

function TypeWriter() {
  const [text, setText] = useState('')
  const state = useRef({ wordIdx: 0, charIdx: 0, deleting: false })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const s = state.current
      const word = TYPED_ROLES[s.wordIdx]

      if (!s.deleting) {
        if (s.charIdx < word.length) {
          s.charIdx++
          setText(word.slice(0, s.charIdx))
          timer = setTimeout(tick, 80)
        } else {
          timer = setTimeout(() => { s.deleting = true; tick() }, 2000)
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--
          setText(word.slice(0, s.charIdx))
          timer = setTimeout(tick, 50)
        } else {
          s.deleting = false
          s.wordIdx = (s.wordIdx + 1) % TYPED_ROLES.length
          timer = setTimeout(tick, 400)
        }
      }
    }

    timer = setTimeout(tick, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-xl md:text-2xl font-medium h-9 flex items-center mt-3">
      <span className="text-cyan-400">{text}</span>
      <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-blink" />
    </div>
  )
}

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { rootMargin: '-60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const toggleCard = (id: string) =>
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }))

  const heroAnim = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative z-10">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#about" className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Rafael Melo
            </a>
            <div className="hidden md:flex items-center gap-6">
              {['About Me','Experience','Education','Projects','Skills','Awards','CV','Contact'].map(label => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(' ','')}`}
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                >
                  {label}
                </a>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-slate-800 pt-4">
              <div className="flex flex-col gap-4">
                {['About Me','Experience','Education','Projects','Skills','Awards','CV','Contact'].map(label => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase().replace(' ','')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── About ── */}
      <section id="aboutme" className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">

            {/* Profile photo with rotating gradient ring */}
            <div className="md:col-span-1 flex justify-center" style={heroAnim(0)}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div
                  className="absolute inset-0 rounded-full animate-spin-slow"
                  style={{
                    background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, transparent 55%, #06b6d4)',
                  }}
                />
                <div
                  className="absolute rounded-full overflow-hidden bg-slate-950"
                  style={{ inset: '3px' }}
                >
                  <Image src="/profile-photo.jpg" alt="Rafael Melo" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Hero text */}
            <div className="md:col-span-2 text-center md:text-left">
              <div style={heroAnim(120)} className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Rafael Melo
                </h1>
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image src="/unicamp-logo.png" alt="Unicamp Logo" fill className="object-contain" />
                </div>
              </div>

              <div style={heroAnim(220)}>
                <TypeWriter />
              </div>

              <div style={heroAnim(340)} className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
                <p className="text-slate-300 leading-relaxed">
                  Mechatronics Engineering student at Unicamp, researcher in Computer Vision and Machine Learning, and President of Unicamp's Entrepreneurship League. Building the most of myself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience – Timeline ── */}
      <section id="experience" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Experience</h2>
          </Reveal>

          <div className="relative">
            {/* Gradient vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-0.5"
              style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #06b6d4, #10b981)' }}
            />

            <div className="space-y-8">

              {/* CV Researcher */}
              <Reveal delay={0} className="relative flex gap-6">
                <div className="relative z-10 mt-6 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-1">Researcher – Computer Vision</h3>
                  <p className="text-slate-400 mb-2 text-sm">LIDS – Laboratory of Information and Decision Systems</p>
                  <p className="text-slate-200 text-sm font-semibold">
                    Advisor: <span className="text-cyan-400">Prof. Dr. Alexandre Xavier Falcão</span>
                  </p>
                  <p className="text-slate-500 text-sm mt-2 italic">Selected on merit after achieving the highest grade in Data Structures</p>
                </div>
              </Reveal>

              {/* ML Researcher */}
              <Reveal delay={80} className="relative flex gap-6">
                <div className="relative z-10 mt-6 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-blue-400 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-1">Researcher – Machine Learning</h3>
                  <p className="text-slate-400 mb-2 text-sm">LAMAR – Machine Learning in Bearings</p>
                  <p className="text-slate-200 text-sm font-semibold">
                    Advisor: <span className="text-cyan-400">Prof. Dr. Thales de Freitas Peixoto</span>
                  </p>
                  <p className="text-slate-500 text-sm mt-2 italic">Selected on merit after achieving the second highest grade in Statics</p>
                </div>
              </Reveal>

              {/* E-racing */}
              <Reveal delay={160} className="relative flex gap-6">
                <div className="relative z-10 mt-6 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-green-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-1">Autonomous Vehicles Engineer</h3>
                  <p className="text-slate-400 mb-2 text-sm">E-racing – Unicamp</p>
                  {!expandedCards['eracing'] ? (
                    <>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                        Developed and implemented a fully autonomous (driverless) Formula electric car. Progressed from basic to advanced proficiency in Python, Linux, Git, ROS2, Computer Vision, and Image Processing over six months.
                      </p>
                      <button onClick={() => toggleCard('eracing')} className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 font-medium transition-colors">
                        Read more →
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                        Developed and implemented a fully autonomous (driverless) Formula electric car. Progressed from basic to advanced proficiency in Python, Linux, Git, ROS2, Computer Vision, and Image Processing over six months.
                      </p>
                      <p className="text-slate-300 text-sm mt-3 italic">
                        Project secured 3rd place in Brazil's National Autonomous Vehicles Competition, competing against the top 20 universities in the country.
                      </p>
                      <button onClick={() => toggleCard('eracing')} className="text-cyan-400 hover:text-cyan-300 text-sm mt-3 font-medium transition-colors">
                        Read less ↑
                      </button>
                    </>
                  )}
                </div>
              </Reveal>

              {/* President */}
              <Reveal delay={240} className="relative flex gap-6">
                <div className="relative z-10 mt-6 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-1">President</h3>
                  <p className="text-slate-400 mb-2 text-sm">Entrepreneurship League – Unicamp</p>
                  {!expandedCards['president'] ? (
                    <>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                        Leading a 15-person team, developing entrepreneurial projects and promoting innovation at Unicamp.
                      </p>
                      <button onClick={() => toggleCard('president')} className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 font-medium transition-colors">
                        Read more →
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                        Leading a 15-person team, developing entrepreneurial projects and promoting innovation at Unicamp. Responsible for strategic planning, team coordination, and fostering a culture of entrepreneurship within the university community.
                      </p>
                      <button onClick={() => toggleCard('president')} className="text-cyan-400 hover:text-cyan-300 text-sm mt-3 font-medium transition-colors">
                        Read less ↑
                      </button>
                    </>
                  )}
                </div>
              </Reveal>

              {/* Author */}
              <Reveal delay={320} className="relative flex gap-6">
                <div className="relative z-10 mt-6 flex-shrink-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                  <h3 className="text-xl font-semibold mb-1">Co-Author & Coordinator</h3>
                  <p className="text-slate-400 mb-2 text-sm">Published 3 books</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Coordinated teams of over 100 people in editorial projects, demonstrating organization, communication, and leadership skills in complex projects.
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Education</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-400" />
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold">Mechatronics Engineering</h3>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold rounded-full border border-amber-400">
                    Top 3%
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-lg mb-2">State University of Campinas (Unicamp)</p>
              <p className="text-slate-500 text-sm mb-4">GPA: 3.7/4.0</p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-slate-300 text-sm font-semibold mb-3">Perfect grade in:</p>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>• <span className="font-semibold text-slate-300">Algorithms and Programming</span> (Python)</li>
                  <li>• <span className="font-semibold text-slate-300">Data Structures</span> (C)</li>
                  <li>• <span className="font-semibold text-slate-300">Calculus I, II and III</span></li>
                  <li>• <span className="font-semibold text-slate-300">Analytic Geometry</span></li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Main Projects</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">

            <Reveal delay={0}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <h3 className="text-xl font-semibold">Scientific Initiation (FEM-Unicamp)</h3>
                </div>
                <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                  Numerical modeling and Machine Learning for dynamic bearing coefficients.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/scientific-initiation/image1.jpg" alt="Scientific Initiation 1" fill className="object-cover" />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/scientific-initiation/image2.jpg" alt="Scientific Initiation 2" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python','Machine Learning','Numerical Modeling'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />
                  <h3 className="text-xl font-semibold">'Ifome' App</h3>
                </div>
                <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                  iFood replica developed in Java with advanced OOP concepts (MC322).
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/ifome/image1.jpg" alt="Ifome 1" fill className="object-cover" />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/ifome/image2.jpg" alt="Ifome 2" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Java','OOP','Algorithms'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <h3 className="text-xl font-semibold">Autonomous Perception (E-racing)</h3>
                </div>
                <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                  Cone detection with YOLO, LiDAR, and ROS2 for an autonomous racing car.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/autonomous-perception/image1.jpg" alt="Autonomous Perception 1" fill className="object-cover" />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/autonomous-perception/image2.jpg" alt="Autonomous Perception 2" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python','ROS2','YOLO','LiDAR','Computer Vision'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                  <h3 className="text-xl font-semibold">Rubik's Cube Solver</h3>
                </div>
                <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                  Graphical and gamified solving algorithm.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/rubiks-cube/image1.jpg" alt="Rubik's Cube 1" fill className="object-cover" />
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/projects/rubiks-cube/image2.jpg" alt="Rubik's Cube 2" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Algorithms','Game Development'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Skills</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">

            <Reveal delay={0}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-6">Programming Languages</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Python', color: 'text-blue-400' },
                    { name: 'C', color: 'text-blue-400' },
                    { name: 'Java', color: 'text-orange-400' },
                    { name: 'VHDL', color: 'text-purple-400' },
                  ].map(({ name, color }) => (
                    <div key={name} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
                      <Code className={`w-5 h-5 ${color}`} />
                      <span className="text-slate-200">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-6">Technologies & Tools</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'ROS2', color: 'text-cyan-400' },
                    { name: 'Git', color: 'text-orange-400' },
                    { name: 'Linux', color: 'text-yellow-400' },
                    { name: 'Machine Learning', color: 'text-purple-400' },
                    { name: 'Computer Vision', color: 'text-green-400' },
                  ].map(({ name, color }) => (
                    <div key={name} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
                      <Brain className={`w-5 h-5 ${color}`} />
                      <span className="text-slate-200">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section id="awards" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Awards & Achievements</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">

            <Reveal delay={0}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-semibold">Top 3% Academic Performance</h3>
                </div>
                <p className="text-slate-400">Ranked in the top 3% of Mechatronics Engineering students at Unicamp</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-semibold">Merit-Based Research Selection</h3>
                </div>
                <p className="text-slate-400">Selected for research position at LIDS after achieving the highest grade in Data Structures</p>
              </div>
            </Reveal>

            <Reveal delay={0}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-semibold">Super Liga X – 1st Place</h3>
                </div>
                <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4 bg-slate-800 border border-slate-700">
                  <Image src="/awards/super-liga-x.jpg" alt="Super Liga X Competition" fill className="object-contain" />
                </div>
                <p className="text-slate-400 mb-2">
                  Entrepreneurship competition involving over 60 university teams from across Brazil, with more than 280 participants.
                </p>
                <p className="text-slate-300 font-semibold">My 4-person team received the 1st Place National Award.</p>
                <p className="text-slate-500 text-sm mt-3 italic">
                  This competition was a transformative experience that challenged our team to develop innovative solutions and demonstrate strong leadership and teamwork skills.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-semibold">Robocar Race – 3rd Place</h3>
                </div>
                <div className="relative w-full h-80 rounded-lg overflow-hidden mb-4 bg-slate-800 border border-slate-700">
                  <Image src="/awards/robocar-race.jpg" alt="Robocar Race Competition" fill className="object-contain" />
                </div>
                <p className="text-slate-400 mb-2">
                  Autonomous vehicle competition at scale, involving robotics, autonomous navigation with artificial intelligence and computer vision.
                </p>
                <p className="text-slate-400 mb-2">The 20 best universities in Brazil were registered in the competition.</p>
                <p className="text-slate-300 font-semibold">My team received the 3rd Place National Award.</p>
                <p className="text-slate-500 text-sm mt-3 italic">
                  This competition allowed me to apply my knowledge in computer vision, machine learning, and autonomous systems in a real-world competitive environment.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CV ── */}
      <section id="cv" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Curriculum Vitae</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <p className="text-slate-300 text-center mb-8 text-lg">Download my complete CV in PDF format</p>
              <div className="flex justify-center">
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-200 border border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20 hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download CV (PDF)
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="container mx-auto px-4 py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold">Contact</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <p className="text-slate-300 text-center mb-8 text-lg">
                Feel free to reach out if you'd like to collaborate or have any questions!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/rafael-pimentel-9588a02b3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors duration-200 border border-slate-700 hover:border-cyan-500/50"
                >
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                  LinkedIn
                </a>
                <a
                  href="mailto:rafaelrpm10@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors duration-200 border border-slate-700 hover:border-cyan-500/50"
                >
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© 2025 Rafael Melo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/rafael-pimentel-9588a02b3" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="mailto:rafaelrpm10@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
