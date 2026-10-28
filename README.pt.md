# text-diff · Comparador de textos online

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · **Português**

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

Ferramenta de comparação de textos **totalmente no lado do cliente**, inspirada no Beyond Compare. Todo o processamento acontece no seu navegador e **o texto nunca é enviado a nenhum servidor**, então você pode colar configurações, logs ou contratos sem preocupação.

![Prévia do text-diff](./public/og.png)

## Uso online

<https://diff.shigc.top/>

Sem instalação e sem cadastro: é só abrir e usar.

## Recursos

- **Dois modos de visualização**: lado a lado (split) e unificado (unified), com destaque de diferenças no nível do caractere
- **Navegação entre diferenças**: vá para a diferença anterior / seguinte e veja em tempo real a contagem de linhas adicionadas, removidas e modificadas
- **Opções de comparação**: ignorar espaços em branco, ignorar maiúsculas e minúsculas, visualizar os espaços
- **Entrada flexível**: colar, escolher um arquivo ou arrastar e soltar na área de edição
- **Exportação em um clique**: relatório HTML / PDF / CSV
- **Interface multilíngue**: chinês simplificado e tradicional, inglês, japonês, coreano, espanhol, francês, alemão, russo e português; troca imediata com preferência salva
- **Dependências mínimas**: a única dependência em tempo de execução é o [jsdiff](https://github.com/kpdecker/jsdiff); o resultado é um site puramente estático

## Desenvolvimento local

Requer Node.js 18 ou superior.

```bash
npm install
npm run dev        # servidor de desenvolvimento, por padrão http://localhost:5173
```

Comandos comuns:

```bash
npm run build            # verificação estrita de tipos com tsc + build de produção
npm run preview          # prévia local do build
npm run typecheck        # apenas verificação de tipos
npm run lint             # ESLint
npm run format           # formatação com Prettier
npm run build:obfuscated # build com ofuscação de JS (desativada por padrão)
```

O build de produção **não** é ofuscado por padrão, mantendo o resultado legível e auditável. Se quiser ofuscar no deploy, defina `OBFUSCATE=1` ou execute `npm run build:obfuscated`.

## Implantar no Cloudflare Pages

### Opção 1: integração com Git (recomendada)

Conecte este repositório no Cloudflare Pages com a seguinte configuração:

| Item             | Valor           |
| ---------------- | --------------- |
| Framework        | Nenhum (None)   |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

Cada push em `main` é implantado automaticamente. O `public/_headers` entra em vigor e adiciona CSP e outros cabeçalhos de segurança ao site.

### Opção 2: linha de comando

```bash
npx wrangler login   # autorização no navegador, ou use um token de API
npm run deploy       # build + implantação
```

Para usar um token de API, copie `.env.example` para `.env` e preencha:

```dotenv
CLOUDFLARE_API_TOKEN=seu-token-de-api
CLOUDFLARE_ACCOUNT_ID=seu-id-de-conta
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

O `npm run deploy` lê `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH` do `.env`, então após um fork basta alterar o nome do projeto. O `.env` está no `.gitignore` e nunca é commitado.

## Estrutura do projeto

```text
.
├─ index.html            esqueleto da página única (inclui SEO / OG)
├─ public/               robots.txt, sitemap.xml, _headers, imagem de prévia social
├─ scripts/              scripts multiplataforma de build e deploy
├─ src/
│  ├─ main.ts            ponto de entrada: estado, renderização e interação
│  ├─ state.ts           estado global
│  ├─ styles.css         todos os estilos
│  ├─ diff/              cálculo de diferenças e tipos (wrapper do jsdiff)
│  ├─ export/            exportação HTML / PDF / CSV
│  ├─ i18n/              framework de i18n e 10 idiomas
│  └─ ui/                entrada, renderização, navegação e troca de idioma
└─ .github/              CI, Dependabot, modelos de issue / PR
```

## Privacidade

- Todo o processamento ocorre na aba do navegador; não existe endpoint de upload
- Sem scripts de analytics, rastreamento, anúncios ou relato de erros; a página não carrega recursos de terceiros
- O `localStorage` guarda apenas a preferência de idioma da interface
- Os arquivos exportados são gerados localmente e só são salvos quando você clica em baixar

## Navegadores compatíveis

Somente navegadores modernos (duas últimas versões principais de Chrome / Edge / Firefox / Safari). O alvo de compilação é ES2020; o IE não é suportado.

## Contribuir

Issues e PRs são bem-vindos. Leia primeiro o [CONTRIBUTING.md](./CONTRIBUTING.md) e o [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Para questões de segurança, siga o [SECURITY.md](./SECURITY.md) e reporte de forma privada.

## Agradecimentos

O algoritmo de diferenças vem do [jsdiff](https://github.com/kpdecker/jsdiff) (MIT); a interação e o visual se inspiram no [Beyond Compare](https://www.scootersoftware.com/).

## License

[MIT](./LICENSE) © shigc
