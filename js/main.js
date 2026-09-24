/* Language toggle + booking form -> WhatsApp. Facts come from client.md. */

const WA_NUMBER = '905340793685';              // client.md
const PHONE_DISPLAY = '+90 534 079 36 85';     // client.md
const STORAGE_KEY = 'hgs-lang';
const THEME_KEY = 'hgs-theme';
const DEFAULT_LANG = 'tr';                     // Turkish default, no auto-detect

// Same order as i18n[lang].services
const SERVICE_IMAGES = [
  'svc-bridal', 'svc-cut', 'svc-color', 'svc-keratin',
  'svc-blowdry', 'svc-updo', 'svc-care', 'svc-makeup'
];
const GALLERY_IMAGES = [
  'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9',
  'g10', 'g11', 'g12', 'g13', 'g14', 'g15', 'g16', 'g17', 'g18'
];

// Sub-service photos, keyed by index in services, in the same order as svc.items.
// They reuse the gallery files — no separate thumbnails to keep in step.
const SUB_IMAGES = {
  1: ['g7', 'g8'],                    // Türk Stili, Suriye Stili
  2: ['g10', 'g11', 'g12', 'g13'],    // Röfle, Ombre, Sombre, Sarı Hatlı
  7: ['g14', 'g16', 'g17', 'g18']     // Gelin, Porselen, Gece / Nişan, Günlük / Soft
};

const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

let lang = DEFAULT_LANG;

function applyLang(next) {
  lang = i18n[next] ? next : DEFAULT_LANG;
  const t = i18n[lang];

  document.documentElement.lang = t.htmlLang;
  document.documentElement.dir = t.dir;
  localStorage.setItem(STORAGE_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t[el.dataset.i18n] || '';
  });

  // data-i18n-attr="placeholder:booking.namePh" or several, comma-separated
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      el.setAttribute(attr, t[key] || '');
    });
  });

  document.querySelectorAll('.lang-toggle').forEach((btn) => {
    btn.textContent = t.langToggleText;
    btn.setAttribute('aria-label', t.langToggleLabel);
  });

  document.getElementById('wa-float').href = waLink(t['wa.greeting']);
  document.getElementById('wa-float').setAttribute('aria-label', t['wa.aria']);
  syncThemeButton();

  renderServices(t);
  renderGallery(t);
}

/* Theme is independent of language: stored choice wins, otherwise the system decides.
   The inline script in <head> already set it before paint; this keeps the two in step. */
function applyTheme(dark) {
  if (dark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  syncThemeButton();
}

function syncThemeButton() {
  const btn = document.getElementById('theme-toggle');
  const dark = document.documentElement.dataset.theme === 'dark';
  btn.setAttribute('aria-pressed', String(dark));
  // Label names what the press will do, not what the theme currently is.
  btn.setAttribute('aria-label', i18n[lang][dark ? 'theme.toLight' : 'theme.toDark']);
}

function renderServices(t) {
  const list = document.getElementById('service-list');
  const select = document.getElementById('f-service');

  list.innerHTML = '';
  select.innerHTML = '';

  const placeholder = new Option(t['booking.servicePh'], '');
  placeholder.disabled = true;
  placeholder.selected = true;
  select.add(placeholder);

  t.services.forEach((svc, i) => {
    const featured = i === 0;                   // bridal preparation is the flagship
    const li = document.createElement('li');
    li.className = 'reveal';

    const rowInner = `
        <img src="assets/img/${SERVICE_IMAGES[i]}.jpg" alt="" loading="lazy" width="800" height="1000">
        <span>
          ${featured ? '<span class="service-eyebrow"></span>' : ''}
          <span class="service-name"></span>
          <span class="service-desc"></span>
        </span>
        <span class="service-arrow" aria-hidden="true">${svc.items ? '&#9662;' : '&rarr;'}</span>`;

    if (svc.items) {
      // Native <details> does the toggling, so there is no open/close JS — and a
      // closed row never fetches its sub-service photos.
      li.innerHTML = `
      <details class="service-group">
        <summary class="service-row">${rowInner}</summary>
        <ul class="service-subs"></ul>
      </details>`;
    } else {
      li.innerHTML = `
      <a class="service-row${featured ? ' service-row-featured' : ''}" href="#booking">${rowInner}</a>`;
      li.querySelector('.service-row').dataset.service = svc.name;
    }

    li.querySelector('img').alt = svc.alt;
    li.querySelector('.service-name').textContent = svc.name;
    li.querySelector('.service-desc').textContent = svc.desc;
    if (featured) li.querySelector('.service-eyebrow').textContent = t['services.featured'];

    if (svc.items) {
      const subs = li.querySelector('.service-subs');
      svc.items.forEach((item, n) => {
        const file = SUB_IMAGES[i][n];
        const link = document.createElement('a');
        link.href = '#booking';
        link.dataset.service = `${svc.name} — ${item}`;
        const img = document.createElement('img');
        img.src = `assets/img/${file}.jpg`;
        // The photo's own description, not the name repeated under it.
        img.alt = t.gallery[GALLERY_IMAGES.indexOf(file)].alt;
        img.loading = 'lazy';
        img.width = 800;
        img.height = 800;
        const label = document.createElement('span');
        label.textContent = item;
        link.append(img, label);
        const subLi = document.createElement('li');
        subLi.style.setProperty('--i', n);
        subLi.appendChild(link);
        subs.appendChild(subLi);
      });
    }

    list.appendChild(li);

    // A service with sub-services books the sub-service, not the category.
    if (svc.items) {
      const group = document.createElement('optgroup');
      group.label = svc.name;
      svc.items.forEach((item) => group.appendChild(new Option(item, `${svc.name} — ${item}`)));
      select.add(group);
    } else {
      select.add(new Option(svc.name, svc.name));
    }
  });

  observeReveals();
}

function renderGallery(t) {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  GALLERY_IMAGES.forEach((name, i) => {
    const li = document.createElement('li');
    li.className = 'reveal';
    li.style.setProperty('--i', i % 3);          // column position on the 3-up desktop grid
    const figure = document.createElement('figure');
    const frame = document.createElement('div'); // clips the hover zoom to the rounded tile
    frame.className = 'gallery-frame';
    const img = document.createElement('img');
    img.src = `assets/img/${name}.jpg`;
    img.alt = t.gallery[i].alt;
    img.loading = 'lazy';
    img.width = 800;
    img.height = 800;
    const caption = document.createElement('figcaption');
    caption.textContent = t.gallery[i].cap;
    frame.appendChild(img);
    figure.append(frame, caption);
    li.appendChild(figure);
    grid.appendChild(li);
  });
  observeReveals();
}

/* Fade sections in once, unless the visitor asked for less motion. */
let revealObserver = null;
function observeReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => revealObserver.observe(el));
}

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();

  const tel = `tel:+${WA_NUMBER}`;
  document.getElementById('header-call').href = tel;
  const contactPhone = document.getElementById('contact-phone');
  contactPhone.href = tel;
  contactPhone.querySelector('bdi').textContent = PHONE_DISPLAY;

  // No appointments in the past.
  document.getElementById('f-date').min = new Date().toISOString().slice(0, 10);

  document.querySelectorAll('.lang-toggle').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(lang === 'tr' ? 'ar' : 'tr'));
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme !== 'dark');
  });

  // No stored choice yet? Keep following the system if it changes mid-visit.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      if (e.matches) document.documentElement.dataset.theme = 'dark';
      else delete document.documentElement.dataset.theme;
      syncThemeButton();
    }
  });

  // Delegated once here, not in renderServices — the list is rebuilt on every language switch.
  document.getElementById('service-list').addEventListener('click', (e) => {
    const el = e.target.closest('[data-service]');
    if (el) document.getElementById('f-service').value = el.dataset.service;
  });

  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();                          // browser has already enforced `required`
    const f = e.target.elements;   // not e.target.name — that's the form's own name property
    const data = {
      name: f.name.value.trim(),
      phone: f.phone.value.trim(),
      service: f.service.value,
      date: f.date.value,
      time: f.time.value
    };
    window.open(waLink(i18n[lang].waTemplate(data)), '_blank', 'noopener');
  });

  applyLang(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);
  observeReveals();

  // The lists exist now, so the document is its real height. Start at the top —
  // but never fight a deep link like index.html#booking shared from WhatsApp.
  if (!location.hash) window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', init);
