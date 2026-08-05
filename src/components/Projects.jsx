// Projects: data-driven project grid with placeholder images and external links.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Projects({ projects }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null
  const activeImages = activeProject?.images?.length ? activeProject.images : []
  const activeImage = activeImages[activeImageIndex] ?? activeImages[0]

  useEffect(() => {
    if (activeProjectIndex === null) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProjectIndex(null)
        return
      }

      if (!activeImages.length) {
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % activeImages.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex(
          (currentIndex) => (currentIndex - 1 + activeImages.length) % activeImages.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImages.length, activeProjectIndex])

  useEffect(() => {
    if (activeProjectIndex === null) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeProjectIndex])

  const openGallery = (projectIndex) => {
    setActiveProjectIndex(projectIndex)
    setActiveImageIndex(0)
  }

  const closeGallery = () => {
    setActiveProjectIndex(null)
    setActiveImageIndex(0)
  }

  const goToPreviousImage = () => {
    if (!activeImages.length) {
      return
    }

    setActiveImageIndex((currentIndex) => (currentIndex - 1 + activeImages.length) % activeImages.length)
  }

  const goToNextImage = () => {
    if (!activeImages.length) {
      return
    }

    setActiveImageIndex((currentIndex) => (currentIndex + 1) % activeImages.length)
  }

  const handleTouchStart = (event) => {
    event.currentTarget.dataset.touchStartX = String(event.touches[0]?.clientX ?? 0)
  }

  const handleTouchEnd = (event) => {
    const touchStartX = Number(event.currentTarget.dataset.touchStartX ?? '0')
    const touchEndX = event.changedTouches[0]?.clientX ?? 0
    const swipeDistance = touchEndX - touchStartX

    if (Math.abs(swipeDistance) < 48) {
      return
    }

    if (swipeDistance < 0) {
      goToNextImage()
    } else {
      goToPreviousImage()
    }
  }

  return (
    <section id="projects" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Projects
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected work and build samples.</h2>
          <p className="mt-5 text-base text-slate-600 sm:text-lg">
            Each card is powered by a simple array, so you can replace images, titles, links, or
            descriptions without touching the layout.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`group overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.1)] ${
                project.isPlaceholder ? 'border-dashed border-teal-200 bg-gradient-to-br from-teal-50 via-white to-slate-50' : 'border-slate-200'
              }`}
            >
              {project.isPlaceholder ? (
                <div className="flex h-56 items-center justify-center border-b border-dashed border-teal-100 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.12),_transparent_55%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,1))] p-6">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-teal-200 bg-white text-3xl text-teal-700 shadow-sm">
                      +
                    </div>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
                      Add new work
                    </p>
                    <p className="mt-2 text-sm text-slate-500">Ready for your next project entry.</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden border-b border-slate-100 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => openGallery(index)}
                    className="group/image relative block h-56 w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                    aria-label={`Open gallery for ${project.title}`}
                  >
                    <img
                      src={project.images?.[0] ?? project.imageSrc}
                      alt={project.imageAlt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover/image:scale-105"
                    />
                    {(project.images?.length ?? 0) > 1 ? (
                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-slate-950/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur sm:px-3 sm:py-2">
                        <span>View gallery</span>
                        <span>{project.images.length} images</span>
                      </div>
                    ) : (
                      <div className="absolute inset-x-4 bottom-4 rounded-full bg-slate-950/70 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur opacity-100 transition sm:opacity-0 sm:group-hover/image:opacity-100">
                        Open image
                      </div>
                    )}
                  </button>
                </div>
              )}

              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeGallery}
            role="presentation"
          >
            <motion.div
              className="relative flex h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-[0_30px_100px_rgba(15,23,42,0.55)] sm:h-auto sm:rounded-[1.75rem]"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                    Project gallery
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">{activeProject.title}</h3>
                </div>

                <button
                  type="button"
                  onClick={closeGallery}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  aria-label="Close gallery"
                >
                  <span className="text-2xl leading-none">×</span>
                </button>
              </div>

              <div
                className="relative flex min-h-[45vh] items-center justify-center bg-slate-900 px-3 py-4 sm:min-h-[68vh] sm:px-6"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {activeImages.length > 1 ? (
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white transition hover:bg-slate-950 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 sm:left-5"
                    aria-label="Previous image"
                  >
                    <span className="text-2xl leading-none">‹</span>
                  </button>
                ) : null}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    className="flex w-full items-center justify-center"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={activeImage}
                      alt={activeProject.imageAlt}
                      className="max-h-[52vh] w-full rounded-[1.25rem] object-contain sm:max-h-[74vh]"
                    />
                  </motion.div>
                </AnimatePresence>

                {activeImages.length > 1 ? (
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white transition hover:bg-slate-950 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 sm:right-5"
                    aria-label="Next image"
                  >
                    <span className="text-2xl leading-none">›</span>
                  </button>
                ) : null}
              </div>

              {activeImages.length > 1 ? (
                <div className="border-t border-white/10 bg-slate-950 px-3 py-3 sm:px-6 sm:py-4">
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    {activeImages.map((imageSrc, imageIndex) => (
                      <button
                        key={`${imageSrc}-${imageIndex}`}
                        type="button"
                        onClick={() => setActiveImageIndex(imageIndex)}
                        className={`overflow-hidden rounded-2xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                          imageIndex === activeImageIndex
                            ? 'border-teal-300 shadow-[0_0_0_1px_rgba(153,246,228,0.6)]'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Show image ${imageIndex + 1} of ${activeImages.length}`}
                        aria-current={imageIndex === activeImageIndex ? 'true' : 'false'}
                      >
                        <img
                          src={imageSrc}
                          alt={`${activeProject.title} thumbnail ${imageIndex + 1}`}
                          className="h-14 w-20 object-cover sm:h-20 sm:w-28"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default Projects