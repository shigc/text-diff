import type { Messages } from '../types';

const ja: Messages = {
  'app.title': 'テキスト差分比較',

  'opt.ignoreWhitespace': '空白文字を無視',
  'opt.ignoreCase': '大文字小文字を無視',
  'opt.showWhitespace': '空白記号を表示',

  'view.label': '表示',
  'view.split': '並列',
  'view.unified': '統合',

  'btn.compare': '比較',
  'btn.prev': '前の差分',
  'btn.next': '次の差分',
  'btn.exportHtml': 'HTML を書き出す',
  'btn.exportPdf': 'PDF を書き出す',
  'btn.exportCsv': 'CSV を書き出す',
  'btn.pickFile': 'ファイルを選択',

  'editor.leftName': '左側のテキスト',
  'editor.rightName': '右側のテキスト',
  'editor.leftPlaceholder':
    '左側のテキストをここに貼り付けるか入力してください。この領域にファイルをドラッグすることもできます…',
  'editor.rightPlaceholder':
    '右側のテキストをここに貼り付けるか入力してください。この領域にファイルをドラッグすることもできます…',

  'head.left': '左側',
  'head.right': '右側',
  'head.lineNo': '行番号（左 / 右）',
  'head.content': '内容',

  'result.placeholder': '比較結果がここに表示されます',
  'toast.pdfHint': '印刷ダイアログを開きました。保存先で「PDF に保存」を選んで書き出してください。',

  'counter.none': '差分なし',
  'counter.partial': '{index} / {total} 件目の差分',
  'counter.total': '差分 {total} 件',

  'lang.label': '言語',

  'report.docTitle': '差分比較レポート - {left} vs {right}',
  'report.heading': 'テキスト差分比較レポート',
  'report.generatedAt': '生成日時：{time}',
  'report.filesLine': '左側：{left}（{leftLines} 行）　右側：{right}（{rightLines} 行）',
  'report.ignoreLine': '無視オプション：{options}',
  'report.optNone': 'なし',
  'report.optSeparator': '、',

  'report.summary.total': '差分の合計：<b>{n}</b> 件',
  'report.summary.modified': '変更行：<b>{n}</b>',
  'report.summary.added': '追加行：<b>{n}</b>',
  'report.summary.removed': '削除行：<b>{n}</b>',
  'report.summary.equal': '一致行：<b>{n}</b>',

  'report.legend.modified': '変更',
  'report.legend.added': '追加',
  'report.legend.removed': '削除',
  'report.noDiff': '差分なし',

  'csv.header.type': '種類',
  'csv.header.leftNo': '左側行番号',
  'csv.header.leftContent': '左側の内容',
  'csv.header.rightNo': '右側行番号',
  'csv.header.rightContent': '右側の内容',

  'csv.status.equal': '一致',
  'csv.status.modified': '変更',
  'csv.status.added': '追加',
  'csv.status.removed': '削除',
  'csv.status.empty': '空',
};

export default ja;
