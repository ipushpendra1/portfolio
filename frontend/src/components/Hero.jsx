import React, { useRef } from 'react';
import { useSmoothAnimation } from '../hooks/useSmoothAnimation';

const Hero = () => {
  const heroRef = useRef(null);
  const floatingElementsRef = useRef(null);
  
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const subtitleRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const descriptionRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const buttonRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section ref={heroRef} className="hero section" id="home">
      <div className="hero-content">
        <h1 
          ref={titleRef} 
          className="hero-title fade-in stagger-1"
        >
          Hi, I'm [Pushpendra]
        </h1>
        <p 
          ref={subtitleRef} 
          className="hero-subtitle fade-in stagger-2"
        >
          Full-Stack Developer & UI/UX Enthusiast
        </p>
        <p 
          ref={descriptionRef} 
          className="hero-description fade-in stagger-3"
        >
          I create beautiful, functional, and user-centered digital experiences. 
          Passionate about clean code, innovative solutions, and turning ideas into reality.
        </p>
        <button 
          ref={buttonRef}
          onClick={scrollToProjects} 
          className="cta-button fade-in stagger-4 hover-lift hover-glow"
        >
          View My Work
        </button>
      </div>

      {/* Floating Elements */}
      <div ref={floatingElementsRef} className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  );
};

export default Hero;
