'use strict';

// Tables are pre-rendered. Filtering is optional; every result is readable without JS.
const filters = document.querySelector('.result-controls');
filters.hidden = false;
filters.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.model-group').forEach(group => {
      group.hidden = button.dataset.family !== 'all' && group.dataset.family !== button.dataset.family;
    });
  });
});

const dialog = document.querySelector('#figure-dialog');
let previousFocus;
document.querySelectorAll('[data-figure]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    previousFocus = link;
    const source = link.querySelector('img');
    const image = document.querySelector('#dialog-image');
    image.src = link.href;
    image.alt = source.alt;
    document.querySelector('#original-figure').href = link.href;
    document.querySelector('#dialog-caption').textContent = link.closest('figure').querySelector('figcaption').textContent;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  previousFocus?.focus({preventScroll:true});
});

const copyButton = document.querySelector('#copy-citation');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  const code = document.querySelector('#citation-text');
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(code.textContent.trim());
    status.textContent = 'Citation copied.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C (Windows) or ⌘C (Mac) to copy.';
  }
});

const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sections = [...document.querySelectorAll('main section')];
let navigationFrame = false;
function updateNavigation() {
  const readingLine = window.scrollY + document.querySelector('.section-nav').offsetHeight + 48;
  const active = sections.filter(section => section.offsetTop <= readingLine).at(-1);
  sectionLinks.forEach(link => {
    if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  navigationFrame = false;
}
function queueNavigationUpdate() {
  if (navigationFrame) return;
  navigationFrame = true;
  requestAnimationFrame(updateNavigation);
}
window.addEventListener('scroll', queueNavigationUpdate, {passive:true});
window.addEventListener('resize', queueNavigationUpdate);
window.addEventListener('load', updateNavigation);
updateNavigation();

