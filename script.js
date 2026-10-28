/* Page bootstrap. Feature implementations live in js/ and ignore absent controls. */
'use strict';

(() => {
  const portfolio = window.Portfolio;

  portfolio.initThemeToggle();
  portfolio.initNavigation();
  portfolio.initProjectFilters();
  portfolio.initArchitecture();
  portfolio.initContactForm();

  // Resume actions are shared with every page but activate only when present.
  portfolio.select('#printResume')?.addEventListener('click', () => window.print());
  portfolio.selectAll('.pdf-download').forEach((anchor) => {
    anchor.setAttribute('download', 'Kefas_Etiku_Francis_ATS_Resume.pdf');
  });
})();
