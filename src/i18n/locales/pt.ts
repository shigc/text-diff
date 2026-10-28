import type { Messages } from '../types';

const pt: Messages = {
  'app.title': 'Comparação de texto',

  'opt.ignoreWhitespace': 'Ignorar espaços em branco',
  'opt.ignoreCase': 'Ignorar maiúsculas/minúsculas',
  'opt.showWhitespace': 'Mostrar espaços em branco',

  'view.label': 'Visualização',
  'view.split': 'Lado a lado',
  'view.unified': 'Unificada',

  'btn.compare': 'Comparar',
  'btn.prev': 'Diferença anterior',
  'btn.next': 'Próxima diferença',
  'btn.exportHtml': 'Exportar HTML',
  'btn.exportPdf': 'Exportar PDF',
  'btn.exportCsv': 'Exportar CSV',
  'btn.pickFile': 'Escolher arquivo',

  'editor.leftName': 'Texto da esquerda',
  'editor.rightName': 'Texto da direita',
  'editor.leftPlaceholder':
    'Cole ou digite aqui o texto da esquerda, ou arraste um arquivo para esta área…',
  'editor.rightPlaceholder':
    'Cole ou digite aqui o texto da direita, ou arraste um arquivo para esta área…',

  'head.left': 'Esquerda',
  'head.right': 'Direita',
  'head.lineNo': 'Linha (esq. / dir.)',
  'head.content': 'Conteúdo',

  'result.placeholder': 'O resultado da comparação aparecerá aqui',
  'toast.pdfHint':
    'A caixa de diálogo de impressão foi aberta. Escolha “Salvar como PDF” como destino para concluir a exportação.',

  'counter.none': 'Sem diferenças',
  'counter.partial': 'Diferença {index} de {total}',
  'counter.total': '{total} diferenças',

  'lang.label': 'Idioma',

  'report.docTitle': 'Relatório de diferenças - {left} vs {right}',
  'report.heading': 'Relatório de comparação de texto',
  'report.generatedAt': 'Gerado em: {time}',
  'report.filesLine':
    'Esquerda: {left} ({leftLines} linhas) &nbsp; Direita: {right} ({rightLines} linhas)',
  'report.ignoreLine': 'Opções ignoradas: {options}',
  'report.optNone': 'Nenhuma',
  'report.optSeparator': ', ',

  'report.summary.total': 'Total de diferenças: <b>{n}</b>',
  'report.summary.modified': 'Linhas modificadas: <b>{n}</b>',
  'report.summary.added': 'Linhas adicionadas: <b>{n}</b>',
  'report.summary.removed': 'Linhas removidas: <b>{n}</b>',
  'report.summary.equal': 'Linhas iguais: <b>{n}</b>',

  'report.legend.modified': 'Modificadas',
  'report.legend.added': 'Adicionadas',
  'report.legend.removed': 'Removidas',
  'report.noDiff': 'Sem diferenças',

  'csv.header.type': 'Tipo',
  'csv.header.leftNo': 'N.º da linha esq.',
  'csv.header.leftContent': 'Conteúdo esquerdo',
  'csv.header.rightNo': 'N.º da linha dir.',
  'csv.header.rightContent': 'Conteúdo direito',

  'csv.status.equal': 'Igual',
  'csv.status.modified': 'Modificada',
  'csv.status.added': 'Adicionada',
  'csv.status.removed': 'Removida',
  'csv.status.empty': 'Vazia',
};

export default pt;
