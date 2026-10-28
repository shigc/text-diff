import { state, sideName } from '../state';
import type { DiffOptions, DiffResult } from '../diff/types';
import { buildRowsHtml, escapeHtml } from '../ui/render';
import { getLocale, t } from '../i18n';
import { downloadText, fileStamp, pad2 } from './download';

function formatTime(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function optionsText(opt: DiffOptions): string {
  const parts: string[] = [];
  if (opt.ignoreWhitespace) parts.push(t('opt.ignoreWhitespace'));
  if (opt.ignoreCase) parts.push(t('opt.ignoreCase'));
  return parts.length ? parts.join(t('report.optSeparator')) : t('report.optNone');
}

function reportStyles(): string {
  return `
    :root { color-scheme: light; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @media print {
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { padding: 0; }
    }
    body { margin: 0; padding: 24px; font-family: -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif; color: #1f2328; background: #ffffff; }
    h1 { font-size: 20px; margin: 0 0 4px; }
    .meta { color: #57606a; font-size: 13px; margin-bottom: 4px; }
    .summary { display: flex; flex-wrap: wrap; gap: 16px; margin: 16px 0; padding: 12px 16px; border: 1px solid #d0d7de; border-radius: 8px; background: #f6f8fa; font-size: 13px; }
    .summary b { font-weight: 600; }
    .legend { display: flex; gap: 16px; font-size: 13px; margin-bottom: 12px; }
    .legend span { display: inline-flex; align-items: center; gap: 6px; }
    .swatch { display: inline-block; width: 12px; height: 12px; border-radius: 3px; border: 1px solid rgba(0,0,0,.15); }
    table.diff-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-family: ui-monospace, SFMono-Regular, Consolas, "Courier New", monospace; font-size: 12.5px; border: 1px solid #d0d7de; border-radius: 8px; overflow: hidden; }
    .diff-table col.col-no { width: 48px; }
    .diff-table th, .diff-table td { padding: 2px 8px; vertical-align: top; }
    .diff-table thead th { position: sticky; top: 0; background: #f6f8fa; text-align: left; font-weight: 600; border-bottom: 1px solid #d0d7de; }
    .diff-table td.c-code { white-space: pre-wrap; word-break: break-word; border-left: 1px solid #eaeef2; }
    .diff-table td.c-no { color: #8c959f; text-align: right; user-select: none; background: #fbfcfd; }
    tr.row--added > td { background: #e6ffec; }
    tr.row--removed > td { background: #ffebe9; }
    tr.row--modified > td { background: #fff8c5; }
    tr.row--empty > td { background: #f6f8fa; }
    td.c-code--left .seg { background: #ffc9c9; border-radius: 2px; }
    td.c-code--right .seg { background: #a7f3b4; border-radius: 2px; }
    .ws { color: #c2c8ce; }
    .ws--changed { color: #7a4b00; background: #ffd8a8; border-radius: 2px; }
    .empty-note { padding: 32px; text-align: center; color: #57606a; border: 1px dashed #d0d7de; border-radius: 8px; }
  `;
}

export function buildReportHtml(result: DiffResult, now: Date): string {
  const { options } = state;
  const stats = result.stats;
  const leftName = sideName('left');
  const rightName = sideName('right');

  const rowsHtml = buildRowsHtml(result, state.showWhitespace);
  const bodyHtml =
    result.rows.length > 0
      ? `<table class="diff-table">
          <colgroup><col class="col-no" /><col /><col class="col-no" /><col /></colgroup>
          <thead><tr><th>${escapeHtml(leftName)}</th><th></th><th>${escapeHtml(rightName)}</th><th></th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>`
      : `<div class="empty-note">${t('report.noDiff')}</div>`;

  return `<!DOCTYPE html>
<html lang="${getLocale()}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(t('report.docTitle', { left: leftName, right: rightName }))}</title>
<style>${reportStyles()}</style>
</head>
<body>
  <h1>${t('report.heading')}</h1>
  <div class="meta">${t('report.generatedAt', { time: formatTime(now) })}</div>
  <div class="meta">${t('report.filesLine', {
    left: escapeHtml(leftName),
    leftLines: result.leftLineCount,
    right: escapeHtml(rightName),
    rightLines: result.rightLineCount,
  })}</div>
  <div class="meta">${t('report.ignoreLine', { options: escapeHtml(optionsText(options)) })}</div>

  <div class="summary">
    <div>${t('report.summary.total', { n: result.total })}</div>
    <div>${t('report.summary.modified', { n: stats.modified })}</div>
    <div>${t('report.summary.added', { n: stats.added })}</div>
    <div>${t('report.summary.removed', { n: stats.removed })}</div>
    <div>${t('report.summary.equal', { n: stats.equal })}</div>
  </div>

  <div class="legend">
    <span><i class="swatch" style="background:#fff8c5"></i>${t('report.legend.modified')}</span>
    <span><i class="swatch" style="background:#e6ffec"></i>${t('report.legend.added')}</span>
    <span><i class="swatch" style="background:#ffebe9"></i>${t('report.legend.removed')}</span>
  </div>

  ${bodyHtml}
</body>
</html>`;
}

export function exportReport(): boolean {
  const result = state.result;
  if (!result) return false;

  const now = new Date();
  const html = buildReportHtml(result, now);
  downloadText(html, 'text/html;charset=utf-8', `diff-report-${fileStamp(now)}.html`);
  return true;
}
