/* Project cloud adapted from w-r-s/academic-homepage-template. */
(function() {
                const container = document.getElementById('tagcloud-container');
                // Custom project list
                const myProjects = [
 { name: "ForgeTrain", html_url: "https://github.com/OpenBMB/ForgeTrain" },
 { name: "MiniCPM 5", html_url: "https://github.com/OpenBMB/MiniCPM" },
 { name: "Leanabell-Prover-V2", html_url: "https://github.com/Leanabell-LM/Leanabell-Prover-V2" }
];

                function initTagCloud(projects) {
                    container.innerHTML = '';
                    const tags = [];
                    // Base radius for calculations (height-based to keep it fitting)
                    const r = Math.min(container.offsetWidth, container.offsetHeight) / 2 * 0.8;
                    // X-stretch factor for ellipsoid shape
                    const stretchX = Math.min(1.5, container.offsetWidth / 500);
                    
                    projects.forEach(p => {
                        const el = document.createElement('a');
                        el.href = p.html_url;
                        el.rel = 'noopener';
                        el.className = 'tagcloud-item';
                        // Repository names are always available without a remote API.
                        el.textContent = p.name;
                        el.style.color = '#444';
                        
                        container.appendChild(el);
                        tags.push({ el: el, x: 0, y: 0, z: 0 });
                    });

                    let angleX = 0.001;
                    let angleY = 0.001;
                    let isHovering = false;
                    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                    // Initial positions - Golden Spiral distribution on sphere
                    const len = tags.length;
                    for(let i=0; i<len; i++) {
                        const phi = Math.acos(-1 + (2 * i + 1) / len);
                        const theta = Math.sqrt(len * Math.PI) * phi;
                        tags[i].x = r * Math.cos(theta) * Math.sin(phi);
                        tags[i].y = r * Math.sin(theta) * Math.sin(phi);
                        tags[i].z = r * Math.cos(phi);
                    }

                    let animationId = null;
                    let isVisible = true;

                    function rotate() {
                        animationId = null;
                        if (!isVisible) return;
                        if (!isHovering && !reducedMotion) {
                            const cosX = Math.cos(angleX);
                            const sinX = Math.sin(angleX);
                            const cosY = Math.cos(angleY);
                            const sinY = Math.sin(angleY);

                            tags.forEach(tag => {
                                // Rotate around X-axis
                                let y = tag.y * cosX - tag.z * sinX;
                                let z = tag.z * cosX + tag.y * sinX;
                                tag.y = y;
                                tag.z = z;

                                // Rotate around Y-axis
                                let x = tag.x * cosY - tag.z * sinY;
                                z = tag.z * cosY + tag.x * sinY;
                                tag.x = x;
                                tag.z = z;
                            });
                        }

                        tags.forEach(tag => {
                            const perspective = 2 * r;
                            const scale = perspective / (perspective - tag.z);
                            const alpha = (tag.z + r) / (2 * r);
                            
                            // Apply stretchX here to create ellipsoid shape visually
                            const width = container.offsetWidth;
                            const height = container.offsetHeight;
                            const halfWidth = tag.el.offsetWidth * scale / 2;
                            const halfHeight = tag.el.offsetHeight * scale / 2;
                            const centerX = Math.max(halfWidth, Math.min(width - halfWidth, width / 2 + tag.x * Math.min(stretchX, width / 500)));
                            const centerY = Math.max(halfHeight, Math.min(height - halfHeight, height / 2 + tag.y));
                            tag.el.style.left = centerX - tag.el.offsetWidth / 2 + 'px';
                            tag.el.style.top = centerY - tag.el.offsetHeight / 2 + 'px';
                            tag.el.style.transform = `scale(${scale})`;
                            tag.el.style.opacity = Math.max(0.2, alpha);
                            tag.el.style.zIndex = Math.round(scale * 100);
                        });
                        if (!reducedMotion) animationId = requestAnimationFrame(rotate);
                    }

                    function setVisible(visible) {
                        isVisible = visible;
                        if (visible && animationId === null) {
                            animationId = requestAnimationFrame(rotate);
                        }
                    }
                    
                    container.addEventListener('mouseenter', () => {
                        isHovering = true;
                    });
                    
                    container.addEventListener('mouseleave', () => {
                        isHovering = false;
                    });
                    container.addEventListener('focusin', () => { isHovering = true; });
                    container.addEventListener('focusout', () => { isHovering = false; });
                    window.addEventListener('resize', () => {
                        if (reducedMotion) rotate();
                    }, { passive: true });

                    angleX = 0.002;
                    angleY = 0.002;
                    if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver(entries => {
                            setVisible(entries[0].isIntersecting);
                        }, { rootMargin: '120px' });
                        observer.observe(container);
                    }
                    setVisible(true);
                }

                function loadProjects() {
                    initTagCloud(myProjects);
                }

                loadProjects();
            })();
        

/* Publication filtering, news disclosure, author lists and page navigation. */
(() => {
  const rows = [...document.querySelectorAll('tr[data-tags]')];
  const buttons = [...document.querySelectorAll('.tag-btn')];
  const status = document.getElementById('filter-status');
  buttons.forEach(button => {
    const count = button.dataset.tag === 'all' ? rows.length : rows.filter(row => row.dataset.tags.split(',').includes(button.dataset.tag)).length;
    const badge = document.createElement('span');
    badge.className = 'tag-count';
    badge.textContent = count;
    badge.setAttribute('aria-hidden', 'true');
    button.appendChild(badge);
  });
  document.getElementById('tagFilter').addEventListener('click', event => {
    const button = event.target.closest('.tag-btn');
    if (!button) return;
    const tag = button.dataset.tag;
    document.getElementById('publications').classList.toggle('publications-gallery', tag === 'all');
    buttons.forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visible = 0;
    rows.forEach(row => {
      const show = tag === 'all' || row.dataset.tags.split(',').includes(tag);
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    status.textContent = tag === 'all' ? `${visible} papers · Select a thumbnail for details` : `Showing ${visible} ${visible === 1 ? 'publication' : 'publications'}`;
    updateAuthorToggles();
  });

  const news = document.getElementById('news-list');
  const newsToggle = document.getElementById('news-toggle');
  const olderCount = news.children.length - 3;
  newsToggle.addEventListener('click', () => {
    const expanded = news.classList.toggle('expanded');
    newsToggle.setAttribute('aria-expanded', String(expanded));
    newsToggle.textContent = expanded ? 'Show fewer events' : `Show ${olderCount} older events`;
    if (!expanded) document.getElementById('news-heading').scrollIntoView({ block: 'start', behavior: 'instant' });
  });

  const shells = [...document.querySelectorAll('.publication-authors-shell')];
  shells.forEach((shell, index) => {
    const toggle = shell.querySelector('button');
    const authors = shell.querySelector('.publication-authors');
    authors.id = `authors-${index}`;
    toggle.setAttribute('aria-controls', authors.id);
    toggle.addEventListener('click', () => {
      const expanded = shell.classList.toggle('expanded');
      toggle.textContent = expanded ? '−' : '+';
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Expand author list');
      toggle.title = expanded ? 'Collapse author list' : 'Expand author list';
    });
  });
  function updateAuthorToggles() {
    shells.forEach(shell => {
      const authors = shell.querySelector('.publication-authors');
      if (!authors.getClientRects().length) return;
      const expanded = shell.classList.contains('expanded');
      if (expanded) shell.classList.remove('expanded');
      const overflow = authors.scrollHeight > authors.clientHeight + 1;
      if (expanded) shell.classList.add('expanded');
      shell.querySelector('button').hidden = !overflow;
    });
  }
  updateAuthorToggles();
  document.fonts.ready.then(updateAuthorToggles);
  window.addEventListener('resize', updateAuthorToggles, { passive: true });

  const nav = document.querySelector('.section-drip-nav');
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const back = document.getElementById('backToTop');
  let scheduled = false;
  function updateNavigation() {
    scheduled = false;
    const offset = window.innerWidth <= 1180 ? 100 : 130;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section; });
    links.forEach(link => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    back.classList.toggle('visible', window.scrollY > 300);
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation, { passive: true });
  updateNavigation();
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));

  let toastTimeout;
  document.getElementById('astronaut-btn').addEventListener('click', async () => {
    const bio = 'Rui Shi is a master’s student in Information Technology Strategy at Carnegie Mellon University. His research focuses on continually learning and self-improving agents, agentic reinforcement learning, and biomedical foundation models. Website: https://ruishi-cmu.github.io/';
    const toast = document.getElementById('toast');
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(bio);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = bio;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      toast.textContent = 'Bio copied';
    } catch (_) { toast.textContent = 'Copy unavailable in this browser'; }
    toast.style.setProperty('--toast-x', '50%');
    toast.style.setProperty('--toast-y', '90px');
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
  });
})();

/* Paper thumbnails reveal complete, keyboard-accessible publication details. */
(() => {
  const dialog = document.getElementById('paper-dialog');
  const content = document.getElementById('paper-dialog-content');
  document.querySelectorAll('.paper-open').forEach(button => {
    button.addEventListener('click', () => {
      const row = button.closest('tr');
      const image = row.querySelector('.paper-visual img').cloneNode(true);
      image.className = 'paper-dialog-figure';
      image.loading = 'eager';
      const details = document.createElement('div');
      details.append(...[...row.querySelector('.paper-copy').children].map(node => node.cloneNode(true)));
      details.querySelectorAll('.paper-open, .paper-short-title, .publication-authors-toggle').forEach(node => node.remove());
      details.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      details.querySelector('h3').id = 'paper-dialog-title';
      details.querySelector('.publication-authors-shell').classList.add('expanded');
      content.replaceChildren(image, details);
      dialog.showModal();
    });
  });
  dialog.querySelector('.paper-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
})();
