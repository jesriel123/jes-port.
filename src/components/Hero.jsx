// Hero: concise intro block with primary actions and a profile placeholder.
import { motion } from 'framer-motion'
import { assetUrl } from '../utils/assetUrl'

function Hero({ profile }) {
  return (
    <section id="home" className="scroll-mt-28 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
            Available for junior roles and project work
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-700 sm:text-xl">{profile.role}</p>
          <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg">{profile.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 sm:w-auto"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:text-teal-700 sm:w-auto"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              {profile.location}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              React + Tailwind
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              Clean, responsive UI
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <img
                src={profile.profileImageSrc}
                alt={`${profile.name} profile photo`}
                className="h-auto w-full rounded-[1.35rem] border border-slate-200 bg-white object-cover"
                onError={(event) => {
                  event.currentTarget.src = assetUrl('/profile-placeholder.svg')
                }}
              />
            </div>
            <div className="p-2 pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
                Location
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.location}</p>
              <p className="mt-3 text-sm text-slate-600">
                Focused on straightforward interfaces, careful implementation, and clear user flows.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero