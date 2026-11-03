/* AOS is optional enhancement: content stays visible without the library. */
(() => {
  window.Portfolio.initAnimations = () => {
    if (!window.AOS) return;

    // One reveal system serves generated pages; avoid nested animated parents.
    const targets = document.querySelectorAll(
      '.hero-copy > *, .section-heading, .project-card, .skill, .about-note, ' +
        '.timeline-row, .credential-card, .involvement-card, .architecture-shell, #contactForm, ' +
        '.case-header, .case-figure, .case-body > section, .resume-paper > section',
    );
    targets.forEach((target, index) => {
      if (target.hasAttribute('data-aos') || target.parentElement.closest('[data-aos]')) return;
      target.dataset.aos = 'fade-up';
      target.dataset.aosDelay = String((index % 3) * 50);
    });
    if (!document.querySelector('[data-aos]')) return;
    // Batch initialization classes before AOS reads element geometry. This avoids
    // interleaving class writes with layout reads across a long card collection.
    document.querySelectorAll('[data-aos]').forEach((target) => target.classList.add('aos-init'));

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let initialized = false;

    function updateMotion() {
      const root = document.documentElement;
      if (motion.matches) {
        root.classList.remove('aos-enabled');
        return;
      }

      try {
        if (!initialized) {
          window.AOS.init({
            duration: 750,
            easing: 'ease-out-cubic',
            once: true,
            offset: 45,
            mirror: false,
            // Generated content is static; filters refresh positions explicitly.
            disableMutationObserver: true,
          });
          initialized = true;
        } else {
          window.AOS.refresh();
        }
        root.classList.add('aos-enabled');
      } catch {
        // Failed animation setup must never hide page content.
        root.classList.remove('aos-enabled');
      }
    }

    updateMotion();
    motion.addEventListener('change', updateMotion);
    window.Portfolio.refreshAnimations = () => {
      if (initialized && !motion.matches) window.AOS.refreshHard();
    };
    // Keyboard focus must never land inside an invisible reveal container.
    document.addEventListener('focusin', (event) => {
      event.target.closest('[data-aos]')?.classList.add('aos-animate');
    });
  };
})();
