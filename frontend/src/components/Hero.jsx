import React, { useEffect, useRef } from 'react';
import { useSmoothAnimation } from '../hooks/useSmoothAnimation';
import { scrollToElement } from '../utils/smoothScroll';

const Hero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const themeRef = useRef(false); // false: light, true: dark
  
  // Smooth animations
  const titleRef = useSmoothAnimation({ threshold: 0.3 });
  const subtitleRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const descriptionRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });
  const buttonRef = useSmoothAnimation({ threshold: 0.3, animationClass: 'animate' });

  const scrollToProjects = () => {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const top = projectsSection.offsetTop - navbarHeight;
      window.scrollTo({ top, behavior: 'auto' });
    }
  };

  // Interactive particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getIsDark = () => {
      const attr = document.documentElement.getAttribute('data-theme');
      if (attr) return attr === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };
    themeRef.current = getIsDark();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const numParticles = Math.min(140, Math.floor((canvas.clientWidth * canvas.clientHeight) / 12000));
      particlesRef.current = Array.from({ length: numParticles }).map(() => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        size: 1 + Math.random() * 3,
        hue: 200 + Math.random() * 80,
        alpha: 0.35 + Math.random() * 0.35,
        angle: Math.random() * Math.PI * 2,
        turnSpeed: (Math.random() * 2 - 1) * 0.02,
        drift: 0.05,
      }));
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const handleClick = () => {
      // Small burst
      const { x, y } = mouseRef.current;
      for (let i = 0; i < 16; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: 1 + Math.random() * 2,
          hue: 260 + Math.random() * 100,
          alpha: 0.6,
        });
      }
    };

    const update = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Background subtle fade trail
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, width, height);

      // Interaction parameters
      const influenceRadius = 120;
      const connectDistance = 110;
      const frictionActive = 0.96;
      const frictionIdle = 0.85;

      // Draw connections
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Mouse interaction: attract/repel depending on left/right half
        if (!prefersReducedMotion && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          if (dist < influenceRadius) {
            const force = (1 - dist / influenceRadius);
            const direction = mouse.x < width / 2 ? -1 : 1; // left: attract, right: repel
            p.vx += direction * (-dx / dist) * force * 0.22;
            p.vy += direction * (-dy / dist) * force * 0.22;
          }
        } else {
          // Gentle autonomous drift when mouse is inactive
          p.vx += Math.cos(p.angle) * p.drift;
          p.vy += Math.sin(p.angle) * p.drift;
          p.angle += p.turnSpeed;
        }

        // Integrate
        const friction = mouse.active ? frictionActive : frictionIdle;
        p.vx *= friction;
        p.vy *= friction;

        // Clamp idle speed to a slow drift
        if (!mouse.active) {
          const speed = Math.hypot(p.vx, p.vy);
          const maxIdleSpeed = 0.8;
          if (speed > maxIdleSpeed) {
            const scale = maxIdleSpeed / (speed || 1);
            p.vx *= scale;
            p.vy *= scale;
          }
        }
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        const isDark = themeRef.current;
        const particleAlpha = isDark ? p.alpha : Math.min(0.9, p.alpha + 0.25);
        const particleLightness = isDark ? '60%' : '35%';
        ctx.fillStyle = `hsla(${p.hue}, 85%, ${particleLightness}, ${particleAlpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections after particles for glow
      const isDark = themeRef.current;
      ctx.lineWidth = isDark ? 1 : 2;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDistance) {
            const t = 1 - dist / connectDistance;
            const base = isDark ? [140, 160, 255] : [60, 80, 140];
            const alpha = isDark ? t * 0.25 : t * 0.45;
            ctx.strokeStyle = `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(update);
    };

    const setup = () => {
      handleResize();
      initParticles();
      update();
    };

    setup();
    // Observe theme changes
    const observer = new MutationObserver(() => {
      themeRef.current = getIsDark();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const darkMq = window.matchMedia('(prefers-color-scheme: dark)');
    const mqListener = () => { themeRef.current = getIsDark(); };
    if (darkMq.addEventListener) darkMq.addEventListener('change', mqListener);
    else if (darkMq.addListener) darkMq.addListener(mqListener);
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      if (darkMq.removeEventListener) darkMq.removeEventListener('change', mqListener);
      else if (darkMq.removeListener) darkMq.removeListener(mqListener);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero section" id="home">
      <div className="hero-content">
        <h1 
          ref={titleRef} 
          className="hero-title fade-in stagger-1"
        >
          Hi, I'm<br /> [ <span className="brand-font">Pushpendra</span> ]
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

      {/* Removed floating circles for a cleaner look */}

      {/* Interactive Canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />
    </section>
  );
};

export default Hero;
