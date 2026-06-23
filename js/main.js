async function loadSiteData() {
  const response = await fetch('content/site.json');
  if (!response.ok) throw new Error('Failed to load content/site.json');
  return response.json();
}

function $(selector) {
  return document.querySelector(selector);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderNav(nav, current) {
  const navEl = document.getElementById('site-nav');
  if (!navEl) return;
  navEl.innerHTML = nav
    .map((item) => `<a href="${item.href}" class="${item.href === current ? 'active' : ''}">${item.text}</a>`)
    .join('');
}

function renderCards(targetId, cards, buttonKey) {
  const wrap = document.getElementById(targetId);
  if (!wrap) return;
  wrap.innerHTML = cards
    .map((item) => `
      <article class="card">
        <h3>${item.name || item.title}</h3>
        <p>${item.desc || item.intro}</p>
        ${buttonKey ? `<div class="btn-row"><a class="btn btn-light" href="${item.link || '#'}">${item[buttonKey]}</a></div>` : ''}
      </article>
    `)
    .join('');
}

function renderList(targetId, list) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = list.map((item) => `<li>${item}</li>`).join('');
}

function renderStats(targetId, stats) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = stats.map((item) => `<div><strong>${item.value}</strong><span>${item.label}</span></div>`).join('');
}

function renderFlow(targetId, list) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = list.map((item, idx) => `${idx > 0 ? '<i>→</i>' : ''}<span>${item}</span>`).join('');
}

function renderContactCards(data) {
  const wrap = document.getElementById('contact-cards');
  if (!wrap) return;
  wrap.innerHTML = data.contact.cards
    .map((card) => {
      const url = data.links[card.formUrlKey] || '#';
      return `
      <article class="card">
        <h3>${card.title}</h3>
        <p>${card.intro}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="${data.links.contactPage}">${card.primaryButton}</a>
          <a class="btn btn-light" href="${url}">${card.secondaryButton}</a>
        </div>
      </article>`;
    })
    .join('');
}

function setupNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

async function init() {
  try {
    const data = await loadSiteData();
    const page = document.body.dataset.page;
    const currentFile = `${page}.html`;

    setText('brand-name', data.site.name);
    setText('brand-title', data.site.title);
    setText('footer-text', data.site.footer);
    renderNav(data.site.nav, currentFile);

    if (page === 'index') {
      setText('hero-title', data.home.heroTitle);
      setText('hero-text', data.home.heroText);
      const cta = $('#hero-cta');
      if (cta) cta.textContent = data.home.ctaText;
      renderCards('home-entries', data.home.businessEntrances, 'button');
      renderCards('solution-cards', data.home.solutions);
      setText('home-about', data.home.aboutText);
      renderStats('home-stats', data.home.stats);
    }

    if (page === 'mechanical') {
      setText('page-title', data.mechanical.pageTitle);
      setText('page-subtitle', data.mechanical.pageSubtitle);
      renderList('learning-path', data.mechanical.learningPath);
      renderCards('project-cards', data.mechanical.projects);
      setText('primary-btn', data.mechanical.primaryButton);
      const s = document.getElementById('secondary-btn');
      if (s) {
        s.textContent = data.mechanical.secondaryButton;
        s.href = data.links.mechanicalFormUrl;
      }
    }

    if (page === 'embedded') {
      setText('page-title', data.embedded.pageTitle);
      setText('page-subtitle', data.embedded.pageSubtitle);
      renderList('learning-directions', data.embedded.learningDirections);
      renderCards('project-cards', data.embedded.projects);
      setText('primary-btn', data.embedded.primaryButton);
      const s = document.getElementById('secondary-btn');
      if (s) {
        s.textContent = data.embedded.secondaryButton;
        s.href = data.links.embeddedFormUrl;
      }
    }

    if (page === 'automation') {
      setText('page-title', data.automation.pageTitle);
      setText('page-subtitle', data.automation.pageSubtitle);
      renderList('service-capabilities', data.automation.serviceCapabilities);
      renderFlow('cooperation-flow', data.automation.flow);
      setText('primary-btn', data.automation.primaryButton);
      const s = document.getElementById('secondary-btn');
      if (s) {
        s.textContent = data.automation.secondaryButton;
        s.href = data.links.automationFormUrl;
      }
    }

    if (page === 'about') {
      setText('page-title', data.about.pageTitle);
      setText('brand-a-name', data.about.brandA.name);
      setText('brand-a-intro', data.about.brandA.intro);
      setText('brand-b-name', data.about.brandB.name);
      setText('brand-b-intro', data.about.brandB.intro);
    }

    if (page === 'contact') {
      setText('page-title', data.contact.pageTitle);
      setText('page-subtitle', data.contact.pageSubtitle);
      renderContactCards(data);
    }

    setupNavToggle();
  } catch (error) {
    console.error(error);
  }
}

init();
