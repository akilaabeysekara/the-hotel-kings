const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const reveals = entry.target.querySelectorAll('.reveal');

    if (entry.isIntersecting) {
      reveals.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.2) + 's';
        el.classList.add('active');
      });
    } else {
      reveals.forEach((el) => {
        el.classList.remove('active');
      });
    }
  });
}, {
  threshold: 0.2,          
  root: null,             
  rootMargin: '0px'
});

document
  .querySelectorAll('#our-story, #amenities-section, #experience-section')
  .forEach((section) => observer.observe(section));
