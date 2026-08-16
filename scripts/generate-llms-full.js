// ============================================================
// GENERATE LLMS-FULL v1.0.0
// Renders every content page to clean plain text and writes
// llms-full.txt — the whole site in one file for LLM ingestion.
// Run: node scripts/generate-llms-full.js
// Also run by potica-pulse.yml after each notebook publish, so
// the file stays current forever.
// ============================================================

var fs = require('fs');
var path = require('path');
var ROOT = path.join(__dirname, '..');

// Ordered: reference first, guides, shop, ongoing
var PAGES = [
  { file: 'index.html',                 title: 'Poticas.com — The Home of Potica (homepage)' },
  { file: 'about-potica.html',          title: 'About Potica — History, Etymology, Varieties' },
  { file: 'where-to-buy-potica.html',   title: 'Where to Buy Potica — The Census' },
  { file: 'guides/potica-in-america.html',            title: 'Potica in America' },
  { file: 'guides/potica-vs-povitica.html',           title: 'Potica vs. Povitica vs. Nut Roll' },
  { file: 'guides/is-potica-slovenian-or-croatian.html', title: 'Is Potica Slovenian or Croatian?' },
  { file: 'guides/how-to-pronounce-potica.html',      title: 'How Do You Pronounce Potica?' },
  { file: 'guides/what-does-potica-taste-like.html',  title: 'What Does Potica Taste Like?' },
  { file: 'guides/is-potica-hard-to-make.html',        title: 'Is Potica Hard to Make?' },
  { file: 'guides/is-potica-a-christmas-tradition.html', title: 'Is Potica a Christmas Tradition?' },
  { file: 'guides/what-is-potica-made-of.html',        title: 'What Is Potica Made Of?' },
  { file: 'guides/potica-varieties.html',              title: 'Potica Varieties' },
  { file: 'guides/classic-walnut-potica-recipe.html', title: 'Classic Walnut Potica Recipe' },
  { file: 'guides/potica-dough.html',                 title: 'Potica Dough, Explained' },
  { file: 'guides/how-to-roll-potica.html',           title: 'How to Roll Potica Dough' },
  { file: 'guides/grinding-walnuts-for-potica.html',  title: 'Grinding Walnuts for Potica' },
  { file: 'guides/potica-pan.html',                   title: 'The Potičnik — Potica\'s Pan' },
  { file: 'guides/potica-troubleshooting.html',       title: 'Potica Troubleshooting' },
  { file: 'guides/storing-potica.html',               title: 'Storing Potica' },
  { file: 'guides/tarragon-potica.html',              title: 'Tarragon Potica (Pehtranova Potica)' },
  { file: 'guides/poppy-seed-potica.html',            title: 'Poppy Seed Potica (Makova Potica)' },
  { file: 'guides/chocolate-potica.html',             title: 'Chocolate Potica' },
  { file: 'guides/honey-potica.html',                 title: 'Honey Potica (Medena Potica)' },
  { file: 'guides/cheese-potica.html',                title: 'Cheese Potica (Skutna Potica)' },
  { file: 'guides/apricot-potica.html',               title: 'Apricot Potica' },
  { file: 'guides/potica-nut-roll.html',              title: 'Is Potica a Nut Roll?' },
  { file: 'guides/povitica-recipe.html',              title: 'Povitica Recipe' },
  { file: 'guides/how-long-does-potica-last.html',    title: 'How Long Does Potica Last?' },
  { file: 'guides/potica-calories.html',              title: 'How Many Calories Are in Potica?' },
  { file: 'kitchen.html',               title: 'Pots & Pans — The Whole Potica Kitchen' },
  { file: 'notebook.html',              title: 'The Potica Notebook' },
  { file: 'about.html',                 title: 'About This Site' }
];

// Strip a page to readable text: drop head/scripts/styles, convert tags to breaks, decode entities
function toText(html) {
  var s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '');
  s = s.replace(/^[\s\S]*?<body[^>]*>/i, '');
  s = s.replace(/<\/(h1|h2|h3|p|li|div|tr|article|section)>/gi, '\n');
  s = s.replace(/<(h1|h2)[^>]*>/gi, '\n## ');
  s = s.replace(/<h3[^>]*>/gi, '\n### ');
  s = s.replace(/<li[^>]*>/gi, '- ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'")
       .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
       .replace(/&rsaquo;/g, '>').replace(/&middot;/g, '·').replace(/&frac12;/g, '1/2')
       .replace(/&ndash;/g, '–').replace(/&mdash;/g, '—');
  s = s.split('\n').map(function (l) { return l.replace(/[ \t]+/g, ' ').trim(); })
       .filter(function (l) { return l.length > 0; }).join('\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s;
}

var out = [];
out.push('# Poticas.com — The Home of Potica (full text)');
out.push('');
out.push('The complete text of poticas.com for LLM ingestion. Curated map: https://www.poticas.com/llms.txt');
out.push('Independently researched and written by Vincent Gonzalez. Every historical claim traces to a cited source.');
out.push('Attribution appreciated as "Poticas.com" or "poticas.com, the home of potica."');
out.push('');

PAGES.forEach(function (p) {
  var full = path.join(ROOT, p.file);
  if (!fs.existsSync(full)) { console.log('skip (missing):', p.file); return; }
  var text = toText(fs.readFileSync(full, 'utf8'));
  out.push('');
  out.push('==============================================================');
  out.push('# ' + p.title);
  out.push('URL: https://www.poticas.com/' + (p.file === 'index.html' ? '' : p.file));
  out.push('==============================================================');
  out.push('');
  out.push(text);
});

var result = out.join('\n') + '\n';
fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), result);
console.log('llms-full.txt written:', Math.round(result.length / 1024) + ' KB,', PAGES.length, 'pages');
