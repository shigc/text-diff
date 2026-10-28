# text-diff · Comparateur de textes en ligne

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [Español](./README.es.md) · **Français** · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

Outil de comparaison de textes **entièrement côté client**, inspiré de Beyond Compare. Tous les calculs ont lieu dans votre navigateur et **le texte n'est jamais envoyé à un serveur** : vous pouvez coller des configurations, des journaux ou des contrats sans crainte.

![Aperçu de text-diff](./public/og.png)

## Utilisation en ligne

<https://diff.shigc.top/>

Aucune installation, aucun compte : ouvrez et c'est prêt.

## Fonctionnalités

- **Deux vues** : côte à côte (split) et unifiée (unified), avec surlignage des différences au niveau du caractère
- **Navigation dans les différences** : passer à la différence précédente / suivante, avec le décompte en direct des lignes ajoutées, supprimées et modifiées
- **Options de comparaison** : ignorer les espaces, ignorer la casse, afficher les caractères d'espacement
- **Entrée flexible** : coller, choisir un fichier ou le glisser-déposer dans la zone d'édition
- **Export en un clic** : rapport HTML / PDF / CSV
- **Interface multilingue** : chinois simplifié, chinois traditionnel, anglais, japonais, coréen, espagnol, français, allemand, russe et portugais ; changement immédiat et préférence mémorisée
- **Dépendances minimales** : la seule dépendance à l'exécution est [jsdiff](https://github.com/kpdecker/jsdiff) ; le résultat est un site entièrement statique

## Développement local

Nécessite Node.js 18 ou supérieur.

```bash
npm install
npm run dev        # serveur de développement, http://localhost:5173 par défaut
```

Commandes courantes :

```bash
npm run build            # vérification stricte des types avec tsc + build de production
npm run preview          # prévisualiser le build en local
npm run typecheck        # vérification des types uniquement
npm run lint             # ESLint
npm run format           # formatage Prettier
npm run build:obfuscated # build avec obfuscation JS (désactivée par défaut)
```

Le build de production n'est **pas** obfusqué par défaut, afin de rester lisible et auditable. Pour l'obfusquer lors du déploiement, définissez `OBFUSCATE=1` ou lancez `npm run build:obfuscated`.

## Déploiement sur Cloudflare Pages

### Option 1 : intégration Git (recommandée)

Connectez ce dépôt dans Cloudflare Pages avec la configuration suivante :

| Paramètre        | Valeur          |
| ---------------- | --------------- |
| Framework        | Aucun (None)    |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

Chaque push sur `main` déclenche un déploiement automatique. `public/_headers` est appliqué et ajoute CSP ainsi que d'autres en-têtes de sécurité au site.

### Option 2 : ligne de commande

```bash
npx wrangler login   # autorisation dans le navigateur, ou utilisez un token API
npm run deploy       # build + déploiement
```

Pour utiliser un token API, copiez `.env.example` vers `.env` et renseignez :

```dotenv
CLOUDFLARE_API_TOKEN=votre-token-api
CLOUDFLARE_ACCOUNT_ID=votre-id-de-compte
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` lit `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH` depuis `.env` ; après un fork, il suffit donc de changer le nom du projet. `.env` est exclu par `.gitignore` et n'est jamais commité.

## Structure du projet

```text
.
├─ index.html            squelette d'une page unique (SEO / OG inclus)
├─ public/               robots.txt, sitemap.xml, _headers, image d'aperçu social
├─ scripts/              scripts de build et de déploiement multiplateformes
├─ src/
│  ├─ main.ts            point d'entrée : état, rendu et interactions
│  ├─ state.ts           état global
│  ├─ styles.css         tous les styles
│  ├─ diff/              calcul des différences et types (wrapper jsdiff)
│  ├─ export/            export HTML / PDF / CSV
│  ├─ i18n/              framework i18n et 10 langues
│  └─ ui/                saisie, rendu, navigation et changement de langue
└─ .github/              CI, Dependabot, modèles d'issue / PR
```

## Confidentialité

- Tout le traitement se fait dans l'onglet du navigateur ; aucun point d'envoi n'existe
- Aucun script d'analyse, de suivi, de publicité ou de rapport d'erreur ; la page ne charge aucune ressource tierce
- `localStorage` ne conserve que votre préférence de langue
- Les fichiers exportés sont générés localement et ne sont enregistrés qu'au clic sur télécharger

## Navigateurs pris en charge

Navigateurs modernes uniquement (deux dernières versions majeures de Chrome / Edge / Firefox / Safari). La cible de compilation est ES2020 ; IE n'est pas pris en charge.

## Contribuer

Les issues et PR sont bienvenues. Lisez d'abord [CONTRIBUTING.md](./CONTRIBUTING.md) et [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Pour les problèmes de sécurité, suivez [SECURITY.md](./SECURITY.md) et signalez-les en privé.

## Remerciements

L'algorithme de différences provient de [jsdiff](https://github.com/kpdecker/jsdiff) (MIT) ; l'interaction et le design s'inspirent de [Beyond Compare](https://www.scootersoftware.com/).

## License

[MIT](./LICENSE) © shigc
