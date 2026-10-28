import type { DiffResult, DiffRow, RowStatus, Segment } from '../diff/types';

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STATUS_CLASS: Record<RowStatus, string> = {
  equal: 'row--equal',
  modified: 'row--modified',
  added: 'row--added',
  removed: 'row--removed',
  empty: 'row--empty',
};

const TAB_GLYPH = '→';
const SPACE_GLYPH = '·';

/**
 * 渲染一段文本。
 * - changed=true：该片段是增/删内容，空白字符用独立颜色（ws--changed）标出，便于定位空白差异。
 * - showWhitespace=true：即使未变更，也把空格/制表符显示为记号，方便肉眼核对。
 */
function renderValue(value: string, changed: boolean, showWhitespace: boolean): string {
  let out = '';
  let i = 0;
  while (i < value.length) {
    const ch = value[i];
    if (ch === ' ' || ch === '\t') {
      let j = i;
      while (j < value.length && (value[j] === ' ' || value[j] === '\t')) j++;
      const run = value.slice(i, j);
      if (changed || showWhitespace) {
        const cls = changed ? 'ws ws--changed' : 'ws';
        for (const c of run) {
          out += `<span class="${cls}">${c === '\t' ? TAB_GLYPH : SPACE_GLYPH}</span>`;
        }
      } else {
        out += escapeHtml(run);
      }
      i = j;
    } else {
      out += escapeHtml(ch);
      i++;
    }
  }
  return out;
}

function segmentsToHtml(segments: Segment[], showWhitespace: boolean): string {
  let out = '';
  for (const s of segments) {
    if (s.changed) {
      out += `<span class="seg">${renderValue(s.value, true, showWhitespace)}</span>`;
    } else {
      out += renderValue(s.value, false, showWhitespace);
    }
  }
  return out;
}

/** 行下标 -> 差异块下标（-1 表示不属于任何差异块） */
function hunkMap(result: DiffResult): number[] {
  const map = new Array<number>(result.rows.length).fill(-1);
  result.hunks.forEach((h, hi) => {
    for (let i = h.startRow; i <= h.endRow; i++) map[i] = hi;
  });
  return map;
}

function hunkAttr(hunk: number): string {
  return hunk >= 0 ? ` data-hunk="${hunk}"` : '';
}

// ---------- 并排双栏 ----------

function splitRowToHtml(row: DiffRow, idx: number, hunk: number, showWhitespace: boolean): string {
  const cls = STATUS_CLASS[row.status];
  const left = segmentsToHtml(row.leftSegments, showWhitespace);
  const right = segmentsToHtml(row.rightSegments, showWhitespace);
  return (
    `<tr class="${cls}" data-row="${idx}"${hunkAttr(hunk)}>` +
    `<td class="c-no">${row.leftLineNo ?? ''}</td>` +
    `<td class="c-code c-code--left">${left || '&nbsp;'}</td>` +
    `<td class="c-no">${row.rightLineNo ?? ''}</td>` +
    `<td class="c-code c-code--right">${right || '&nbsp;'}</td>` +
    `</tr>`
  );
}

/** 生成并排视图 tbody 的内部 HTML（页面渲染与报告导出共用） */
export function buildRowsHtml(result: DiffResult, showWhitespace = false): string {
  const hm = hunkMap(result);
  return result.rows.map((row, idx) => splitRowToHtml(row, idx, hm[idx], showWhitespace)).join('');
}

// ---------- 统一单栏 ----------

type SignKind = 'add' | 'del' | 'ctx';

const SIGN_CLASS: Record<SignKind, string> = {
  add: 'row--added',
  del: 'row--removed',
  ctx: 'row--equal',
};

function signHtml(kind: SignKind): string {
  if (kind === 'add') return '<span class="u-sign u-sign--add">+</span>';
  if (kind === 'del') return '<span class="u-sign u-sign--del">-</span>';
  return '<span class="u-sign u-sign--ctx">&nbsp;</span>';
}

function unifiedRowToHtml(
  leftNo: number | null,
  rightNo: number | null,
  kind: SignKind,
  segments: Segment[],
  hunk: number,
  showWhitespace: boolean,
): string {
  const content = segmentsToHtml(segments, showWhitespace);
  return (
    `<tr class="${SIGN_CLASS[kind]}"${hunkAttr(hunk)}>` +
    `<td class="c-no">${leftNo ?? ''}</td>` +
    `<td class="c-no">${rightNo ?? ''}</td>` +
    `<td class="c-code c-code--unified">${signHtml(kind)}${content || '&nbsp;'}</td>` +
    `</tr>`
  );
}

/** 生成统一单栏视图 tbody 的内部 HTML：修改行拆成「删除 + 新增」两行 */
export function buildUnifiedRowsHtml(result: DiffResult, showWhitespace = false): string {
  const hm = hunkMap(result);
  let out = '';
  result.rows.forEach((row, idx) => {
    const hunk = hm[idx];
    switch (row.status) {
      case 'equal':
        out += unifiedRowToHtml(
          row.leftLineNo,
          row.rightLineNo,
          'ctx',
          row.leftSegments,
          hunk,
          showWhitespace,
        );
        break;
      case 'removed':
        out += unifiedRowToHtml(
          row.leftLineNo,
          null,
          'del',
          row.leftSegments,
          hunk,
          showWhitespace,
        );
        break;
      case 'added':
        out += unifiedRowToHtml(
          null,
          row.rightLineNo,
          'add',
          row.rightSegments,
          hunk,
          showWhitespace,
        );
        break;
      case 'modified':
        out += unifiedRowToHtml(
          row.leftLineNo,
          null,
          'del',
          row.leftSegments,
          hunk,
          showWhitespace,
        );
        out += unifiedRowToHtml(
          null,
          row.rightLineNo,
          'add',
          row.rightSegments,
          hunk,
          showWhitespace,
        );
        break;
      default:
        break;
    }
  });
  return out;
}
