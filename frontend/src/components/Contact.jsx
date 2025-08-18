import React, { useRef } from 'react';
import { useSmoothAnimation, useStaggeredAnimation } from '../hooks/useSmoothAnimation';
import 'devicon/devicon.min.css';
import { Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  const contactRef = useRef(null);
  
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const subtitleRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const contactInfoRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const formRef = useStaggeredAnimation([], { threshold: 0.3, staggerDelay: 0.1 });

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ipushpendra1',
      icon: 'devicon-github-original'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pushpendra-kumar-a92302257/',
      iconComponent: Linkedin
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Pushpen04860270',
      icon: 'devicon-twitter-original'
    },
    {
      name: 'Email',
      url: 'mailto:pushpendra090804@gmail.com',
      icon: 'devicon-google-original'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_ipushpendra/',
      iconComponent: Instagram
    }

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <section id="contact" ref={contactRef} className="section contact">
      <h2 
        ref={titleRef}
        className="section-title fade-in"
      >
        Get In Touch
      </h2>
      <p 
        ref={subtitleRef}
        className="section-subtitle fade-in stagger-1"
      >
        I'm always interested in hearing about new opportunities and exciting projects.
      </p>

      <div className="contact-content">
        <div 
          ref={contactInfoRef}
          className="contact-info fade-in stagger-2"
        >
          <h3>Let's Connect</h3>
          <p>
            Whether you have a question about my work, want to discuss a potential 
            collaboration, or just want to say hello, I'd love to hear from you.
          </p>
          
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-link fade-in animate stagger-${index + 3} hover-lift hover-glow`}
              >
                {link.iconComponent ? (
                  <link.iconComponent className="social-icon" size={20} />
                ) : (
                  <i className={`${link.icon} social-icon`}></i>
                )}
                <span className="social-name">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <form 
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group fade-in stagger-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="form-input hover-glow"
            />
          </div>

          <div className="form-group fade-in stagger-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-input hover-glow"
            />
          </div>
          

          <div className="form-group fade-in stagger-3">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="form-input hover-glow"
            />
          </div>

          <div className="form-group fade-in stagger-4">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="form-textarea hover-glow"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-button fade-in stagger-5 hover-lift hover-glow"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
