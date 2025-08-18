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
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Socket.io'],
      liveUrl: 'https://github.com/ipushpendra1/Social-Media-fullStack',
      githubUrl: 'https://github.com/ipushpendra1/Social-Media-fullStack',
      featured: true
    },
    {
      title: 'Music Stream FullStack',
      description: 'Music streaming app with search, playlists, and media playback capabilities.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      technologies: ['MERN', 'REST APIs', 'Cloudinary', 'Tailwind CSS'],
      liveUrl: 'https://github.com/ipushpendra1/Music-Stream-Fullstack',
      githubUrl: 'https://github.com/ipushpendra1/Music-Stream-Fullstack',
      featured: true
    },
    {
      title: 'LuxMall 3D World',
      description: 'A 3D e-commerce mall where users can browse products in an immersive environment.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      technologies: ['React', 'Three.js', 'WebGL', 'Node.js', 'MongoDB'],
      liveUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      githubUrl: 'https://github.com/ipushpendra1/LuxMall-3D-World-',
      featured: true
    },
    {
      title: 'E-Commerce Frontend',
      description: 'Responsive frontend for an online store with product listings, cart, filters, and checkout.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      technologies: ['React', 'Redux', 'Styled Components', 'Tailwind CSS'],
      liveUrl: 'https://github.com/ipushpendra1/Frontend-e-commerce-',
      githubUrl: 'https://github.com/ipushpendra1/Frontend-e-commerce-',
      featured: true
    }
  ];

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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
