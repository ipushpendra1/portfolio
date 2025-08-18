import { useEffect, useRef } from 'react';

export const useSmoothAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const { threshold = 0.1, rootMargin = '0px', animationClass = 'animate' } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationClass]);

  return elementRef;
};

export const useStaggeredAnimation = (items, options = {}) => {
  const containerRef = useRef(null);
  const { threshold = 0.1, rootMargin = '0px', staggerDelay = 0.1 } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in');
            
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, index * staggerDelay * 1000);
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [items, threshold, rootMargin, staggerDelay]);

  return containerRef;
};
