// Hero: concise intro block with primary actions and a profile placeholder.
import { motion } from 'framer-motion'
import { assetUrl } from '../utils/assetUrl'

function Hero({ profile }) {
  return (
    <section
      id="home"
      className="relative scroll-mt-28 overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] bg-[radial-gradient(circle_at_18%_22%,rgba(20,184,166,0.22),transparent_40%),radial-gradient(circle_at_80%_8%,rgba(15,23,42,0.09),transparent_38%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl lg:pr-8"
        >
          <p className="mb-5 inline-flex rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-medium text-teal-700 shadow-sm backdrop-blur">
            Available for junior roles and project work
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
            {profile.role}
          </p>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-teal-500 via-teal-300 to-transparent" />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-[0_18px_34px_rgba(15,23,42,0.22)] sm:w-auto"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-white hover:text-teal-700 sm:w-auto"
            >
              Contact Me
            </a>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[430px]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.6rem] bg-gradient-to-br from-teal-100/75 via-cyan-100/35 to-slate-100/80 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-5 top-8 hidden h-16 w-16 rounded-full border border-teal-200/80 bg-teal-100/60 sm:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 bottom-14 hidden h-12 w-12 rounded-full border border-slate-200/80 bg-white/80 sm:block"
          />

          <div className="relative overflow-hidden rounded-[2.35rem] border border-slate-200/80 bg-white/90 p-3 shadow-[0_28px_75px_rgba(15,23,42,0.14)] backdrop-blur">
            <div className="rounded-[1.9rem] border border-white/70 bg-slate-100 p-3">
              <div className="overflow-hidden rounded-[1.55rem] bg-white">
                <img
                  src={profile.profileImageSrc}
                  alt={`${profile.name} profile photo`}
                  className="h-[500px] w-full object-cover object-top sm:h-[560px]"
                  onError={(event) => {
                    event.currentTarget.src = assetUrl('/profile-placeholder.svg')
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero