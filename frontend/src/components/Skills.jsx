import React from 'react';
import { useSmoothAnimation, useStaggeredAnimation } from '../hooks/useSmoothAnimation';
import 'devicon/devicon.min.css';

const Skills = () => {
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const skillsGridRef = useStaggeredAnimation([], { threshold: 0.2, staggerDelay: 0.1 });
  const infoCardsRef = useStaggeredAnimation([], { threshold: 0.3, staggerDelay: 0.2 });

  const skillsData = [
    {
      name: 'HTML',
      icon: 'devicon-html5-plain-wordmark'
    },
    {
      name: 'CSS',
      icon: 'devicon-css3-plain-wordmark'
    },
    {
      name: 'SCSS',
      icon: 'devicon-sass-original'
    },
    {
      name: 'JavaScript',
      icon: 'devicon-javascript-plain'
    },
    {
      name: 'React',
      icon: 'devicon-react-original'
    },
    {
      name: 'Express.js',
      icon: 'devicon-express-original'
    },
    {
      name: 'Node.js',
      icon: 'devicon-nodejs-plain'
    },
    {
      name: 'MongoDB',
      icon: 'devicon-mongodb-plain'
    },
    {
      name: 'GSAP',
      icon: 'custom-gsap',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      name: 'Three.js',
      icon: 'devicon-threejs-original'
    },
    {
      name: 'WebGL',
      icon: 'custom-webgl',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L20.764 8 12 11.764 3.236 8 12 4.236zM4 9.5v5l8 4 8-4v-5l-8 4-8-4z"/>
        </svg>
      )
    },
    {
      name: 'Socket.io',
      icon: 'devicon-socketio-original'
    },
    {
      name: 'Framer Motion',
      icon: 'custom-framer',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L20.764 8 12 11.764 3.236 8 12 4.236zM4 9.5v5l8 4 8-4v-5l-8 4-8-4z"/>
        </svg>
      )
    },
    {
      name: 'Java',
      icon: 'devicon-java-plain'
    },
    {
      name: 'Cursor AI',
      icon: 'custom-cursor',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M13.64 21.97a.99.99 0 0 1-1.33-.47l-2.18-4.74l-2.51 2.55c-.17.17-.4.22-.62.15a.5.5 0 0 1-.15-.9l3.63-3.69l-4.74-2.18a.99.99 0 0 1-.47-1.33a.99.99 0 0 1 1.33-.47l4.74 2.18l3.69-3.63a.5.5 0 0 1 .9.15a.5.5 0 0 1-.15.62l-2.55 2.51l2.18 4.74a.99.99 0 0 1-.47 1.33z"/>
        </svg>
      )
    },
    {
      name: 'VS Code',
      icon: 'devicon-vscode-plain'
    },
    {
      name: 'IntelliJ IDEA',
      icon: 'devicon-intellij-plain'
    },
    {
      name: 'Postman',
      icon: 'devicon-postman-plain'
    },
    {
      name: 'Thunder Client',
      icon: 'custom-thunder',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
          <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>
      )
    },
    {
      name: 'MongoDB Compass',
      icon: 'devicon-mongodb-plain'
    }
  ];

  return (
    <section id="skills" className="section skills">
      <h2 
        ref={titleRef}
        className="section-title fade-in"
      >
        Technical Skills
      </h2>
      
      <div 
        ref={skillsGridRef}
        className="skills-grid"
      >
        {skillsData.map((skill, index) => (
          <div 
            key={index} 
            className={`skill-card fade-in stagger-${(index % 5) + 1} hover-lift hover-scale`}
          >
            <div className="skill-image-container">
              {skill.customIcon ? (
                <div className="custom-icon">
                  {skill.customIcon}
                </div>
              ) : (
                <i className={`${skill.icon} skill-icon`}></i>
              )}
            </div>
            <h3 className="skill-name">{skill.name}</h3>
          </div>
        ))}
      </div>

      {/* Skills Info Section */}
      <div 
        ref={infoCardsRef}
        className="skills-info"
      >
        <div className="info-card fade-in stagger-1 hover-lift">
          <h3>Frontend Expertise</h3>
          <p>
            Proficient in modern frontend technologies including React, HTML5, CSS3, and SCSS. 
            I create responsive, accessible, and performant user interfaces that deliver 
            exceptional user experiences.
          </p>
        </div>
        
        <div className="info-card fade-in stagger-2 hover-lift">
          <h3>Backend Development</h3>
          <p>
            Experienced with Node.js, Express.js, and MongoDB to build scalable backend 
            services. I design RESTful APIs and implement efficient database solutions 
            for modern web applications.
          </p>
        </div>
        
        <div className="info-card fade-in stagger-3 hover-lift">
          <h3>Full-Stack Integration</h3>
          <p>
            Skilled in connecting frontend and backend systems seamlessly. I ensure 
            smooth data flow, proper error handling, and optimal performance across 
            the entire application stack.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
