# text-diff · Comparador de textos en línea

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · [한국어](./README.ko.md) · **Español** · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

Herramienta de comparación de textos **totalmente del lado del cliente**, inspirada en Beyond Compare. Todo el cálculo ocurre en tu navegador y **el texto nunca se sube a ningún servidor**, así que puedes pegar configuraciones, registros o contratos sin preocupación.

![Vista previa de text-diff](./public/og.png)

## Uso en línea

<https://diff.shigc.top/>

Sin instalación ni registro: abre y usa.

## Características

- **Dos vistas**: en paralelo (split) y unificada (unified), con resaltado de diferencias a nivel de carácter
- **Navegación de diferencias**: salta a la anterior / siguiente y consulta en vivo las líneas añadidas, eliminadas y modificadas
- **Opciones de comparación**: ignorar espacios en blanco, ignorar mayúsculas y minúsculas, visualizar los espacios
- **Entrada flexible**: pegar, elegir un archivo o arrastrarlo al área de edición
- **Exportación en un clic**: informe HTML / PDF / CSV
- **Interfaz multilingüe**: chino simplificado, chino tradicional, inglés, japonés, coreano, español, francés, alemán, ruso y portugués; cambia al instante y recuerda tu elección
- **Dependencias mínimas**: la única dependencia en tiempo de ejecución es [jsdiff](https://github.com/kpdecker/jsdiff); el resultado es un sitio puramente estático

## Desarrollo local

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev        # servidor de desarrollo, por defecto http://localhost:5173
```

Comandos habituales:

```bash
npm run build            # comprobación estricta de tipos con tsc + build de producción
npm run preview          # previsualiza el build en local
npm run typecheck        # solo comprobación de tipos
npm run lint             # ESLint
npm run format           # formateo con Prettier
npm run build:obfuscated # build con ofuscación de JS (desactivada por defecto)
```

El build de producción **no** se ofusca por defecto, de modo que el resultado sigue siendo legible y auditable. Si quieres ofuscarlo al desplegar, define `OBFUSCATE=1` o ejecuta `npm run build:obfuscated`.

## Desplegar en Cloudflare Pages

### Opción 1: integración con Git (recomendada)

Conecta este repositorio en Cloudflare Pages con esta configuración:

| Ajuste           | Valor           |
| ---------------- | --------------- |
| Framework        | Ninguno (None)  |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

Cada push a `main` se desplegará automáticamente. `public/_headers` se aplica y añade CSP y otras cabeceras de seguridad al sitio.

### Opción 2: línea de comandos

```bash
npx wrangler login   # autorización en el navegador, o usa un token de API
npm run deploy       # build + despliegue
```

Para usar un token de API, copia `.env.example` a `.env` y rellena:

```dotenv
CLOUDFLARE_API_TOKEN=tu-token-de-api
CLOUDFLARE_ACCOUNT_ID=tu-id-de-cuenta
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy` lee `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH` de `.env`, así que al hacer fork solo tienes que cambiar el nombre del proyecto. `.env` está excluido por `.gitignore` y nunca se sube al repositorio.

## Estructura del proyecto

```text
.
├─ index.html            esqueleto de una sola página (incluye SEO / OG)
├─ public/               robots.txt, sitemap.xml, _headers, imagen de vista previa
├─ scripts/              scripts de build y despliegue multiplataforma
├─ src/
│  ├─ main.ts            punto de entrada: estado, renderizado e interacción
│  ├─ state.ts           estado global
│  ├─ styles.css         todos los estilos
│  ├─ diff/              cálculo de diferencias y tipos (envoltorio de jsdiff)
│  ├─ export/            exportación HTML / PDF / CSV
│  ├─ i18n/              framework de i18n y 10 idiomas
│  └─ ui/                entrada, renderizado, navegación y cambio de idioma
└─ .github/              CI, Dependabot, plantillas de issue / PR
```

## Privacidad

- Todo el procesamiento ocurre dentro de la pestaña del navegador; no existe ningún endpoint de subida
- Sin analítica, rastreo, publicidad ni reporte de errores; la página no solicita recursos de terceros
- `localStorage` solo guarda tu preferencia de idioma
- Los archivos exportados se generan en local y solo se guardan cuando pulsas descargar

## Navegadores compatibles

Navegadores modernos (las dos últimas versiones principales de Chrome / Edge / Firefox / Safari). El objetivo de compilación es ES2020; no se admite IE.

## Contribuir

Las issues y los PR son bienvenidos. Lee primero [CONTRIBUTING.md](./CONTRIBUTING.md) y [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Para problemas de seguridad, sigue [SECURITY.md](./SECURITY.md) y repórtalos de forma privada.

## Agradecimientos

El algoritmo de diferencias proviene de [jsdiff](https://github.com/kpdecker/jsdiff) (MIT); la interacción y el diseño se inspiran en [Beyond Compare](https://www.scootersoftware.com/).

## License

[MIT](./LICENSE) © shigc
