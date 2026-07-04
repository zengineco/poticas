// ============================================================
// NOTEBOOK TICK v1.0.0
// Publishes the next entry from data/notebook-bank.json into
// notebook.html (newest first) and bumps the notebook's
// <lastmod> in sitemap.xml. Run by .github/workflows/potica-pulse.yml
// every 5 days, or manually: node scripts/notebook-tick.js
// ============================================================
//
// WORKFLOW STACK:
//   1. Read bank; if nextIndex past the end -> exit 0 (nothing to publish)
//   2. Render entry HTML with today's date
//   3. Insert directly after NOTEBOOK:ENTRIES:START marker in notebook.html
//   4. Increment nextIndex, save bank
//   5. Update notebook.html <lastmod> in sitemap.xml
// ============================================================

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var BANK = path.join(ROOT, 'data', 'notebook-bank.json');
var PAGE = path.join(ROOT, 'notebook.html');
var SITEMAP = path.join(ROOT, 'sitemap.xml');

// READS: bank.nextIndex, bank.entries — WRITES: bank.nextIndex
function main() {
  var bank = JSON.parse(fs.readFileSync(BANK, 'utf8'));
  if (bank.nextIndex >= bank.entries.length) {
    console.log('notebook-tick: bank empty (' + bank.entries.length + ' entries all published). Refill data/notebook-bank.json.');
    return;
  }
  var entry = bank.entries[bank.nextIndex];

  var now = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var dateLabel = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
  var iso = now.toISOString().slice(0, 10);

  var srcHtml = entry.src
    ? '\n  <p class="nb-src">Source: <a href="' + entry.src.url + '" target="_blank" rel="noopener">' + entry.src.label + '</a></p>'
    : '';
  var html =
    '\n<article class="nb-entry">' +
    '\n  <p class="nb-date">' + dateLabel + '</p>' +
    '\n  <h2>' + entry.title + '</h2>' +
    '\n  <p>' + entry.body + '</p>' + srcHtml +
    '\n</article>';

  var page = fs.readFileSync(PAGE, 'utf8');
  var marker = '<!-- NOTEBOOK:ENTRIES:START -->';
  if (page.indexOf(marker) < 0) throw new Error('notebook-tick: START marker missing in notebook.html');
  page = page.replace(marker, marker + html);
  fs.writeFileSync(PAGE, page);

  bank.nextIndex = bank.nextIndex + 1;
  fs.writeFileSync(BANK, JSON.stringify(bank, null, 2) + '\n');

  var sm = fs.readFileSync(SITEMAP, 'utf8');
  var re = /(<loc>https:\/\/www\.poticas\.com\/notebook\.html<\/loc><lastmod>)[0-9-]+(<\/lastmod>)/;
  if (re.test(sm)) {
    fs.writeFileSync(SITEMAP, sm.replace(re, '$1' + iso + '$2'));
  } else {
    console.log('notebook-tick: WARNING — notebook.html not found in sitemap.xml, lastmod not bumped.');
  }

  console.log('notebook-tick: published entry ' + (bank.nextIndex) + '/' + bank.entries.length + ' — "' + entry.title + '" (' + dateLabel + ')');
}

try { main(); } catch (e) { console.error('notebook-tick:', e.message); process.exit(1); }
