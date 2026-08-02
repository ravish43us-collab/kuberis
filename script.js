function getCurrentFile() {
  const path = window.location.pathname.split('/').pop().toLowerCase();
  return path || 'index.html';
}

async function loadPartial(selector, partialPath) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const response = await fetch(partialPath);
  if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
  mount.innerHTML = await response.text();
}

function applyActiveNav() {
  const currentFile = getCurrentFile();
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    link.classList.toggle('active', href === currentFile);
  });
}

function wireMobileMenu() {
  const menuBtn = document.querySelector('.mobile-btn');
  if (!menuBtn) return;

  menuBtn.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (!links) return;
    const open = links.dataset.open === 'true';
    links.dataset.open = (!open).toString();
    links.style.display = open ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '86px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '24px';
    links.style.background = '#f7f3ef';
    links.style.flexDirection = 'column';
    links.style.borderBottom = '1px solid #d8cec7';
  });
}

function wireFadeObserver() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade').forEach(el => observer.observe(el));
}

function applyYear() {
  document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));
}

async function bootstrapSharedChrome() {
  await Promise.all([
    loadPartial('[data-site-header]', 'partials/header.html'),
    loadPartial('[data-site-footer]', 'partials/footer.html')
  ]);

  applyActiveNav();
  wireMobileMenu();
  applyYear();
}
bootstrapSharedChrome()
  .then(() => {
    wireFadeObserver();
  })
  .catch(error => {
    console.error('Failed to load shared site chrome.', error);
    const headerMount = document.querySelector('[data-site-header]');
    const footerMount = document.querySelector('[data-site-footer]');
    const message = window.location.protocol === 'file:'
      ? 'Shared header/footer partials do not load over file://. Please preview this site through a local server.'
      : 'Shared header/footer partials failed to load.';

    if (headerMount) {
      headerMount.innerHTML = `<div style="padding:16px 24px;border-bottom:1px solid #d8cec7;background:#fff6f6;color:#7c1217;font:14px/1.5 Inter,system-ui,sans-serif;">${message}</div>`;
    }

    if (footerMount) {
      footerMount.innerHTML = `<div style="padding:16px 24px;border-top:1px solid #d8cec7;background:#fff6f6;color:#7c1217;font:14px/1.5 Inter,system-ui,sans-serif;">${message}</div>`;
    }
  });
