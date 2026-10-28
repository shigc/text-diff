import { diffLines, diffWordsWithSpace } from 'diff';
import type { DiffOptions, DiffResult, DiffRow, Hunk, Segment } from './types';

/**
 * 按行切分，保留空行，但丢弃结尾换行符产生的空串。
 */
function splitLines(value: string): string[] {
  if (value === '') return [];
  const lines = value.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}

/** 用于「相等判断」的行归一化：按选项忽略空白 / 大小写 */
function normalizeLine(line: string, opt: DiffOptions): string {
  let s = line;
  if (opt.ignoreWhitespace) s = s.replace(/\s+/g, '');
  if (opt.ignoreCase) s = s.toLowerCase();
  return s;
}

function normalizedEqual(a: string, b: string, opt: DiffOptions): boolean {
  return a === b || normalizeLine(a, opt) === normalizeLine(b, opt);
}

/**
 * 把行数组拼成用于 diff 的文本。
 * 末尾统一补一个换行：jsdiff 的行 token 含换行符，若一侧末尾有换行、另一侧没有，
 * 会导致同一行被误判为「删除+新增」。补换行后两侧 token 结构一致，忽略该差异。
 */
function joinForDiff(lines: string[], opt: DiffOptions): string {
  if (lines.length === 0) return '';
  return lines.map((l) => normalizeLine(l, opt)).join('\n') + '\n';
}

/**
 * 生成一行内的高亮片段。
 * 用 diffWordsWithSpace 而非 diffWords：后者会忽略空白差异，且对公共片段返回
 * 归一化后的文本，导致左右两侧各自的原文丢失、空白改动无法定位。
 * 先对原始文本做「无选项」的单词级 diff（保证左右文本各自准确），
 * 再把「按忽略规则本应相等」的相邻增/删片段合并为未变更，避免误高亮。
 */
function buildInlineSegments(
  left: string,
  right: string,
  opt: DiffOptions,
): { left: Segment[]; right: Segment[] } {
  const parts = diffWordsWithSpace(left, right);
  const leftSegs: Segment[] = [];
  const rightSegs: Segment[] = [];

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (!p.added && !p.removed) {
      leftSegs.push({ value: p.value, changed: false });
      rightSegs.push({ value: p.value, changed: false });
      continue;
    }

    const next = parts[i + 1];
    if (p.removed && next && next.added && normalizedEqual(p.value, next.value, opt)) {
      leftSegs.push({ value: p.value, changed: false });
      rightSegs.push({ value: next.value, changed: false });
      i++;
      continue;
    }
    if (p.added && next && next.removed && normalizedEqual(p.value, next.value, opt)) {
      rightSegs.push({ value: p.value, changed: false });
      leftSegs.push({ value: next.value, changed: false });
      i++;
      continue;
    }

    if (p.removed) leftSegs.push({ value: p.value, changed: true });
    else rightSegs.push({ value: p.value, changed: true });
  }

  return { left: leftSegs, right: rightSegs };
}

/**
 * 计算两段文本的差异，产出并排对齐的行、行内片段、差异块与统计。
 */
export function computeDiff(leftText: string, rightText: string, opt: DiffOptions): DiffResult {
  const a = leftText.replace(/\r\n?/g, '\n');
  const b = rightText.replace(/\r\n?/g, '\n');
  const leftLines = splitLines(a);
  const rightLines = splitLines(b);

  const normA = joinForDiff(leftLines, opt);
  const normB = joinForDiff(rightLines, opt);

  const parts = diffLines(normA, normB);
  const rows: DiffRow[] = [];

  let li = 0;
  let ri = 0;
  let i = 0;

  while (i < parts.length) {
    const part = parts[i];

    if (!part.added && !part.removed) {
      const count = splitLines(part.value).length;
      for (let k = 0; k < count; k++) {
        rows.push({
          leftLineNo: li + 1,
          rightLineNo: ri + 1,
          leftSegments: [{ value: leftLines[li] ?? '', changed: false }],
          rightSegments: [{ value: rightLines[ri] ?? '', changed: false }],
          status: 'equal',
        });
        li++;
        ri++;
      }
      i++;
      continue;
    }

    // 收集一段连续的变更块（可能含多个 removed / added 片段）
    const removedIdx: number[] = [];
    const addedIdx: number[] = [];
    while (i < parts.length && (parts[i].added || parts[i].removed)) {
      const p = parts[i];
      const count = splitLines(p.value).length;
      for (let k = 0; k < count; k++) {
        if (p.removed) removedIdx.push(li++);
        else addedIdx.push(ri++);
      }
      i++;
    }

    // 逐行配对：左右都有则视为「修改行」，单边则视为纯增/删
    const n = Math.max(removedIdx.length, addedIdx.length);
    for (let k = 0; k < n; k++) {
      const hasL = k < removedIdx.length;
      const hasR = k < addedIdx.length;

      if (hasL && hasR) {
        const l = leftLines[removedIdx[k]] ?? '';
        const r = rightLines[addedIdx[k]] ?? '';
        const seg = buildInlineSegments(l, r, opt);
        rows.push({
          leftLineNo: removedIdx[k] + 1,
          rightLineNo: addedIdx[k] + 1,
          leftSegments: seg.left,
          rightSegments: seg.right,
          status: 'modified',
        });
      } else if (hasL) {
        rows.push({
          leftLineNo: removedIdx[k] + 1,
          rightLineNo: null,
          leftSegments: [{ value: leftLines[removedIdx[k]] ?? '', changed: false }],
          rightSegments: [],
          status: 'removed',
        });
      } else {
        rows.push({
          leftLineNo: null,
          rightLineNo: addedIdx[k] + 1,
          leftSegments: [],
          rightSegments: [{ value: rightLines[addedIdx[k]] ?? '', changed: false }],
          status: 'added',
        });
      }
    }
  }

  const hunks: Hunk[] = [];
  let cur: Hunk | null = null;
  for (let idx = 0; idx < rows.length; idx++) {
    if (rows[idx].status !== 'equal') {
      if (!cur) {
        cur = { startRow: idx, endRow: idx };
        hunks.push(cur);
      } else {
        cur.endRow = idx;
      }
    } else {
      cur = null;
    }
  }

  let added = 0;
  let removed = 0;
  let modified = 0;
  let equal = 0;
  for (const r of rows) {
    if (r.status === 'added') added++;
    else if (r.status === 'removed') removed++;
    else if (r.status === 'modified') modified++;
    else if (r.status === 'equal') equal++;
  }

  return {
    rows,
    hunks,
    total: hunks.length,
    stats: { added, removed, modified, equal },
    leftLineCount: leftLines.length,
    rightLineCount: rightLines.length,
  };
}
