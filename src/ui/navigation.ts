import type { DiffResult } from '../diff/types';
import { t } from '../i18n';

export interface NavElements {
  counter: HTMLElement;
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  exportBtns: HTMLButtonElement[];
}

export function updateControls(result: DiffResult | null, current: number, els: NavElements): void {
  const total = result ? result.total : 0;
  const hasResult = !!result;

  for (const btn of els.exportBtns) btn.disabled = !hasResult;

  if (!result || total === 0) {
    els.counter.textContent = result ? t('counter.none') : '';
    els.prevBtn.disabled = true;
    els.nextBtn.disabled = true;
    return;
  }

  const shown = current >= 0 && current < total ? current + 1 : 0;
  els.counter.textContent =
    shown > 0 ? t('counter.partial', { index: shown, total }) : t('counter.total', { total });
  els.prevBtn.disabled = false;
  els.nextBtn.disabled = false;
}

/** 高亮指定差异块的所有行并滚动到可视区（并排/统一视图均按 data-hunk 定位） */
export function focusHunk(tbody: HTMLElement, index: number): void {
  tbody.querySelectorAll('.row--current').forEach((el) => el.classList.remove('row--current'));
  if (index < 0) return;

  const rows = tbody.querySelectorAll<HTMLTableRowElement>(`tr[data-hunk="${index}"]`);
  rows.forEach((el) => el.classList.add('row--current'));
  rows[0]?.scrollIntoView({ block: 'center', inline: 'nearest' });
}
