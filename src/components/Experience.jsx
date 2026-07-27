// Experience: simple vertical timeline for work and education entries.
import { motion } from 'framer-motion'

function Experience({ timeline }) {
  return (
    <section id="experience" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Experience
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A timeline of work and study.</h2>
          <p className="mt-5 text-base text-slate-600 sm:text-lg">
            The timeline keeps the structure minimal while still giving visitors a fast scan of
            role, organization, dates, and a short summary.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={`${item.title}-${item.dateRange}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="grid gap-4 md:grid-cols-[170px_1fr] md:gap-6"
            >
              <div className="flex items-start md:justify-end">
                <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                  {item.label}
                </span>
              </div>

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <span className="absolute -left-2 top-7 hidden h-4 w-4 rounded-full border border-teal-600 bg-white md:block" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {item.dateRange}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">{item.organization}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience