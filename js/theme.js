/* Theme toggle controls. The initial theme is applied earlier by theme.js. */
(() => {
  const { select } = window.Portfolio;

  window.Portfolio.initThemeToggle = function initThemeToggle() {
    const themeButton = select('#themeToggle');
    const updateThemeLabel = () =>
      themeButton?.setAttribute(
        'aria-label',
        `Switch to ${document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'} theme`,
      );
    updateThemeLabel();
    themeButton?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('portfolio-theme', next);
      } catch (_) {
        /* theme still works */
      }
      updateThemeLabel();
    });
  };
})();
