const zhCN = {
  'app.title': '文本差异对比',

  'opt.ignoreWhitespace': '忽略空白字符',
  'opt.ignoreCase': '忽略大小写',
  'opt.showWhitespace': '显示空白符号',

  'view.label': '视图',
  'view.split': '并排',
  'view.unified': '统一',

  'btn.compare': '对比',
  'btn.prev': '上一个差异',
  'btn.next': '下一个差异',
  'btn.exportHtml': '导出 HTML',
  'btn.exportPdf': '导出 PDF',
  'btn.exportCsv': '导出 CSV',
  'btn.pickFile': '选择文件',

  'editor.leftName': '左侧文本',
  'editor.rightName': '右侧文本',
  'editor.leftPlaceholder': '在此粘贴或输入左侧文本，也可将文件拖拽到此区域…',
  'editor.rightPlaceholder': '在此粘贴或输入右侧文本，也可将文件拖拽到此区域…',

  'head.left': '左侧',
  'head.right': '右侧',
  'head.lineNo': '行号（左 / 右）',
  'head.content': '内容',

  'result.placeholder': '对比结果将显示在这里',
  'toast.pdfHint': '已打开打印对话框，请在目标中选择「另存为 PDF」完成导出。',

  'counter.none': '无差异',
  'counter.partial': '第 {index} / 共 {total} 处差异',
  'counter.total': '共 {total} 处差异',

  'lang.label': '语言',

  'report.docTitle': '差异对比报告 - {left} vs {right}',
  'report.heading': '文本差异对比报告',
  'report.generatedAt': '生成时间：{time}',
  'report.filesLine': '左侧：{left}（{leftLines} 行）　右侧：{right}（{rightLines} 行）',
  'report.ignoreLine': '忽略选项：{options}',
  'report.optNone': '无',
  'report.optSeparator': '、',

  'report.summary.total': '差异总数：<b>{n}</b> 处',
  'report.summary.modified': '修改行：<b>{n}</b>',
  'report.summary.added': '新增行：<b>{n}</b>',
  'report.summary.removed': '删除行：<b>{n}</b>',
  'report.summary.equal': '相同行：<b>{n}</b>',

  'report.legend.modified': '修改',
  'report.legend.added': '新增',
  'report.legend.removed': '删除',
  'report.noDiff': '无差异',

  'csv.header.type': '类型',
  'csv.header.leftNo': '左侧行号',
  'csv.header.leftContent': '左侧内容',
  'csv.header.rightNo': '右侧行号',
  'csv.header.rightContent': '右侧内容',

  'csv.status.equal': '相同',
  'csv.status.modified': '修改',
  'csv.status.added': '新增',
  'csv.status.removed': '删除',
  'csv.status.empty': '空',
} as const;

export default zhCN;
