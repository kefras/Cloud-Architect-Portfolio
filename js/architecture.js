/* Illustrative architecture stages with keyboard and touch controls. */
(() => {
  const { select, selectAll, setPressed } = window.Portfolio;

  window.Portfolio.initArchitecture = function initArchitecture() {
    const stages = [
      [
        '01 / SOURCE CONTROL',
        'A reviewable starting point.',
        'Version code and configuration together. A commit identifies the source used to create a release artifact.',
      ],
      [
        '02 / BUILD & INSPECT',
        'Turn source into an artifact.',
        'CI builds the application and runs checks. A vulnerability report provides visibility; it only blocks a release if failure thresholds are enforced.',
      ],
      [
        '03 / PACKAGE & STORE',
        'Keep the artifact traceable.',
        'Docker packages the runtime. A registry such as ECR stores images. Commit tags help connect an image to the exact code that produced it.',
      ],
      [
        '04 / RUN & OBSERVE',
        'Deployment is another responsibility.',
        'A runtime starts the application; health checks, logs and metrics help explain its behavior. This stage is illustrative and is not verified by the ECR publication workflow.',
      ],
    ];
    const nodes = selectAll('[data-stage]');
    const detail = select('#mapDetail');
    if (!nodes.length || !detail) return;

    // Change text safely; stage descriptions never become executable markup.
    const selectStage = (index) => {
      setPressed(nodes, nodes[index]);
      detail.querySelector('.eyebrow').textContent = stages[index][0];
      detail.querySelector('h3').textContent = stages[index][1];
      detail.querySelector('p').textContent = stages[index][2];
    };
    nodes.forEach((node, index) => {
      node.addEventListener('click', () => selectStage(index));
      node.addEventListener('keydown', (event) => {
        const offsets = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (offsets[event.key]) {
          event.preventDefault();
          const next = (index + offsets[event.key] + nodes.length) % nodes.length;
          nodes[next].focus();
          selectStage(next);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : nodes.length - 1;
          nodes[next].focus();
          selectStage(next);
        }
      });
    });
  };
})();
