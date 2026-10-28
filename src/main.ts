import './styles.css';
import { state, sideName, type ViewMode } from './state';
import { computeDiff } from './diff/engine';
import { buildRowsHtml, buildUnifiedRowsHtml } from './ui/render';
import { setupInputs } from './ui/inputs';
import { setupLanguageSelect } from './ui/language';
import { updateControls, focusHunk, type NavElements } from './ui/navigation';
import { initI18n, onLocaleChange, t } from './i18n';
import { exportReport } from './export/report';
import { exportCsv } from './export/csv';
import { exportPdf } from './export/pdf';

const splitBody = byId<HTMLElement>('diff-body');
const unifiedBody = byId<HTMLElement>('diff-body-unified');
const tableSplit = byId<HTMLElement>('table-split');
const tableUnified = byId<HTMLElement>('table-unified');
const scrollEl = byId<HTMLElement>('diff-scroll');
const placeholder = byId<HTMLElement>('result-placeholder');
const headLeft = byId<HTMLElement>('head-left');
const headRight = byId<HTMLElement>('head-right');
const leftNameEl = byId<HTMLElement>('left-name');
const rightNameEl = byId<HTMLElement>('right-name');
const viewSplitBtn = byId<HTMLButtonElement>('view-split');
const viewUnifiedBtn = byId<HTMLButtonElement>('view-unified');

const navEls: NavElements = {
  counter: byId<HTMLElement>('diff-counter'),
  prevBtn: byId<HTMLButtonElement>('btn-prev'),
  nextBtn: byId<HTMLButtonElement>('btn-next'),
  exportBtns: [
    byId<HTMLButtonElement>('btn-export'),
    byId<HTMLButtonElement>('btn-export-pdf'),
    byId<HTMLButtonElement>('btn-export-csv'),
  ],
};

function activeBody(): HTMLElement {
  return state.view === 'split' ? splitBody : unifiedBody;
}

/** 编辑器标题：已选文件显示文件名，否则显示当前语言的默认标签 */
function refreshLabels(): void {
  leftNameEl.textContent = sideName('left');
  rightNameEl.textContent = sideName('right');
}

function recompute(): void {
  state.result = computeDiff(state.leftText, state.rightText, state.options);
  state.currentHunk = -1;
  renderResult();
}

function renderResult(): void {
  const result = state.result;

  if (!result || result.rows.length === 0) {
    placeholder.hidden = false;
    placeholder.textContent = t('result.placeholder');
    scrollEl.hidden = true;
    updateControls(null, -1, navEls);
    return;
  }

  placeholder.hidden = true;
  scrollEl.hidden = false;
  headLeft.textContent = sideName('left');
  headRight.textContent = sideName('right');

  const split = state.view === 'split';
  tableSplit.hidden = !split;
  tableUnified.hidden = split;
  if (split) {
    splitBody.innerHTML = buildRowsHtml(result, state.showWhitespace);
  } else {
    unifiedBody.innerHTML = buildUnifiedRowsHtml(result, state.showWhitespace);
  }

  updateControls(result, state.currentHunk, navEls);
  if (state.currentHunk >= 0) focusHunk(activeBody(), state.currentHunk);
}

function setView(view: ViewMode): void {
  if (state.view === view) return;
  state.view = view;
  viewSplitBtn.classList.toggle('view-btn--active', view === 'split');
  viewUnifiedBtn.classList.toggle('view-btn--active', view === 'unified');
  renderResult();
}

function gotoHunk(delta: number): void {
  const result = state.result;
  if (!result || result.total === 0) return;

  if (state.currentHunk < 0) {
    state.currentHunk = delta > 0 ? 0 : result.total - 1;
  } else {
    state.currentHunk = (state.currentHunk + delta + result.total) % result.total;
  }
  updateControls(result, state.currentHunk, navEls);
  focusHunk(activeBody(), state.currentHunk);
}

viewSplitBtn.addEventListener('click', () => setView('split'));
viewUnifiedBtn.addEventListener('click', () => setView('unified'));

navEls.prevBtn.addEventListener('click', () => gotoHunk(-1));
navEls.nextBtn.addEventListener('click', () => gotoHunk(1));

byId<HTMLButtonElement>('btn-export').addEventListener('click', () => {
  exportReport();
});
byId<HTMLButtonElement>('btn-export-csv').addEventListener('click', () => {
  exportCsv();
});
byId<HTMLButtonElement>('btn-export-pdf').addEventListener('click', () => {
  if (exportPdf()) toast(t('toast.pdfHint'));
});

initI18n();
setupLanguageSelect();
onLocaleChange(() => {
  refreshLabels();
  renderResult();
});

refreshLabels();
setupInputs({ onUpdate: recompute, onDisplayChange: renderResult });

recompute();

let toastTimer: number | undefined;
function toast(message: string): void {
  const el = byId<HTMLElement>('toast');
  el.textContent = message;
  el.hidden = false;
  if (toastTimer !== undefined) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    el.hidden = true;
    toastTimer = undefined;
  }, 4000);
}

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element #${id}`);
  return el as T;
}
