import type { Messages } from '../types';

const de: Messages = {
  'app.title': 'Textvergleich',

  'opt.ignoreWhitespace': 'Leerzeichen ignorieren',
  'opt.ignoreCase': 'Groß-/Kleinschreibung ignorieren',
  'opt.showWhitespace': 'Leerzeichen anzeigen',

  'view.label': 'Ansicht',
  'view.split': 'Nebeneinander',
  'view.unified': 'Vereinheitlicht',

  'btn.compare': 'Vergleichen',
  'btn.prev': 'Vorheriger Unterschied',
  'btn.next': 'Nächster Unterschied',
  'btn.exportHtml': 'HTML exportieren',
  'btn.exportPdf': 'PDF exportieren',
  'btn.exportCsv': 'CSV exportieren',
  'btn.pickFile': 'Datei wählen',

  'editor.leftName': 'Linker Text',
  'editor.rightName': 'Rechter Text',
  'editor.leftPlaceholder':
    'Fügen Sie hier den linken Text ein oder geben Sie ihn ein, oder ziehen Sie eine Datei in diesen Bereich…',
  'editor.rightPlaceholder':
    'Fügen Sie hier den rechten Text ein oder geben Sie ihn ein, oder ziehen Sie eine Datei in diesen Bereich…',

  'head.left': 'Links',
  'head.right': 'Rechts',
  'head.lineNo': 'Zeile (links / rechts)',
  'head.content': 'Inhalt',

  'result.placeholder': 'Das Vergleichsergebnis wird hier angezeigt',
  'toast.pdfHint':
    'Der Druckdialog wurde geöffnet. Wählen Sie als Ziel „Als PDF speichern“, um den Export abzuschließen.',

  'counter.none': 'Keine Unterschiede',
  'counter.partial': 'Unterschied {index} von {total}',
  'counter.total': '{total} Unterschiede',

  'lang.label': 'Sprache',

  'report.docTitle': 'Vergleichsbericht - {left} vs {right}',
  'report.heading': 'Textvergleich-Bericht',
  'report.generatedAt': 'Erstellt: {time}',
  'report.filesLine':
    'Links: {left} ({leftLines} Zeilen) &nbsp; Rechts: {right} ({rightLines} Zeilen)',
  'report.ignoreLine': 'Ignorierte Optionen: {options}',
  'report.optNone': 'Keine',
  'report.optSeparator': ', ',

  'report.summary.total': 'Unterschiede gesamt: <b>{n}</b>',
  'report.summary.modified': 'Geänderte Zeilen: <b>{n}</b>',
  'report.summary.added': 'Hinzugefügte Zeilen: <b>{n}</b>',
  'report.summary.removed': 'Gelöschte Zeilen: <b>{n}</b>',
  'report.summary.equal': 'Gleiche Zeilen: <b>{n}</b>',

  'report.legend.modified': 'Geändert',
  'report.legend.added': 'Hinzugefügt',
  'report.legend.removed': 'Gelöscht',
  'report.noDiff': 'Keine Unterschiede',

  'csv.header.type': 'Typ',
  'csv.header.leftNo': 'Linke Zeilennr.',
  'csv.header.leftContent': 'Linker Inhalt',
  'csv.header.rightNo': 'Rechte Zeilennr.',
  'csv.header.rightContent': 'Rechter Inhalt',

  'csv.status.equal': 'Gleich',
  'csv.status.modified': 'Geändert',
  'csv.status.added': 'Hinzugefügt',
  'csv.status.removed': 'Gelöscht',
  'csv.status.empty': 'Leer',
};

export default de;
