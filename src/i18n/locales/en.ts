import type { Messages } from '../types';

const en: Messages = {
  'app.title': 'Text Diff',

  'opt.ignoreWhitespace': 'Ignore whitespace',
  'opt.ignoreCase': 'Ignore case',
  'opt.showWhitespace': 'Show whitespace',

  'view.label': 'View',
  'view.split': 'Split',
  'view.unified': 'Unified',

  'btn.compare': 'Compare',
  'btn.prev': 'Previous difference',
  'btn.next': 'Next difference',
  'btn.exportHtml': 'Export HTML',
  'btn.exportPdf': 'Export PDF',
  'btn.exportCsv': 'Export CSV',
  'btn.pickFile': 'Choose file',

  'editor.leftName': 'Left text',
  'editor.rightName': 'Right text',
  'editor.leftPlaceholder': 'Paste or type the left text here, or drag a file into this area…',
  'editor.rightPlaceholder': 'Paste or type the right text here, or drag a file into this area…',

  'head.left': 'Left',
  'head.right': 'Right',
  'head.lineNo': 'Line (left / right)',
  'head.content': 'Content',

  'result.placeholder': 'The comparison result will appear here',
  'toast.pdfHint':
    'The print dialog is open. Choose “Save as PDF” as the destination to finish exporting.',

  'counter.none': 'No differences',
  'counter.partial': 'Difference {index} of {total}',
  'counter.total': '{total} differences',

  'lang.label': 'Language',

  'report.docTitle': 'Diff Report - {left} vs {right}',
  'report.heading': 'Text Diff Report',
  'report.generatedAt': 'Generated: {time}',
  'report.filesLine': 'Left: {left} ({leftLines} lines) &nbsp; Right: {right} ({rightLines} lines)',
  'report.ignoreLine': 'Ignored options: {options}',
  'report.optNone': 'None',
  'report.optSeparator': ', ',

  'report.summary.total': 'Total differences: <b>{n}</b>',
  'report.summary.modified': 'Modified lines: <b>{n}</b>',
  'report.summary.added': 'Added lines: <b>{n}</b>',
  'report.summary.removed': 'Removed lines: <b>{n}</b>',
  'report.summary.equal': 'Unchanged lines: <b>{n}</b>',

  'report.legend.modified': 'Modified',
  'report.legend.added': 'Added',
  'report.legend.removed': 'Removed',
  'report.noDiff': 'No differences',

  'csv.header.type': 'Type',
  'csv.header.leftNo': 'Left line no.',
  'csv.header.leftContent': 'Left content',
  'csv.header.rightNo': 'Right line no.',
  'csv.header.rightContent': 'Right content',

  'csv.status.equal': 'Equal',
  'csv.status.modified': 'Modified',
  'csv.status.added': 'Added',
  'csv.status.removed': 'Removed',
  'csv.status.empty': 'Empty',
};

export default en;
