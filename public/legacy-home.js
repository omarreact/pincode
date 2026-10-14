(() => {
  const q = (s, c = document) => c.querySelector(s);
  const qa = (s, c = document) => [...c.querySelectorAll(s)];

  const mega = q('[data-mega]');
  const menuButton = q('[data-menu-button]');
  const navTriggers = qa('[data-mega-trigger]');
  const ensureMobileNav = () => {
    if (!mega || !matchMedia('(max-width:900px)').matches || q('.mobile-primary', mega)) return;
    const source = q('.nav-links');
    const inner = q('.mega-inner', mega);
    if (!source || !inner) return;
    const block = document.createElement('div');
    block.className = 'mega-primary mobile-primary';
    block.innerHTML = '<div class="mega-label">Navigate</div>' + qa('a', source).map(a => `<a href="${a.getAttribute('href')}">${a.textContent.trim()}</a>`).join('');
    inner.prepend(block);
  };
  const closeMega = () => {
    mega?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    navTriggers.forEach(x => x.setAttribute('aria-expanded', 'false'));
  };
  const openMega = () => {
    ensureMobileNav();
    mega?.classList.add('open');
    menuButton?.setAttribute('aria-expanded', 'true');
  };
  menuButton?.setAttribute('aria-label', 'Open navigation');
  menuButton?.addEventListener('click', () => mega?.classList.contains('open') ? closeMega() : openMega());
  navTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', openMega);
    trigger.addEventListener('focus', openMega);
    trigger.addEventListener('click', e => {
      if (matchMedia('(max-width:900px)').matches) {
        e.preventDefault();
        mega?.classList.contains('open') ? closeMega() : openMega();
      }
    });
  });
  mega?.addEventListener('mouseleave', () => { if (!matchMedia('(max-width:900px)').matches) closeMega(); });
  mega?.addEventListener('click', e => { if (e.target.closest('a')) closeMega(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMega(); });
  document.addEventListener('click', e => {
    if (mega?.classList.contains('open') && !mega.contains(e.target) && !e.target.closest('[data-mega-trigger]') && !e.target.closest('[data-menu-button]')) closeMega();
  });

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 }) : null;
  qa('.reveal').forEach(el => revealObserver ? revealObserver.observe(el) : el.classList.add('visible'));

  qa('[data-scroller]').forEach(scroller => {
    const wrap = scroller.closest('.scroller-wrap') || document;
    q('[data-scroll-prev]', wrap)?.addEventListener('click', () => scroller.scrollBy({ left: -Math.min(scroller.clientWidth * .8, 500), behavior: 'smooth' }));
    q('[data-scroll-next]', wrap)?.addEventListener('click', () => scroller.scrollBy({ left: Math.min(scroller.clientWidth * .8, 500), behavior: 'smooth' }));
  });

  qa('[data-filter-group]').forEach(group => {
    const tabs = qa('[data-filter]', group);
    const cards = qa('[data-category]', group);
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => card.hidden = filter !== 'all' && card.dataset.category !== filter);
    }));
  });

  qa('.faq-item').forEach(item => {
    q('.faq-q', item)?.addEventListener('click', () => {
      const opening = !item.classList.contains('open');
      item.closest('.faq')?.querySelectorAll('.faq-item.open').forEach(x => x.classList.remove('open'));
      item.classList.toggle('open', opening);
      q('.faq-q', item)?.setAttribute('aria-expanded', opening ? 'true' : 'false');
    });
  });

  const modal = q('[data-modal]');
  const modalTitle = q('[data-modal-title]');
  const modalBody = q('[data-modal-body]');
  const modalCopy = {
    web: ['Web & Business Solutions', 'Responsive business websites, landing experiences and web applications designed around user journeys, performance and maintainable delivery.'],
    ecommerce: ['E-commerce Platforms', 'Storefront strategy, catalog structure, checkout journeys and maintainable commerce experiences built around how the business actually sells.'],
    performance: ['Performance Engineering', 'Technical review and targeted improvements across loading, rendering, assets, code delivery and perceived speed.'],
    security: ['Security & Reliability', 'Practical hardening, safer configuration, monitoring and maintenance patterns for websites and web infrastructure.'],
    support: ['Managed Website Care', 'Ongoing updates, fixes, monitoring and technical support so a website is maintained after launch instead of slowly degrading.'],
    transformation: ['Digital Improvement', 'Structured review of an existing digital presence to identify the highest-value improvements and turn them into an actionable roadmap.']
  };
  qa('[data-modal-open]').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    const copy = modalCopy[btn.dataset.modalOpen];
    if (!modal || !copy) return;
    modalTitle.textContent = copy[0];
    modalBody.textContent = copy[1];
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));
  const hideModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };
  q('[data-modal-close]')?.addEventListener('click', hideModal);
  modal?.addEventListener('click', e => { if (e.target === modal) hideModal(); });

  const builder = q('[data-builder]');
  if (builder) {
    const steps = qa('[data-builder-step]', builder);
    const bars = qa('[data-builder-progress] span', builder);
    const state = {};
    let current = 0;
    const render = () => {
      steps.forEach((s, i) => s.classList.toggle('active', i === current));
      bars.forEach((b, i) => b.classList.toggle('active', i <= current));
    };
    qa('[data-builder-option]', builder).forEach(opt => opt.addEventListener('click', () => {
      const step = opt.closest('[data-builder-step]');
      qa('[data-builder-option]', step).forEach(x => x.classList.remove('selected'));
      opt.classList.add('selected');
      state[step.dataset.key] = opt.dataset.value || opt.textContent.trim();
      if (current < steps.length - 1) { current += 1; render(); }
      else {
        const summary = q('[data-builder-summary]', builder);
        if (summary) summary.textContent = `Project: ${state.project || 'Digital project'} · Priority: ${state.priority || 'Not specified'} · Support: ${state.support || 'To discuss'}`;
      }
    }));
    q('[data-builder-back]', builder)?.addEventListener('click', () => { if (current > 0) { current--; render(); } });
    q('[data-builder-whatsapp]', builder)?.addEventListener('click', () => {
      const text = encodeURIComponent(`Hello Pincode, I'd like to discuss a project.\nProject: ${state.project || 'Not specified'}\nPriority: ${state.priority || 'Not specified'}\nSupport: ${state.support || 'Not specified'}`);
      window.open(`https://wa.me/8801575412056?text=${text}`, '_blank', 'noopener');
    });
    render();
  }

  qa('[data-inquiry-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Hello Pincode, I would like to discuss a project.',
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || 'Not provided'}`,
      `Service: ${data.get('service') || 'Not specified'}`,
      `Contact: ${data.get('contact') || ''}`,
      `Details: ${data.get('message') || ''}`
    ];
    window.open(`https://wa.me/8801575412056?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  }));

  const processLinks = qa('[data-process-link]');
  const processSections = qa('[data-process-section]');
  if (processLinks.length && processSections.length && 'IntersectionObserver' in window) {
    const processObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -50% 0px' });
    processSections.forEach(s => processObserver.observe(s));
  }

  qa('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();