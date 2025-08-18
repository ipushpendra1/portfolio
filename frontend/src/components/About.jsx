import React, { useRef } from 'react';
import { useSmoothAnimation, useStaggeredAnimation } from '../hooks/useSmoothAnimation';

const About = () => {
  const aboutRef = useRef(null);
  
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const descriptionRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const descriptionRef2 = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const statsRef = useStaggeredAnimation([], { threshold: 0.3, staggerDelay: 0.15 });
  const imageRefAnimated = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });

  const stats = [
    { number: '1.7+', label: 'Years of Experience' },
    { number: '20+', label: 'Projects (minor & major)' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section id="about" ref={aboutRef} className="section about">
      <div className="about-content">
        <div className="about-text">
          <h2 
            ref={titleRef}
            className="section-title fade-in"
          >
            About Me
          </h2>
          <p 
            ref={descriptionRef}
            className="about-description fade-in stagger-1"
          >
            I'm a passionate full-stack developer with a love for creating beautiful, 
            functional, and user-centered digital experiences. With expertise in modern 
            web technologies, I bring ideas to life through clean code and innovative solutions.
          </p>
          
          <p 
            ref={descriptionRef2}
            className="about-description fade-in stagger-2"
          >
            My journey in web development started with curiosity and has evolved into 
            a passion for building applications that make a difference. I believe in 
            writing maintainable code, following best practices, and staying updated 
            with the latest industry trends.
          </p>

          <div 
            ref={statsRef}
            className="stats-grid"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`stat-item fade-in stagger-${index + 3} hover-lift`}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-image">
          <img 
            ref={imageRefAnimated}
            src="/profile2.png"
            alt="Profile"
            className="profile-image scale-in hover-scale"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div 
            className="profile-placeholder" 
            style={{ display: 'none' }}
          >
            <div className="placeholder-content">
              <span className="placeholder-icon">👤</span>
              <p>Profile Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
