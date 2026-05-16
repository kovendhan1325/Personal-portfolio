'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    title: 'SmartGrid Portal',
    description: 'A comprehensive industrial audit and sustainability consulting platform built with React, TypeScript, and Capacitor. Features 100+ audit services, real-time booking, secure payments, and cross-platform deployment for CGSGreen Sustainergy Pvt. Ltd.',
    technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Capacitor'],
    category: 'Full-Stack App',
    gradient: 'from-green-500 to-emerald-600',
    link: 'https://smartgrid-portal-steel.vercel.app/',
    github: 'https://github.com/kovendhan1325/smartgrid-portal',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Weather Prediction Model',
    description: 'Built a machine learning model using scikit-learn to predict weather conditions based on historical data. Implemented data preprocessing, feature engineering, and model optimization to achieve high accuracy predictions.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    category: 'Machine Learning',
    gradient: 'from-cyan-500 to-blue-600',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'Mental Health Prediction System',
    description: 'Developed a comprehensive mental health prediction system using advanced ML techniques. The system analyzes various factors to provide early detection and insights for mental health assessment.',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Data Analysis', 'MySQL'],
    category: 'Data Science',
    gradient: 'from-purple-500 to-pink-600',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 glass rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
          
          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Category badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 text-xs font-mono bg-primary/20 text-primary rounded-full">
                {project.category}
              </span>
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {project.icon}
              </div>
            </div>

            {/* Project visual */}
            <div className={`flex-1 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5 mb-4`}>
              <div className="w-full h-full rounded-xl bg-card/90 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {project.title.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div className="text-xs text-muted-foreground">Click to flip</div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            
            {/* Tech preview */}
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs text-muted-foreground">
                  {tech}{project.technologies.indexOf(tech) < 2 ? ' /' : ''}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-primary">+{project.technologies.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 glass rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5`} />
          
          <div className="relative h-full p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-4 gradient-text">{project.title}</h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.link || project.github) && (
              <div className="flex gap-3 mb-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-3 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-3 py-2 text-xs border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            )}

            {/* Flip indicator */}
            <div className="text-center text-xs text-muted-foreground">
              Click to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Showcasing my work in machine learning and data science. Click on any card to see more details.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
