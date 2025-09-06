document.querySelectorAll('.reserve-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const modalEl = document.getElementById('reserveModal');
    const iframe  = document.getElementById('reserveFrame');
    iframe.src = this.getAttribute('href'); 
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    
    const resize = () => {
      try {
        const doc = iframe.contentWindow.document;
        const h = Math.min(doc.documentElement.scrollHeight, window.innerHeight * 0.9);
        iframe.style.height = h + 'px';
      } catch (_) {
      }
    };
    iframe.addEventListener('load', resize, { once: true });
    window.addEventListener('resize', resize);

    modalEl.addEventListener('hidden.bs.modal', () => {
      iframe.src = '';
      window.removeEventListener('resize', resize);
    }, { once: true });
  });
});
