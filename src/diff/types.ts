export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

export type RowStatus = 'equal' | 'modified' | 'added' | 'removed' | 'empty';

/** 行内片段：changed 为 true 表示该片段是增/删的高亮部分 */
export interface Segment {
  value: string;
  changed: boolean;
}

/** 并排视图中的一行（左/右各一列） */
export interface DiffRow {
  leftLineNo: number | null;
  rightLineNo: number | null;
  leftSegments: Segment[];
  rightSegments: Segment[];
  status: RowStatus;
}

/** 一处差异：由连续变更行组成的块 */
export interface Hunk {
  /** 在 rows 数组中的起始下标（含） */
  startRow: number;
  /** 在 rows 数组中的结束下标（含） */
  endRow: number;
}

export interface DiffStats {
  added: number;
  removed: number;
  modified: number;
  equal: number;
}

export interface DiffResult {
  rows: DiffRow[];
  hunks: Hunk[];
  total: number;
  stats: DiffStats;
  leftLineCount: number;
  rightLineCount: number;
}
