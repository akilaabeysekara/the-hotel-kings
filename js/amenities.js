
(() => {
  const SECTION_SELECTORS = ['#our-story', '#amenities-section', '#experience-section'];
  const REVEAL_SELECTOR = '.reveal';
  const THRESHOLD = 0.2;          
  const DEFAULT_STAGGER_S = 0.2; 
  const ONCE = false;             

  let observer;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      const section = entry.target;
      const items = section.querySelectorAll(REVEAL_SELECTOR);

      if (prefersReducedMotion) {
        items.forEach((el) => {
          el.classList.add('active');
          el.style.transition = 'none';
          el.style.transform = 'none';
          el.style.opacity = '1';
        });
        if (ONCE && observer) observer.unobserve(section);
        return;
      }

      if (entry.isIntersecting) {

        items.forEach((el, i) => {
          const stagger = parseFloat(el.dataset.stagger || DEFAULT_STAGGER_S);
          el.style.transitionDelay = (i * stagger) + 's';
          el.classList.add('active');
        });

        if (ONCE && observer) observer.unobserve(section);
      } else if (!ONCE) {

        items.forEach((el) => {
          el.classList.remove('active');
   
        });
      }
    });
  }

  function init(selectors = SECTION_SELECTORS) {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(handleIntersect, {
      threshold: THRESHOLD,
      root: null,
      rootMargin: '0px',
    });

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((sec) => observer.observe(sec));
    });
  }

  function destroy() {
    if (observer) observer.disconnect();
  }

  // Expose a tiny API if you need to re-init later
  window.SectionAnimator = { init, destroy };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
})();
