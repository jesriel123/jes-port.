import { assetUrl } from '../utils/assetUrl'
import ojtTrackerImage from '../../image/OJT Tracker System.png'
import crossPlatformEcommerceImage from '../../image/Cross-Platform E-Commerce System.jpg'

export const portfolio = {
  name: 'Jesriel Poniente Coligado',
  role: 'Junior Software Engineer | Junior Web Developer',
  location: 'Liliw, Laguna',
  profileImageSrc: assetUrl('/profile.jpg'),
  intro:
    'I build clean, responsive web and mobile experiences with React, JavaScript, PHP, Supabase, and Firebase.',
  about:
    'Information Technology graduate with hands-on experience from internships and academic projects. I focus on turning practical requirements into simple, reliable interfaces with thoughtful UI, clear code, and solid debugging habits.',
  email: 'coligadojesriel343@gmail.com',
  phone: '0912-769-9024',
  availability:
    'Open to junior software roles, internships, and projects that value careful execution and collaboration.',
  githubUrl: 'https://github.com/your-username',
  linkedinUrl: 'https://www.linkedin.com/in/your-profile',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const skills = [
  'React',
  'React Native',
  'JavaScript',
  'Node.js',
  'Vite.js',
  'PHP',
  'Laravel',
  'Next.js',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Supabase',
  'Firebase',
  'SQL',
  'NoSQL',
  'REST APIs',
  'Authentication',
  'Git',
  'GitHub',
  'XAMPP',
  'Basic IT Support',
]

export const projects = [
  {
    title: 'OJT Tracker System',
    description:
      'A tracking platform for managing internship requirements, progress updates, and submissions across web and mobile interfaces.',
    techStack: ['React', 'React Native', 'Supabase'],
    images: [
      ojtTrackerImage,
      assetUrl('/ojt mobile 1.jpg'),
      assetUrl('/ojt mobile 2.jpg'),
      assetUrl('/ojt mobile 3.jpg'),
      assetUrl('/ojt mobile 4.jpg'),
      assetUrl('/ojt mobile 5.jpg'),
      assetUrl('/ojt mobile 6.jpg'),
    ],
    imageAlt: 'OJT Tracker System preview screenshot',
    githubUrl: '#',
  },
  {
    title: 'Cross-Platform E-Commerce System',
    description:
      'A responsive commerce concept with catalog browsing, backend integration, and a mobile-friendly purchase flow.',
    techStack: ['React Native', 'PHP', 'Firebase'],
    images: [
      crossPlatformEcommerceImage,
      assetUrl('/Cross-Platform E-Commerce System app 1.jpg'),
      assetUrl('/Cross-Platform E-Commerce System app 2.jpg'),
      assetUrl('/Cross-Platform E-Commerce System app 3.jpg'),
    ],
    imageAlt: 'Cross-Platform E-Commerce System screenshot',
    githubUrl: '#',
  },
  {
    title: 'Corporate Landing Page Design 1',
    description:
      'A polished corporate landing page concept focused on structure, visual clarity, and conversion-oriented section hierarchy.',
    techStack: ['HTML5', 'CSS3', 'Responsive Design'],
    images: [assetUrl('/corporate-landing-page-design-1.png')],
    imageAlt: 'Corporate Landing Page Design 1 screenshot',
    githubUrl: '#',
  },
  {
    title: 'Corporate Landing Page Design 2',
    description:
      'A second corporate landing page variation with a cleaner hero section, improved spacing, and stronger call-to-action placement.',
    techStack: ['HTML5', 'CSS3', 'Tailwind CSS'],
    images: [assetUrl('/corporate-landing-page-design-2.png')],
    imageAlt: 'Corporate Landing Page Design 2 screenshot',
    githubUrl: '#',
  },
  {
    title: 'Corporate Landing Page Design 3',
    description:
      'A third landing page build focused on modern visual hierarchy, responsive layout, and simple section storytelling.',
    techStack: ['React', 'Tailwind CSS', 'Responsive Design'],
    images: [assetUrl('/corporate-landing-page-design-3.png')],
    imageAlt: 'Corporate Landing Page Design 3 screenshot',
    githubUrl: '#',
  },
]

export const timeline = [
  {
    label: 'Experience',
    title: 'Junior Web Developer Intern',
    organization: 'Forbes Financial Consultancy Corp.',
    dateRange: 'February 27 - May 15, 2026',
    description:
      'Built and maintained internal company websites, developed responsive front-end features, assisted with PHP and Supabase backend tasks, and supported debugging and UI improvements.',
  },
  {
    label: 'Education',
    title: 'Bachelor of Science in Information Technology',
    organization: 'Philippine Women\'s University - CDCEC',
    dateRange: '2022 - 2026',
    description:
      'Completed core studies in software development, databases, web design, and application deployment while contributing to academic and internship projects.',
  },
  {
    label: 'Awards',
    title: 'Trainee of the Year and Web Development Recognition',
    organization: 'Forbes Financial Consultancy Corp. / PWU',
    dateRange: '2026',
    description:
      'Recognized for performance during internship training and for proficiency in web development work.',
  },
]