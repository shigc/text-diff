import type { Messages } from '../types';

const zhTW: Messages = {
  'app.title': '文字差異比對',

  'opt.ignoreWhitespace': '忽略空白字元',
  'opt.ignoreCase': '忽略大小寫',
  'opt.showWhitespace': '顯示空白符號',

  'view.label': '檢視',
  'view.split': '並排',
  'view.unified': '統一',

  'btn.compare': '比對',
  'btn.prev': '上一個差異',
  'btn.next': '下一個差異',
  'btn.exportHtml': '匯出 HTML',
  'btn.exportPdf': '匯出 PDF',
  'btn.exportCsv': '匯出 CSV',
  'btn.pickFile': '選擇檔案',

  'editor.leftName': '左側文字',
  'editor.rightName': '右側文字',
  'editor.leftPlaceholder': '在此貼上或輸入左側文字，也可將檔案拖曳到此區域…',
  'editor.rightPlaceholder': '在此貼上或輸入右側文字，也可將檔案拖曳到此區域…',

  'head.left': '左側',
  'head.right': '右側',
  'head.lineNo': '行號（左 / 右）',
  'head.content': '內容',

  'result.placeholder': '比對結果將顯示在這裡',
  'toast.pdfHint': '已開啟列印對話框，請在目標中選擇「另存為 PDF」完成匯出。',

  'counter.none': '無差異',
  'counter.partial': '第 {index} / 共 {total} 處差異',
  'counter.total': '共 {total} 處差異',

  'lang.label': '語言',

  'report.docTitle': '差異比對報告 - {left} vs {right}',
  'report.heading': '文字差異比對報告',
  'report.generatedAt': '產生時間：{time}',
  'report.filesLine': '左側：{left}（{leftLines} 行）　右側：{right}（{rightLines} 行）',
  'report.ignoreLine': '忽略選項：{options}',
  'report.optNone': '無',
  'report.optSeparator': '、',

  'report.summary.total': '差異總數：<b>{n}</b> 處',
  'report.summary.modified': '修改行：<b>{n}</b>',
  'report.summary.added': '新增行：<b>{n}</b>',
  'report.summary.removed': '刪除行：<b>{n}</b>',
  'report.summary.equal': '相同行：<b>{n}</b>',

  'report.legend.modified': '修改',
  'report.legend.added': '新增',
  'report.legend.removed': '刪除',
  'report.noDiff': '無差異',

  'csv.header.type': '類型',
  'csv.header.leftNo': '左側行號',
  'csv.header.leftContent': '左側內容',
  'csv.header.rightNo': '右側行號',
  'csv.header.rightContent': '右側內容',

  'csv.status.equal': '相同',
  'csv.status.modified': '修改',
  'csv.status.added': '新增',
  'csv.status.removed': '刪除',
  'csv.status.empty': '空',
};

export default zhTW;
