// Enhanced smooth scrolling utility
export const smoothScrollTo = (target, options = {}) => {
  const {
    duration = 800,
    easing = 'easeInOutCubic',
    offset = 0
  } = options;

  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easingFunctions = {
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeInCubic: t => t * t * t,
    easeOutQuart: t => 1 - Math.pow(1 - t, 4),
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  };

  const ease = easingFunctions[easing] || easingFunctions.easeInOutCubic;

  const animation = currentTime => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    window.scrollTo(0, startPosition + distance * ease(progress));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Scroll to top with smooth animation
export const scrollToTop = (duration = 600) => {
  smoothScrollTo(0, { duration, easing: 'easeOutCubic' });
};

// Scroll to element with offset
export const scrollToElement = (selector, offset = 80, duration = 800) => {
  smoothScrollTo(selector, { duration, easing: 'easeInOutCubic', offset });
};

// Parallax scroll effect
export const createParallaxEffect = (element, speed = 0.5) => {
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    element.style.transform = `translateY(${rate}px)`;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Smooth reveal on scroll
export const createRevealEffect = (elements, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'revealed'
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    { threshold, rootMargin }
  );

  elements.forEach(el => observer.observe(el));
  
  return observer;
};
