/* Accessible disclosure navigation and active section indication. */
(() => {
  const { select } = window.Portfolio;

  window.Portfolio.initNavigation = function initNavigation() {
    if (!select('#navigation') || !select('#navToggle')) return;
    const menuButton = select('#navToggle');
    const navigation = select('#navigation');
    const closeMenu = (restoreFocus = false) => {
      navigation?.removeAttribute('data-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (restoreFocus) menuButton?.focus();
    };
    menuButton?.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.dataset.open = String(open);
      if (open) navigation.querySelector('a')?.focus();
    });
    navigation?.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navigation?.dataset.open === 'true') closeMenu(true);
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav')) closeMenu();
    });
    navigation?.addEventListener('focusout', (event) => {
      if (
        event.relatedTarget &&
        !navigation.contains(event.relatedTarget) &&
        !menuButton.contains(event.relatedTarget)
      )
        closeMenu();
    });
    const desktop = matchMedia('(min-width: 860px)');
    desktop.addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });

    const sections = [...document.querySelectorAll('main > section[id]')];
    if (sections.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navigation.querySelectorAll('a').forEach((anchor) => {
              if (anchor.getAttribute('href') === '#' + entry.target.id)
                anchor.setAttribute('aria-current', 'location');
              else anchor.removeAttribute('aria-current');
            });
          });
        },
        { rootMargin: '-15% 0px -50% 0px', threshold: 0 },
      );
      sections.forEach((section) => observer.observe(section));
    }
  };
})();
