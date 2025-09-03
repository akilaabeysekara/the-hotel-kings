
(() => {
  const SECTION_SELECTOR = '[data-animate]';
  const REVEAL_SELECTOR  = '.reveal';
  const DEFAULT_STAGGER  = 0.1;   
  const REPLAY           = true;  
  const prefersReduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let revealIO;  
  let sectionMO;  

  function activate(el, i, groupStagger) {
    if (prefersReduced) {
      el.classList.add('active');
      el.style.transition = 'none';
      el.style.transform  = 'none';
      el.style.opacity    = '1';
      return;
    }
    const stagger = parseFloat(el.dataset.stagger || groupStagger || DEFAULT_STAGGER);
    el.style.transitionDelay = (i * stagger) + 's';
    el.classList.add('active');
  }

  function reset(el) {
    if (!REPLAY) return;
    el.classList.remove('active');

  }

  function initRevealObserver() {
    if (revealIO) revealIO.disconnect();

    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const section = el.closest(SECTION_SELECTOR);
        const groupStagger = section ? parseFloat(section.dataset.staggerGroup || DEFAULT_STAGGER) : DEFAULT_STAGGER;

        if (entry.isIntersecting) {
          const siblings = Array.from(section?.querySelectorAll(REVEAL_SELECTOR) || []);
          const index = Math.max(0, siblings.indexOf(el));
          activate(el, index, groupStagger);
          if (!REPLAY) revealIO.unobserve(el);
        } else {
          reset(el);
        }
      });
    }, {
      threshold: 0.1,              
      root: null,
      rootMargin: '0px 0px -10% 0px'
    });
  }

  function observeAllRevealsIn(section) {
    section.querySelectorAll(REVEAL_SELECTOR).forEach((el) => revealIO.observe(el));
  }

  function init() {
    initRevealObserver();

    document.querySelectorAll(SECTION_SELECTOR).forEach((section) => {
      observeAllRevealsIn(section);
    });

    if (sectionMO) sectionMO.disconnect();
    sectionMO = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches && node.matches(SECTION_SELECTOR)) {
            observeAllRevealsIn(node);
          }
          node.querySelectorAll && node.querySelectorAll(SECTION_SELECTOR).forEach(observeAllRevealsIn);
          node.querySelectorAll && node.querySelectorAll(`${SECTION_SELECTOR} ${REVEAL_SELECTOR}`).forEach((el) => {
            revealIO.observe(el);
          });
        });
      });
    });
    sectionMO.observe(document.body, { childList: true, subtree: true });
  }

  function destroy() {
    revealIO && revealIO.disconnect();
    sectionMO && sectionMO.disconnect();
  }

  window.SectionAnimator = { init, destroy };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
