
(() => {
  let CONFIG = {
    sectionSelector: '[data-animate]',  
    revealSelector: '.reveal',          
    threshold: 0.2,                    
    defaultStagger: 0.2,               
    replay: true                       
  };

  let io; 
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function activate(section) {
    const items = section.querySelectorAll(CONFIG.revealSelector);
    const groupStagger = parseFloat(section.getAttribute('data-stagger-group') || CONFIG.defaultStagger);

    if (prefersReducedMotion) {
      items.forEach(el => {
        el.classList.add('active');
        el.style.transition = 'none';
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
      return;
    }

    items.forEach((el, i) => {
      const stagger = parseFloat(el.getAttribute('data-stagger') || groupStagger);
      el.style.transitionDelay = (i * stagger) + 's';
      el.classList.add('active');
    });
  }

  function reset(section) {
    const items = section.querySelectorAll(CONFIG.revealSelector);
    items.forEach(el => {
      el.classList.remove('active');
    });
  }

  function onIntersect(entries) {
    entries.forEach(entry => {
      const section = entry.target;
      const once = section.getAttribute('data-once') === 'true';     
      const replay = once ? false : CONFIG.replay;                  

      if (entry.isIntersecting) {
        activate(section);
        if (!replay) {
          io.unobserve(section); 
        }
      } else if (replay) {
        reset(section);          
      }
    });
  }

  function observeAll() {
    document.querySelectorAll(CONFIG.sectionSelector).forEach(sec => io.observe(sec));
  }

  function init(userConfig = {}) {
    CONFIG = { ...CONFIG, ...userConfig };

    if (io) io.disconnect();

    io = new IntersectionObserver(onIntersect, {
      threshold: CONFIG.threshold,
      root: null,
      rootMargin: '0px'
    });

    observeAll();

    const mo = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches && node.matches(CONFIG.sectionSelector)) {
            io.observe(node);
          }
          node.querySelectorAll && node.querySelectorAll(CONFIG.sectionSelector).forEach(sec => io.observe(sec));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.SectionAnimator = {
      init,
      refresh: () => { if (io) { io.disconnect(); io = new IntersectionObserver(onIntersect, { threshold: CONFIG.threshold }); observeAll(); } },
      observe: el => io && io.observe(el),
      unobserve: el => io && io.unobserve(el),
      config: () => ({ ...CONFIG })
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
})();
