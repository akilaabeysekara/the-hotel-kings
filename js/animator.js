
(() => {
  const SECTION_SELECTOR = '[data-animate]';
  const REVEAL_SELECTOR  = '.reveal';
  const TRIGGER          = 0.5;   // 50% of viewport height
  const REPLAY           = true;
  const prefersReduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ticking = false;
  const sections = [];

  function activateSection(section) {
    const items = section.querySelectorAll(REVEAL_SELECTOR);

    if (prefersReduced) {
      items.forEach(el => {
        el.classList.add('active');
        el.style.transition = 'none';
        el.style.transform  = 'none';
        el.style.opacity    = '1';
      });
      section._animActive = true;
      return;
    }

    // Reset first (for replay)
    items.forEach(el => el.classList.remove('active'));

    // Force reflow
    section.offsetWidth;

    // Next frame: add active to all items at once
    requestAnimationFrame(() => {
      items.forEach(el => el.classList.add('active'));
      section._animActive = true;
    });
  }

  function resetSection(section) {
    if (!REPLAY) return;
    section.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
      el.classList.remove('active');
    });
    section._animActive = false;
  }

  function sectionHitsTrigger(section) {
    const rect = section.getBoundingClientRect();
    const vh   = window.innerHeight || document.documentElement.clientHeight;
    const line = vh * TRIGGER;
    return rect.top <= line && rect.bottom >= line;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      sections.forEach(sec => {
        const hit = sectionHitsTrigger(sec);
        if (hit && !sec._animActive) {
          activateSection(sec);
        } else if (!hit && sec._animActive) {
          resetSection(sec);
        }
      });
      ticking = false;
    });
  }

  function init() {
    document.querySelectorAll(SECTION_SELECTOR).forEach(sec => sections.push(sec));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }


  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
