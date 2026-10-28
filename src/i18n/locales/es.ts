import type { Messages } from '../types';

const es: Messages = {
  'app.title': 'Comparación de texto',

  'opt.ignoreWhitespace': 'Ignorar espacios en blanco',
  'opt.ignoreCase': 'Ignorar mayúsculas/minúsculas',
  'opt.showWhitespace': 'Mostrar espacios en blanco',

  'view.label': 'Vista',
  'view.split': 'Lado a lado',
  'view.unified': 'Unificada',

  'btn.compare': 'Comparar',
  'btn.prev': 'Diferencia anterior',
  'btn.next': 'Diferencia siguiente',
  'btn.exportHtml': 'Exportar HTML',
  'btn.exportPdf': 'Exportar PDF',
  'btn.exportCsv': 'Exportar CSV',
  'btn.pickFile': 'Elegir archivo',

  'editor.leftName': 'Texto izquierdo',
  'editor.rightName': 'Texto derecho',
  'editor.leftPlaceholder':
    'Pega o escribe aquí el texto izquierdo, o arrastra un archivo a esta zona…',
  'editor.rightPlaceholder':
    'Pega o escribe aquí el texto derecho, o arrastra un archivo a esta zona…',

  'head.left': 'Izquierda',
  'head.right': 'Derecha',
  'head.lineNo': 'Línea (izq. / der.)',
  'head.content': 'Contenido',

  'result.placeholder': 'El resultado de la comparación aparecerá aquí',
  'toast.pdfHint':
    'Se abrió el diálogo de impresión. Elige «Guardar como PDF» como destino para completar la exportación.',

  'counter.none': 'Sin diferencias',
  'counter.partial': 'Diferencia {index} de {total}',
  'counter.total': '{total} diferencias',

  'lang.label': 'Idioma',

  'report.docTitle': 'Informe de diferencias - {left} vs {right}',
  'report.heading': 'Informe de comparación de texto',
  'report.generatedAt': 'Generado: {time}',
  'report.filesLine':
    'Izquierda: {left} ({leftLines} líneas) &nbsp; Derecha: {right} ({rightLines} líneas)',
  'report.ignoreLine': 'Opciones ignoradas: {options}',
  'report.optNone': 'Ninguna',
  'report.optSeparator': ', ',

  'report.summary.total': 'Total de diferencias: <b>{n}</b>',
  'report.summary.modified': 'Líneas modificadas: <b>{n}</b>',
  'report.summary.added': 'Líneas añadidas: <b>{n}</b>',
  'report.summary.removed': 'Líneas eliminadas: <b>{n}</b>',
  'report.summary.equal': 'Líneas iguales: <b>{n}</b>',

  'report.legend.modified': 'Modificadas',
  'report.legend.added': 'Añadidas',
  'report.legend.removed': 'Eliminadas',
  'report.noDiff': 'Sin diferencias',

  'csv.header.type': 'Tipo',
  'csv.header.leftNo': 'N.º de línea izq.',
  'csv.header.leftContent': 'Contenido izquierdo',
  'csv.header.rightNo': 'N.º de línea der.',
  'csv.header.rightContent': 'Contenido derecho',

  'csv.status.equal': 'Igual',
  'csv.status.modified': 'Modificada',
  'csv.status.added': 'Añadida',
  'csv.status.removed': 'Eliminada',
  'csv.status.empty': 'Vacía',
};

export default es;
