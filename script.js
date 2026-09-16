(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const navLinks = document.querySelector('[data-nav-links]');

  const closeMenu = () => {
    if (!menuButton || !navLinks) return;
    navLinks.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  document.querySelectorAll('[data-faq-question]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      const indicator = button.querySelector('[data-faq-indicator]');
      if (indicator) indicator.textContent = open ? '−' : '+';
    });
  });

  const form = document.querySelector('[data-inquiry-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const company = String(data.get('company') || '').trim();
      const service = String(data.get('service') || '').trim();
      const contact = String(data.get('contact') || '').trim();
      const message = String(data.get('message') || '').trim();

      const lines = [
        'Hello Pincode, I would like to discuss a project.',
        '',
        `Name: ${name}`,
        company ? `Company: ${company}` : '',
        `Service: ${service}`,
        `Contact: ${contact}`,
        '',
        'Project details:',
        message
      ].filter(Boolean);

      const whatsappUrl = `https://wa.me/8801575412056?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
