import About from './components/About'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import { navLinks, portfolio, projects, skills, timeline } from './data/portfolioData'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.11),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.06),_transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl" />

      <Navbar links={navLinks} brand={portfolio.name} />

      <main>
        <Hero profile={portfolio} />
        <About about={portfolio.about} skills={skills} />
        <Projects projects={projects} />
        <Experience timeline={timeline} />
        <Contact profile={portfolio} />
      </main>

      <Chatbot profile={portfolio} projects={projects} skills={skills} />
    </div>
  )
}

export default App
