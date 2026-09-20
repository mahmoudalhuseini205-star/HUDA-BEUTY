/* Self-check for the only logic that can silently lose a booking:
   the WhatsApp link. Run: node test-wa-link.js */

const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const ctx = { console };
vm.createContext(ctx);
// `const i18n` stays lexical inside the VM, so hand it back to the context explicitly.
const src = fs.readFileSync(require('path').join(__dirname, 'js/i18n.js'), 'utf8');
vm.runInContext(src + '\nglobalThis.i18n = i18n;', ctx);
const i18n = ctx.i18n;

const WA_NUMBER = '905340793685';
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const booking = {
  name: 'Ayşe Yılmaz',
  phone: '0534 079 36 85',
  service: 'Gelin Hazırlığı',
  date: '2026-10-03',
  time: '14:30'
};

for (const lang of ['tr', 'ar']) {
  const url = waLink(i18n[lang].waTemplate(booking));

  // client.md: no leading +, no spaces, wa.me host
  assert.ok(url.startsWith('https://wa.me/905340793685?text='), `${lang}: wrong endpoint`);
  assert.ok(!/\s/.test(url), `${lang}: unencoded whitespace in URL`);
  assert.ok(!url.includes('+90'), `${lang}: leading + must not appear in the number`);

  // every field the client actually needs survives the round trip
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  for (const v of Object.values(booking)) {
    assert.ok(decoded.includes(v), `${lang}: "${v}" missing from message`);
  }
  assert.ok(decoded.split('\n').length === 6, `${lang}: expected 6 lines, got\n${decoded}`);
}

// Greetings for the floating button are the exact strings from client.md
assert.strictEqual(i18n.tr['wa.greeting'], 'Merhaba, salonunuz hakkında bilgi almak istiyorum.');
assert.strictEqual(i18n.ar['wa.greeting'], 'مرحباً، أود الاستفسار عن خدمات الصالون.');

// The service dropdown and the service cards are zipped by index — lengths must match.
assert.strictEqual(i18n.tr.services.length, i18n.ar.services.length, 'service lists out of sync');
assert.strictEqual(i18n.tr.gallery.length, i18n.ar.gallery.length, 'gallery alt lists out of sync');

const main = fs.readFileSync(require('path').join(__dirname, 'js/main.js'), 'utf8');
const imageCount = main.match(/SERVICE_IMAGES = \[([\s\S]*?)\]/)[1].split(',').length;
assert.strictEqual(imageCount, i18n.tr.services.length, 'SERVICE_IMAGES does not match services');

// Every data-i18n key in index.html must exist in BOTH languages, or the page
// renders blank text in one of them.
const html = fs.readFileSync(require('path').join(__dirname, 'index.html'), 'utf8');
const keys = new Set();
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) keys.add(m[1]);
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
  m[1].split(',').forEach((pair) => keys.add(pair.split(':')[1].trim()));
}
// keys the JS supplies at render time, not from markup
['services.featured', 'booking.servicePh', 'wa.greeting', 'wa.aria',
 'theme.toDark', 'theme.toLight',
 'langToggleText', 'langToggleLabel'].forEach((k) => keys.add(k));

for (const lang of ['tr', 'ar']) {
  for (const key of keys) {
    assert.ok(i18n[lang][key], `${lang}: missing translation for "${key}"`);
  }
}

// The lists are rendered by JS, so without these two the browser restores a scroll
// offset against a stub document and the visitor lands at the footer.
assert.ok(/scrollRestoration = 'manual'/.test(html), 'lost the manual scrollRestoration guard');
assert.ok(/!location\.hash.*window\.scrollTo\(0, 0\)/s.test(main), 'lost the scroll-to-top on load');

// Every image the page asks for must actually be on disk.
const imgs = new Set([...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]));
[...SERVICE_IMAGES_FROM_MAIN(), ...GALLERY_FROM_MAIN()].forEach((n) => imgs.add(`assets/img/${n}.jpg`));
for (const rel of imgs) {
  assert.ok(fs.existsSync(require('path').join(__dirname, rel)), `missing asset: ${rel}`);
}

function SERVICE_IMAGES_FROM_MAIN() {
  return main.match(/SERVICE_IMAGES = \[([\s\S]*?)\]/)[1].match(/'([^']+)'/g).map((s) => s.slice(1, -1));
}
function GALLERY_FROM_MAIN() {
  return main.match(/GALLERY_IMAGES = \[([\s\S]*?)\]/)[1].match(/'([^']+)'/g).map((s) => s.slice(1, -1));
}

console.log(`OK — WhatsApp links, ${keys.size} translation keys x2 languages, and ${imgs.size} assets all check out.`);
