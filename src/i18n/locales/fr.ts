import type { Messages } from '../types';

const fr: Messages = {
  'app.title': 'Comparaison de texte',

  'opt.ignoreWhitespace': 'Ignorer les espaces',
  'opt.ignoreCase': 'Ignorer la casse',
  'opt.showWhitespace': 'Afficher les espaces',

  'view.label': 'Affichage',
  'view.split': 'Côte à côte',
  'view.unified': 'Unifié',

  'btn.compare': 'Comparer',
  'btn.prev': 'Différence précédente',
  'btn.next': 'Différence suivante',
  'btn.exportHtml': 'Exporter en HTML',
  'btn.exportPdf': 'Exporter en PDF',
  'btn.exportCsv': 'Exporter en CSV',
  'btn.pickFile': 'Choisir un fichier',

  'editor.leftName': 'Texte de gauche',
  'editor.rightName': 'Texte de droite',
  'editor.leftPlaceholder':
    'Collez ou saisissez le texte de gauche ici, ou glissez un fichier dans cette zone…',
  'editor.rightPlaceholder':
    'Collez ou saisissez le texte de droite ici, ou glissez un fichier dans cette zone…',

  'head.left': 'Gauche',
  'head.right': 'Droite',
  'head.lineNo': 'Ligne (gauche / droite)',
  'head.content': 'Contenu',

  'result.placeholder': 'Le résultat de la comparaison s’affichera ici',
  'toast.pdfHint':
    'La boîte de dialogue d’impression est ouverte. Choisissez « Enregistrer au format PDF » pour terminer l’export.',

  'counter.none': 'Aucune différence',
  'counter.partial': 'Différence {index} sur {total}',
  'counter.total': '{total} différences',

  'lang.label': 'Langue',

  'report.docTitle': 'Rapport de différences - {left} vs {right}',
  'report.heading': 'Rapport de comparaison de texte',
  'report.generatedAt': 'Généré le : {time}',
  'report.filesLine':
    'Gauche : {left} ({leftLines} lignes) &nbsp; Droite : {right} ({rightLines} lignes)',
  'report.ignoreLine': 'Options ignorées : {options}',
  'report.optNone': 'Aucune',
  'report.optSeparator': ', ',

  'report.summary.total': 'Nombre total de différences : <b>{n}</b>',
  'report.summary.modified': 'Lignes modifiées : <b>{n}</b>',
  'report.summary.added': 'Lignes ajoutées : <b>{n}</b>',
  'report.summary.removed': 'Lignes supprimées : <b>{n}</b>',
  'report.summary.equal': 'Lignes identiques : <b>{n}</b>',

  'report.legend.modified': 'Modifiées',
  'report.legend.added': 'Ajoutées',
  'report.legend.removed': 'Supprimées',
  'report.noDiff': 'Aucune différence',

  'csv.header.type': 'Type',
  'csv.header.leftNo': 'N° de ligne gauche',
  'csv.header.leftContent': 'Contenu gauche',
  'csv.header.rightNo': 'N° de ligne droite',
  'csv.header.rightContent': 'Contenu droite',

  'csv.status.equal': 'Identique',
  'csv.status.modified': 'Modifiée',
  'csv.status.added': 'Ajoutée',
  'csv.status.removed': 'Supprimée',
  'csv.status.empty': 'Vide',
};

export default fr;
