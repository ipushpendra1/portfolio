import React, { useRef, useState, useEffect, useCallback } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navbarRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', path: '/home', label: 'Home' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'skills', path: '/skills', label: 'Skills' },
    { id: 'projects', path: '/projects', label: 'Projects' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ];

  const getSectionIdFromTarget = useCallback((target) => {
    if (!target) return 'home';
    if (typeof target === 'string') {
      if (target.startsWith('#')) return target.slice(1);
      if (target.startsWith('/')) return target.replace(/^\//, '') || 'home';
      return target;
    }
    return 'home';
  }, []);

  const getPathFromSectionId = useCallback((id) => `/${id || 'home'}`,[ ]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((target, options = {}) => {
    const { updateHistory = true } = options;
    const sectionId = getSectionIdFromTarget(target);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      // Optimistically set active section immediately on click and update URL path
      setActiveSection(sectionId);
      if (updateHistory) {
        try {
          window.history.pushState(null, '', getPathFromSectionId(sectionId));
        } catch {
          // ignore
        }
      }
    }
    setIsMenuOpen(false);
  }, [getSectionIdFromTarget, getPathFromSectionId]);

  // Observe sections to highlight current nav item
  useEffect(() => {
    const sections = navLinks
      .map(link => document.getElementById(link.id))
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

  // Keep URL path in sync with the active section while scrolling
  useEffect(() => {
    if (!activeSection) return;
    if (isNavigatingRef.current) return;
    try {
      window.history.replaceState(null, '', getPathFromSectionId(activeSection));
    } catch {
      // ignore
    }
  }, [activeSection, getPathFromSectionId]);

  // On initial load, if there's a path, scroll to it; default '/' -> '/home'
  useEffect(() => {
    const { pathname } = window.location;
    const initialId = pathname === '/' ? 'home' : pathname.replace(/^\//, '') || 'home';
    // Normalize to clean path
    try {
      const normalizedPath = getPathFromSectionId(initialId);
      if (pathname !== normalizedPath) {
        window.history.replaceState(null, '', normalizedPath);
      }
    } catch {
      // ignore
    }
    isNavigatingRef.current = true;
    setActiveSection(initialId);
    setTimeout(() => {
      scrollToSection(initialId, { updateHistory: false });
      isNavigatingRef.current = false;
    }, 0);
  }, [getPathFromSectionId, scrollToSection]);

  // Handle back/forward navigation for path changes
  useEffect(() => {
    const onPopState = () => {
      const { pathname } = window.location;
      const id = pathname === '/' ? 'home' : pathname.replace(/^\//, '') || 'home';
      isNavigatingRef.current = true;
      scrollToSection(id, { updateHistory: false });
      setActiveSection(id);
      // Clear flag shortly after to allow future updates
      setTimeout(() => { isNavigatingRef.current = false; }, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [scrollToSection]);

  return (
    <nav 
      ref={navbarRef} 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <a 
            href="/home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('/home'); }}
            className="brand-font"
          >
            Pushpendra
          </a>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.path);
              }}
              className={`nav-link fade-in animate stagger-${index + 1} ${activeSection === link.id ? 'active' : ''}`}
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
