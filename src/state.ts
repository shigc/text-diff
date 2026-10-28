import type { DiffOptions, DiffResult } from './diff/types';
import { t } from './i18n';

export type ViewMode = 'split' | 'unified';
export type Side = 'left' | 'right';

export interface AppState {
  leftText: string;
  rightText: string;
  /** 左侧名称；null 表示未选文件，使用默认标签 */
  leftName: string | null;
  /** 右侧名称；null 表示未选文件，使用默认标签 */
  rightName: string | null;
  options: DiffOptions;
  /** 是否把空白字符渲染为可见记号 */
  showWhitespace: boolean;
  /** 视图模式：并排 / 统一单栏 */
  view: ViewMode;
  result: DiffResult | null;
  /** 当前定位的差异块下标，-1 表示无 */
  currentHunk: number;
}

export const state: AppState = {
  leftText: '',
  rightText: '',
  leftName: null,
  rightName: null,
  options: { ignoreWhitespace: false, ignoreCase: false },
  showWhitespace: false,
  view: 'split',
  result: null,
  currentHunk: -1,
};

/** 某一侧显示名：已选文件用文件名，否则用随语言变化的默认标签 */
export function sideName(side: Side): string {
  const name = side === 'left' ? state.leftName : state.rightName;
  return name ?? t(side === 'left' ? 'editor.leftName' : 'editor.rightName');
}
