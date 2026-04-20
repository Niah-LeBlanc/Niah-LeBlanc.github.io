import { useState, useEffect, useRef } from 'react'
import './App.css'

// ── SVG ICONS ──
const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
)

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EmailIcon = ({ size = 14 }: { size?: number }) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PhoneIcon = ({ size = 14 }: { size?: number }) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const DownloadIcon = ({ size = 15 }: { size?: number }) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={size} height={size}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={12} height={12}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
)

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={12} height={12}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
)

// ── TECH BADGE ──
interface TechBadgeProps {
  variant: string
  imgSrc?: string
  label: string
  useGitHubSvg?: boolean
}

const TechBadge = ({ variant, imgSrc, label, useGitHubSvg }: TechBadgeProps) => (
  <span className={`tech-icon-badge ${variant}`}>
    {useGitHubSvg ? (
      <GitHubIcon size={14} />
    ) : imgSrc ? (
      <img src={imgSrc} width={14} height={14} alt={label} />
    ) : null}
    <span className="badge-label">{label}</span>
  </span>
)

// ── PROJECT DATA ──
interface Project {
  id: string
  number: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  githubUrl: string
  tags: TechBadgeProps[]
}

const projects: Project[] = [
  {
    id: 'issue-tracker',
    number: '01',
    title: 'Issue Tracker Application',
    description:
      'A full-stack REST API built with Node.js and Express featuring a modular controller architecture and MongoDB schema design for scalable issue tracking. Includes JWT-based authentication via Better Auth and a responsive React frontend with protected routes.',
    imageSrc: '/Images/IssueTrackerHero.png',
    imageAlt: 'Issue Tracker Application screenshot',
    githubUrl: 'https://github.com/Niah-LeBlanc/Issue-Tracker-Application.git',
    tags: [
      { variant: 'react',   imgSrc: '/React.svg',       label: 'React' },
      { variant: 'node',    imgSrc: '/Node.js.svg',     label: 'Node.js' },
      { variant: 'express', imgSrc: '/Express.svg',     label: 'Express' },
      { variant: 'mongo',   imgSrc: '/MongoDB.svg',     label: 'MongoDB' },
      { variant: 'tailwind',imgSrc: '/Tailwind CSS.svg',label: 'Tailwind' },
      { variant: 'auth',    imgSrc: '/better-auth.svg', label: 'Auth' },
    ],
  },
  {
    id: 'byteboard',
    number: '02',
    title: 'ByteBoard — Collaborative Code Discussion',
    description:
      'A full CRUD platform using C# MVC and SQL Server with a relational schema supporting boards, threaded posts, tagging, and expandable code snippets. Features role-based moderation controls and Better Auth, deployed to Azure.',
    imageSrc: '/Images/ByteBoardHero.png',
    imageAlt: 'ByteBoard application screenshot',
    githubUrl: 'https://github.com/Niah-LeBlanc/ByteBoard.git',
    tags: [
      { variant: 'csharp',  imgSrc: '/CSharp.svg',              label: 'C# MVC' },
      { variant: 'sql',     imgSrc: '/Microsoft SQL Server.svg', label: 'SQL Server' },
      { variant: 'tailwind',imgSrc: '/Tailwind CSS.svg',         label: 'Tailwind' },
      { variant: 'azure',   imgSrc: '/Azure.svg',                label: 'Azure' },
      { variant: 'auth',    imgSrc: '/better-auth.svg',          label: 'Auth' },
    ],
  },
  {
    id: 'fastguide',
    number: '03',
    title: 'FastGuide.AI — YouTube to Study Guide',
    description:
      'A backend pipeline that retrieves YouTube transcripts, processes them through AI APIs, and generates structured study guides with section headers, code breakdowns, resource links, and deprecation flags. Built with C# MVC, deployed to Azure.',
    imageSrc: '/Images/FastGuideAiHero.png',
    imageAlt: 'FastGuide.AI application screenshot',
    githubUrl: 'https://github.com/Niah-LeBlanc/FastGuide.AI.git',
    tags: [
      { variant: 'csharp',  imgSrc: '/CSharp.svg',      label: 'C# MVC' },
      { variant: 'azure',   imgSrc: '/Azure.svg',        label: 'Azure SQL' },
      { variant: 'tailwind',imgSrc: '/Tailwind CSS.svg', label: 'Tailwind' },
      { variant: 'ai',      imgSrc: '/claude-color.svg', label: 'AI API' },
      { variant: 'node',    imgSrc: '/Node.js.svg',      label: 'REST API' },
    ],
  },
]

// ── SKILLS ──
const technicalSkills = [
  'MERN Stack — MongoDB, Express, React, Node.js',
  'React with modern tooling',
  'Tailwind CSS & Bootstrap',
  'C#, MVC architecture, RESTful APIs',
  'MongoDB & MySQL',
  'Git & GitHub',
  'Azure deployment',
]

const toolBadges: TechBadgeProps[] = [
  { variant: 'vstudio', imgSrc: '/Visual Studio.svg',                    label: 'Visual Studio' },
  { variant: 'vscode',  imgSrc: '/Visual Studio Code (VS Code).svg',     label: 'VS Code' },
  { variant: 'git',     imgSrc: '/Git.svg',                              label: 'Git' },
  { variant: 'github',  imgSrc: undefined, useGitHubSvg: true,          label: 'GitHub' },
  { variant: 'postman', imgSrc: '/Postman.svg',                          label: 'Postman' },
  { variant: 'azure',   imgSrc: '/Azure.svg',                            label: 'Azure Portal' },
  { variant: 'git',     imgSrc: '/TortoiseGit.svg',                      label: 'Tortoise Git' },
]

// ── APP COMPONENT ──
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const fadeRefs = useRef<(HTMLElement | null)[]>([])

  // Init theme from localStorage / system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = saved ?? preferred
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  // Sync data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Scroll-triggered fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${i * 0.05}s`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const closeMobileMenu = () => setMenuOpen(false)

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <a href="#about" onClick={closeMobileMenu}>About</a>
        <div className="mobile-menu-divider" />
        <a href="#projects" onClick={closeMobileMenu}>Projects</a>
        <div className="mobile-menu-divider" />
        <a
          href="NiahLeBlanc_Resume.pdf"
          target="_blank"
          className="accent"
          onClick={closeMobileMenu}
        >
          Résumé
        </a>
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Niah LeBlanc</a>
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li>
                <a
                  href="NiahLeBlanc_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-nav"
                >
                  Résumé
                </a>
              </li>
            </ul>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <div className="theme-toggle-knob" />
              <span className="theme-toggle-icon">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </span>
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow animate d1">Full-Stack Web Developer — St. Louis, MO</p>

          <h1 className="animate d2">
            Niah<br />LeBlanc
          </h1>

          <p className="hero-sub animate d3">
            I ship full-stack applications — from REST APIs and auth systems to responsive React
            frontends. MERN stack, C# MVC, SQL &amp; NoSQL, deployed to Azure. Ready to contribute
            on day one.
          </p>
          <p className="available-badge animate d4">Open to entry-level roles</p>

          <div className="hero-actions animate d4">
            <a
              href="mailto:niahLeblanc@protonmail.com"
              className="resume-btn"
              style={{ background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }}
            >
              <EmailIcon size={15} />
              Get In Touch
            </a>
            <a href="NiahLeBlanc_Resume.pdf" download className="resume-btn">
              <DownloadIcon size={15} />
              Download Résumé
            </a>
          </div>

          {/* Inline contact links */}
          <div className="hero-contact animate d4">
            <a href="mailto:niahLeblanc@protonmail.com" className="hero-contact-item">
              <EmailIcon size={14} />
              niahLeblanc@protonmail.com
            </a>
            <a href="tel:3143201871" className="hero-contact-item">
              <PhoneIcon size={14} />
              (314) 320-1871
            </a>
            <a
              href="https://github.com/Niah-LeBlanc"
              className="hero-contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={14} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/niah-leblanc-85373139b/"
              className="hero-contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-right">
          {/* Profile picture — sits above the meta card */}
          <div className="hero-profile-pic animate d3">
            {!imgError ? (
              <img
                src="/Images/ProfilePicture.jpg"
                alt="Niah LeBlanc"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="hero-profile-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={52} height={52}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>

          <div className="hero-meta animate d4">
            <strong>Degree</strong>
            A.A.S. Web Development
            <strong style={{ marginTop: '1rem' }}>School</strong>
            Ranken Technical College
            <strong style={{ marginTop: '1rem' }}>Location</strong>
            St. Louis, MO
            <strong style={{ marginTop: '1rem' }}>Status</strong>
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Open to opportunities</span>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="section">
        <div className="section-header">
          <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2>About</h2>
        </div>

        <div className="about-grid">
          <div className="about-text fade-in">
            <p>
              I'm in my final semester at Ranken Technical College, graduating May 2026 with an
              A.A.S. in Information Technology — Application &amp; Web Development. Over the past two
              years I've designed and built full-stack applications spanning REST APIs, authentication
              systems, relational and document databases, and cloud deployment.
            </p>
            <p>
              I work across the MERN stack and C# MVC, with hands-on experience architecting backend
              pipelines with Node.js &amp; Express, designing database schemas, and deploying to
              Azure. I'm actively looking for an entry-level role where I can keep building real
              things.
            </p>
          </div>

          <div className="skills-block fade-in">
            <h3>Technical Skills</h3>
            {technicalSkills.map((skill) => (
              <div key={skill} className="skill-item">
                <span className="skill-dot" />
                {skill}
              </div>
            ))}

            <h3 style={{ marginTop: '2rem' }}>Tools &amp; Software</h3>
            <div className="tools-tags">
              {toolBadges.map((badge) => (
                <TechBadge key={badge.label} {...badge} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="section-header">
          <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h2>Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card fade-in">
              <div className="project-preview" style={{ background: '#000', padding: 0 }}>
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.92 }}
                />
              </div>
              <div className="project-body">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-number">{project.number}</span>
                </div>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag.label} {...tag} />
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    className="btn btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon size={13} />
                    View Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 Niah LeBlanc</p>
        <a href="NiahLeBlanc_Resume.pdf" download>
          Download Résumé ↓
        </a>
      </footer>
    </>
  )
}
