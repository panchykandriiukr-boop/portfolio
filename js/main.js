/* Portfolio — small progressive-enhancement script. No dependencies. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header shadow on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Reveal on scroll */
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* Toast */
  const toast = document.querySelector('.toast');
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.querySelector('span').textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
  };

  /* Copy email */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try { await navigator.clipboard.writeText(value); showToast('Email copied to clipboard'); }
      catch { window.location.href = 'mailto:' + value; }
    });
  });

  /* Hover preview that follows the cursor (project rows) */
  const peek = document.querySelector('.peek');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (peek && fine && !reduce) {
    const ph = peek.querySelector('.ph');
    const label = peek.querySelector('[data-peek-label]');
    let x = 0, y = 0, tx = 0, ty = 0, raf = null;
    const tick = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      peek.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${(tx - x) * 0.04}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : null;
    };
    const move = (e) => { tx = e.clientX + 24; ty = e.clientY - 90; if (!raf) raf = requestAnimationFrame(tick); };
    document.querySelectorAll('[data-peek]').forEach((row) => {
      row.addEventListener('mouseenter', (e) => {
        ph.className = 'ph ' + (row.dataset.peekTone || '');
        label.textContent = row.dataset.peek;
        x = tx = e.clientX + 24; y = ty = e.clientY - 90;
        peek.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        peek.classList.add('is-on');
      });
      row.addEventListener('mousemove', move);
      row.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
    });
  }

  /* Work filters */
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.work-card');
  if (filters.length) {
    filters.forEach((btn) => btn.addEventListener('click', () => {
      const tag = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cards.forEach((card) => {
        const show = tag === 'all' || card.dataset.tags.split(' ').includes(tag);
        if (show) {
          card.hidden = false;
          requestAnimationFrame(() => card.classList.remove('is-out'));
        } else {
          card.classList.add('is-out');
          setTimeout(() => { if (card.classList.contains('is-out')) card.hidden = true; }, reduce ? 0 : 320);
        }
      });
      const n = [...cards].filter((c) => tag === 'all' || c.dataset.tags.split(' ').includes(tag)).length;
      const live = document.getElementById('filter-status');
      if (live) live.textContent = `${n} project${n === 1 ? '' : 's'} shown`;
    }));
  }
})();
