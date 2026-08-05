// Navbar: sticky top navigation with desktop links and a mobile hamburger menu.
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Navbar({ links, brand }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const firstName = brand?.split(' ')[0] || 'Portfolio'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`sticky top-0 z-40 border-b border-slate-200/70 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-[0_10px_35px_rgba(15,23,42,0.07)]'
          : 'bg-white/70'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="group inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 transition hover:border-teal-200 hover:bg-white"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-bold uppercase tracking-[0.14em] text-white transition group-hover:bg-teal-700">
            {firstName.slice(0, 2)}
          </span>
          <span className="pr-1 text-sm font-semibold text-slate-800">{firstName}</span>
        </a>

        <nav className="ml-auto hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-teal-50 hover:text-teal-700"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-700"
          >
            Let&apos;s Talk
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-base font-medium text-slate-700 transition hover:border-teal-200 hover:bg-teal-50/70 hover:text-teal-700"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-base font-semibold text-white transition hover:bg-teal-700"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      ) : null}
    </motion.header>
  )
}

export default Navbar