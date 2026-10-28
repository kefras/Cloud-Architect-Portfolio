/* One shared namespace keeps feature scripts reusable without leaking globals. */
window.Portfolio = {
  select(selector, root = document) {
    return root.querySelector(selector);
  },

  selectAll(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  },

  /** Keep selection state consistent for filters and architecture controls. */
  setPressed(items, selectedItem) {
    items.forEach((item) => {
      item.setAttribute('aria-pressed', String(item === selectedItem));
    });
  },
};
