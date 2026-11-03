/* Project category filtering with an accessible result count. */
(() => {
  const { select, selectAll, setPressed } = window.Portfolio;

  window.Portfolio.initProjectFilters = function initProjectFilters() {
    const filters = selectAll('[data-filter]');
    const cards = selectAll('.project-card');
    const countLabel = select('#projectCount');
    if (!filters.length || !countLabel) return;

    filters.forEach((button) =>
      button.addEventListener('click', () => {
        setPressed(filters, button);
        let count = 0;
        cards.forEach((card) => {
          card.hidden =
            button.dataset.filter !== 'All' && card.dataset.category !== button.dataset.filter;
          if (!card.hidden) count++;
        });
        countLabel.textContent = `${count} project${count === 1 ? '' : 's'}`;
        requestAnimationFrame(() => window.Portfolio.refreshAnimations?.());
      }),
    );
  };
})();
