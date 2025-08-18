import React, { useRef, useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      // Optimistically set active section immediately on click
      const id = href.startsWith('#') ? href.slice(1) : href;
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  // Observe sections to highlight current nav item
  useEffect(() => {
    const sections = navLinks
      .map(link => document.querySelector(link.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    let mostVisibleId = activeSection;
    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry with highest intersection ratio
        let highest = 0;
        let currentId = mostVisibleId;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= highest) {
            highest = entry.intersectionRatio;
            currentId = entry.target.id;
          }
        });
        if (currentId && currentId !== mostVisibleId) {
          mostVisibleId = currentId;
          setActiveSection(currentId);
        }
      },
      {
        root: null,
        // Focus around viewport center to determine active section
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav 
      ref={navbarRef} 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <a 
            href="#home" 
            onClick={() => scrollToSection('#home')}
            className="brand-font"
          >
            Pushpendra
          </a>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`nav-link fade-in animate stagger-${index + 1} ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
