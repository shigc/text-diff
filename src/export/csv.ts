import { state } from '../state';
import type { DiffResult, RowStatus, Segment } from '../diff/types';
import { t } from '../i18n';
import { downloadText, fileStamp } from './download';

function statusText(status: RowStatus): string {
  switch (status) {
    case 'equal':
      return t('csv.status.equal');
    case 'modified':
      return t('csv.status.modified');
    case 'added':
      return t('csv.status.added');
    case 'removed':
      return t('csv.status.removed');
    case 'empty':
      return t('csv.status.empty');
  }
}

/**
 * 转义 CSV 单元格。
 * 以 = + - @ 开头的值会被 Excel 等表格软件当作公式执行（CSV 注入），
 * 因此统一前置单引号；含逗号、引号或换行的值再用双引号包裹。
 */
function csvCell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function segmentText(segments: Segment[]): string {
  return segments.map((s) => s.value).join('');
}

export function buildCsv(result: DiffResult): string {
  const lines: string[] = [
    [
      t('csv.header.type'),
      t('csv.header.leftNo'),
      t('csv.header.leftContent'),
      t('csv.header.rightNo'),
      t('csv.header.rightContent'),
    ]
      .map(csvCell)
      .join(','),
  ];
  for (const row of result.rows) {
    lines.push(
      [
        statusText(row.status),
        row.leftLineNo == null ? '' : String(row.leftLineNo),
        segmentText(row.leftSegments),
        row.rightLineNo == null ? '' : String(row.rightLineNo),
        segmentText(row.rightSegments),
      ]
        .map(csvCell)
        .join(','),
    );
  }
  // 前置 BOM，保证 Excel 正确识别 UTF-8；行尾用 CRLF 兼容 Excel
  return `\uFEFF${lines.join('\r\n')}`;
}

export function exportCsv(): boolean {
  const result = state.result;
  if (!result) return false;
  downloadText(
    buildCsv(result),
    'text/csv;charset=utf-8',
    `diff-report-${fileStamp(new Date())}.csv`,
  );
  return true;
}
