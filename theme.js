/* Load before CSS to avoid flashing the wrong theme; storage may be blocked. */
(() => {
  document.documentElement.classList.add('js');
  let theme = 'dark';
  try {
    theme =
      localStorage.getItem('portfolio-theme') ||
      (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (_) {
    /* use the default */
  }
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
})();
