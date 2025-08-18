import React from 'react';
import { useSmoothAnimation, useStaggeredAnimation } from '../hooks/useSmoothAnimation';
import 'devicon/devicon.min.css';

const Projects = () => {
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const subtitleRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const projectsGridRef = useStaggeredAnimation([], { threshold: 0.2, staggerDelay: 0.15 });
  const ctaRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });

  const projectsData = [
    {
      title: 'Social Media FullStack',
      description: 'Full-stack social media platform with authentication, posts, comments, likes, and real-time interactions.',
      image: 'https://images.unsplash.com/photo-1698512144620-b587a49cee5b?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Socket.io'],
      liveUrl: 'https://github.com/ipushpendra1/Social-Media-fullStack',
      githubUrl: 'https://github.com/ipushpendra1/Social-Media-fullStack',
      featured: true
    },
    {
      title: 'Music Stream FullStack',
      description: 'Music streaming app with search, playlists, and media playback capabilities.',
      image: 'https://images.unsplash.com/photo-1602454008298-6372cf149759?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      technologies: ['MERN', 'REST APIs', 'Cloudinary', 'Tailwind CSS'],
      liveUrl: 'https://github.com/ipushpendra1/Music-Stream-Fullstack',
      githubUrl: 'https://github.com/ipushpendra1/Music-Stream-Fullstack',
      featured: true
    },
    {
      title: 'LuxMall 3D World',
      description: 'A 3D e-commerce mall where users can browse products in an immersive environment.',
      image: 'https://i.pinimg.com/736x/e2/9c/f1/e29cf14f10f48e891b795819c44b75f6.jpg',
      technologies: ['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'],
      liveUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      githubUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      featured: true
    },
    {
      title: 'Planets-in-3D',
      description: 'Three.js-based interactive solar system showcasing orbiting planets with realistic textures, lighting, and animations.',
      image: 'https://i.pinimg.com/736x/09/c8/52/09c852a8e15012d364e5ca45dddf1719.jpg',
      technologies: ['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'],
      liveUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      githubUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      featured: true
    },
    {
      title: 'E-Commerce Frontend',
      description: 'Responsive frontend for an online store with product listings, cart, filters, and checkout.',
      image: 'https://i.pinimg.com/736x/e8/a9/bc/e8a9bc4846cc4a709ec0859572d8cbd8.jpg',
      technologies: ['React', 'Redux', 'Styled Components', 'Tailwind CSS'],
      liveUrl: 'https://github.com/ipushpendra1/Frontend-e-commerce-',
      githubUrl: 'https://github.com/ipushpendra1/Frontend-e-commerce-',
      featured: true
    }
  ];

  const scrollToContact = (e) => {
    e.preventDefault();
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.offsetTop - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      try {
        window.history.pushState(null, '', '/contact');
      } catch {
        // ignore
      }
    }
  };

  return (
    <section id="projects" className="section projects">
      <div className="section-header">
        <h2 
          ref={titleRef}
          className="section-title fade-in"
        >
          Featured Projects
        </h2>
        <p 
          ref={subtitleRef}
          className="section-subtitle fade-in stagger-1"
        >
          Here are my main projects that showcase my full-stack development skills and passion for creating innovative digital experiences.
        </p>
      </div>

      <div 
        ref={projectsGridRef}
        className="projects-grid"
      >
        {projectsData.map((project, index) => (
          <div 
            key={index} 
            className={`project-card featured fade-in stagger-${(index % 4) + 1} hover-lift`}
          >
            <div className="project-image">
              <img 
                src={project.image} 
                alt={project.title}
                className="project-img hover-scale"
              />
              <div className="project-overlay">
                <div className="project-links">
                  <a 
                    href={project.liveUrl} 
                    className="project-link live-link hover-glow" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="devicon-chrome-plain link-icon"></i>
                    Live Demo
                  </a>
                  <a 
                    href={project.githubUrl} 
                    className="project-link github-link hover-glow" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="devicon-github-original link-icon"></i>
                    View Code
                  </a>
                </div>
              </div>
            </div>
            
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="featured-badge">Featured</span>
              </div>
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="technology-tag hover-scale"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div 
        ref={ctaRef}
        className="projects-cta fade-in"
      >
        <p>Interested in working together? Let's discuss your project!</p>
        <a 
          href="#contact" 
          className="cta-button hover-lift hover-glow"
          onClick={scrollToContact}
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default Projects;
