/* Illustrative architecture stages with keyboard and touch controls. */
(() => {
  const { select, selectAll, setPressed } = window.Portfolio;

  window.Portfolio.initArchitecture = function initArchitecture() {
    const deliveryStages = [
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
    const portfolioStages = [
      [
        '01 / BROWSER & DNS',
        'Start at the HTTPS domain.',
        'Route 53 resolves the portfolio domain. ACM supplies the certificate used by CloudFront. This describes the hosting design, not a live DNS or certificate check.',
      ],
      [
        '02 / CLOUDFRONT & OAC',
        'Control access at the origin.',
        'CloudFront serves the static site. Origin Access Control signs requests to a private S3 origin; the documented design blocks direct public bucket access.',
      ],
      [
        '03 / PRIVATE S3',
        'Deliver the versioned website files.',
        'The website package contains HTML, CSS, JavaScript, headshots and architecture assets. Preserve relative object paths when uploading through the existing distribution.',
      ],
      [
        '04 / CONTACT BACKEND',
        'Send a bounded contact request.',
        'The browser posts JSON to API Gateway. The documented Lambda/SES backend handles email. Current backend delivery and IAM configuration have not been independently verified.',
      ],
    ];
    let stages = deliveryStages;
    const labels = {
      delivery: [
        ['Source control', 'Git / GitHub'],
        ['Build & inspect', 'Actions / Trivy'],
        ['Package & store', 'Docker / ECR'],
        ['Run & observe', 'Runtime / logs'],
      ],
      portfolio: [
        ['Browser & DNS', 'Route 53 / ACM'],
        ['Edge & access', 'CloudFront / OAC'],
        ['Private origin', 'S3 / static files'],
        ['Contact backend', 'API / Lambda / SES'],
      ],
    };
    const nodes = selectAll('[data-stage]');
    const detail = select('#mapDetail');
    if (!nodes.length || !detail) return;

    // Change text safely; stage descriptions never become executable markup.
    const selectStage = (index) => {
      setPressed(nodes, nodes[index]);
      detail.querySelector('.eyebrow').textContent = stages[index][0];
      detail.querySelector('h3').textContent = stages[index][1];
      detail.querySelector('p').textContent = stages[index][2];
      detail
        .closest('.architecture-shell')
        .style.setProperty('--stage-progress', `${(index + 1) * 25}%`);
    };
    const modes = selectAll('[data-architecture-mode]');
    select('#architectureModes').hidden = false;
    modes.forEach((button) =>
      button.addEventListener('click', () => {
        const mode = button.dataset.architectureMode;
        stages = mode === 'portfolio' ? portfolioStages : deliveryStages;
        setPressed(modes, button);
        select('#mapTitle').textContent =
          mode === 'portfolio'
            ? 'BROWSER → EDGE → PRIVATE ORIGIN / API'
            : 'COMMIT → ARTIFACT → APPLICATION';
        nodes.forEach((node, index) => {
          node.querySelector('strong').textContent = labels[mode][index][0];
          node.querySelector('small').textContent = labels[mode][index][1];
        });
        selectStage(0);
      }),
    );
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
