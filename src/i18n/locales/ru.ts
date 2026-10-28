import type { Messages } from '../types';

const ru: Messages = {
  'app.title': 'Сравнение текста',

  'opt.ignoreWhitespace': 'Игнорировать пробелы',
  'opt.ignoreCase': 'Игнорировать регистр',
  'opt.showWhitespace': 'Показывать пробелы',

  'view.label': 'Вид',
  'view.split': 'Рядом',
  'view.unified': 'Объединённый',

  'btn.compare': 'Сравнить',
  'btn.prev': 'Предыдущее различие',
  'btn.next': 'Следующее различие',
  'btn.exportHtml': 'Экспорт в HTML',
  'btn.exportPdf': 'Экспорт в PDF',
  'btn.exportCsv': 'Экспорт в CSV',
  'btn.pickFile': 'Выбрать файл',

  'editor.leftName': 'Текст слева',
  'editor.rightName': 'Текст справа',
  'editor.leftPlaceholder': 'Вставьте или введите текст слева, либо перетащите файл в эту область…',
  'editor.rightPlaceholder':
    'Вставьте или введите текст справа, либо перетащите файл в эту область…',

  'head.left': 'Слева',
  'head.right': 'Справа',
  'head.lineNo': 'Строка (слева / справа)',
  'head.content': 'Содержимое',

  'result.placeholder': 'Результат сравнения появится здесь',
  'toast.pdfHint':
    'Открыто окно печати. Выберите «Сохранить как PDF» в качестве назначения, чтобы завершить экспорт.',

  'counter.none': 'Различий нет',
  'counter.partial': 'Различие {index} из {total}',
  'counter.total': 'Различий: {total}',

  'lang.label': 'Язык',

  'report.docTitle': 'Отчёт о различиях - {left} vs {right}',
  'report.heading': 'Отчёт о сравнении текста',
  'report.generatedAt': 'Создано: {time}',
  'report.filesLine':
    'Слева: {left} ({leftLines} строк) &nbsp; Справа: {right} ({rightLines} строк)',
  'report.ignoreLine': 'Игнорируемые параметры: {options}',
  'report.optNone': 'Нет',
  'report.optSeparator': ', ',

  'report.summary.total': 'Всего различий: <b>{n}</b>',
  'report.summary.modified': 'Изменённых строк: <b>{n}</b>',
  'report.summary.added': 'Добавленных строк: <b>{n}</b>',
  'report.summary.removed': 'Удалённых строк: <b>{n}</b>',
  'report.summary.equal': 'Совпадающих строк: <b>{n}</b>',

  'report.legend.modified': 'Изменено',
  'report.legend.added': 'Добавлено',
  'report.legend.removed': 'Удалено',
  'report.noDiff': 'Различий нет',

  'csv.header.type': 'Тип',
  'csv.header.leftNo': '№ строки слева',
  'csv.header.leftContent': 'Содержимое слева',
  'csv.header.rightNo': '№ строки справа',
  'csv.header.rightContent': 'Содержимое справа',

  'csv.status.equal': 'Совпадает',
  'csv.status.modified': 'Изменено',
  'csv.status.added': 'Добавлено',
  'csv.status.removed': 'Удалено',
  'csv.status.empty': 'Пусто',
};

export default ru;
