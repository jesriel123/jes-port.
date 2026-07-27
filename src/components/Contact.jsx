// Contact: contact details plus a frontend-only form with simple validation.
import { useState } from 'react'
import { motion } from 'framer-motion'

const initialFormState = {
  name: '',
  email: '',
  message: '',
}

function Contact({ profile }) {
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Please add a short message.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('')
      return
    }

    setStatus('Thanks. Your message is ready to send once a backend or email service is connected.')
    setFormData(initialFormState)
  }

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let&apos;s build something useful.</h2>
          <p className="mt-5 text-base text-slate-600 sm:text-lg">
            The contact form is frontend-only for now, but the structure is ready for a backend or
            email integration later.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">Email</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">{profile.email}</p>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:bg-white"
                  placeholder="Your name"
                />
                {errors.name ? <span className="mt-2 block text-sm text-red-600">{errors.name}</span> : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:bg-white"
                  placeholder="you@example.com"
                />
                {errors.email ? <span className="mt-2 block text-sm text-red-600">{errors.email}</span> : null}
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-medium text-slate-700">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:bg-white"
                placeholder="Tell me about your project or opportunity."
              />
              {errors.message ? (
                <span className="mt-2 block text-sm text-red-600">{errors.message}</span>
              ) : null}
            </label>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 sm:w-auto"
              >
                Send Message
              </button>
            </div>

            {status ? <p className="mt-5 text-sm font-medium text-teal-700">{status}</p> : null}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact