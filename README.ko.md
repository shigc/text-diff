# text-diff · 온라인 텍스트 차이 비교

[简体中文](./README.md) · [English](./README.en.md) · [繁體中文](./README.zh-TW.md) · [日本語](./README.ja.md) · **한국어** · [Español](./README.es.md) · [Français](./README.fr.md) · [Deutsch](./README.de.md) · [Русский](./README.ru.md) · [Português](./README.pt.md)

[![CI](https://github.com/shigc/text-diff/actions/workflows/ci.yml/badge.svg)](https://github.com/shigc/text-diff/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/demo-diff.shigc.top-0969da)](https://diff.shigc.top/)

Beyond Compare에서 영감을 받은 **순수 클라이언트 사이드** 텍스트 차이 비교 도구입니다. 모든 연산이 브라우저 안에서 이루어지며 **텍스트는 어떤 서버로도 전송되지 않습니다**. 설정 파일, 로그, 계약서처럼 민감한 내용을 붙여 넣어도 안전합니다.

![text-diff 미리보기](./public/og.png)

## 온라인에서 사용하기

<https://diff.shigc.top/>

설치도 로그인도 필요 없습니다.

## 기능

- **두 가지 보기**: 나란히 보기(split) / 통합 보기(unified), 줄 안의 문자 단위 차이 강조
- **차이 탐색**: 이전 / 다음 차이로 이동, 추가·삭제·수정 줄 수 실시간 집계
- **비교 옵션**: 공백 무시, 대소문자 무시, 공백 기호 시각화
- **유연한 입력**: 붙여 넣기, 파일 선택, 편집 영역으로 드래그 앤 드롭
- **원클릭 내보내기**: HTML 리포트 / PDF / CSV
- **다국어 UI**: 중국어 간체·번체, 영어, 일본어, 한국어, 스페인어, 프랑스어, 독일어, 러시아어, 포르투갈어. 즉시 전환되며 선택이 기억됩니다
- **가벼운 의존성**: 런타임 의존성은 [jsdiff](https://github.com/kpdecker/jsdiff) 하나뿐이며, 빌드 결과물은 순수 정적 파일입니다

## 로컬 개발

Node.js 18 이상이 필요합니다.

```bash
npm install
npm run dev        # 개발 서버, 기본 http://localhost:5173
```

자주 쓰는 명령:

```bash
npm run build            # tsc 엄격 타입 검사 + 프로덕션 빌드
npm run preview          # 빌드 결과물 로컬 미리보기
npm run typecheck        # 타입 검사만
npm run lint             # ESLint
npm run format           # Prettier 포맷
npm run build:obfuscated # JS 난독화를 켠 빌드 (기본 꺼짐)
```

프로덕션 빌드는 기본적으로 **난독화하지 않습니다**. 결과물을 읽을 수 있어 디버깅과 감사가 쉽습니다. 배포 시 난독화가 필요하면 `OBFUSCATE=1`을 설정하거나 `npm run build:obfuscated`를 실행하세요.

## Cloudflare Pages 배포

### 방법 1: Git 연동 (권장)

Cloudflare Pages에서 이 저장소를 연결하고 다음과 같이 설정합니다.

| 항목             | 값              |
| ---------------- | --------------- |
| Framework        | 없음 (None)     |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20              |

이후 `main`에 푸시할 때마다 자동 배포됩니다. `public/_headers`가 적용되어 CSP 등 보안 헤더가 추가됩니다.

### 방법 2: 명령줄 배포

```bash
npx wrangler login   # 브라우저 인증 또는 API 토큰 사용
npm run deploy       # 빌드 + 배포
```

API 토큰을 쓰려면 `.env.example`을 `.env`로 복사하고 값을 채웁니다.

```dotenv
CLOUDFLARE_API_TOKEN=발급받은 API 토큰
CLOUDFLARE_ACCOUNT_ID=계정 ID
CF_PAGES_PROJECT=text-diff
CF_PAGES_BRANCH=main
```

`npm run deploy`는 `.env`의 `CF_PAGES_PROJECT` / `CF_PAGES_BRANCH`를 읽으므로, 포크 후에는 프로젝트 이름만 바꾸면 됩니다. `.env`는 `.gitignore`에 의해 제외되어 커밋되지 않습니다.

## 프로젝트 구조

```text
.
├─ index.html            단일 페이지 골격 (SEO / OG 메타데이터 포함)
├─ public/               robots.txt, sitemap.xml, _headers, 소셜 미리보기 이미지
├─ scripts/              크로스 플랫폼 빌드·배포 스크립트
├─ src/
│  ├─ main.ts            진입점: 상태, 렌더링, 상호작용 연결
│  ├─ state.ts           전역 상태
│  ├─ styles.css         전체 스타일
│  ├─ diff/              차이 계산과 타입 (jsdiff 래퍼)
│  ├─ export/            HTML / PDF / CSV 내보내기
│  ├─ i18n/              다국어 프레임워크와 10개 언어 문구
│  └─ ui/                입력, 렌더링, 탐색, 언어 전환
└─ .github/              CI, Dependabot, issue / PR 템플릿
```

## 개인정보

- 모든 텍스트 처리는 현재 브라우저 탭 안에서 이루어지며 업로드 엔드포인트가 없습니다
- 분석, 추적, 광고, 오류 수집 스크립트가 없고 외부 리소스를 요청하지 않습니다
- `localStorage`에는 UI 언어 설정만 저장합니다
- 내보낸 파일은 브라우저에서 생성되며, 다운로드를 클릭할 때만 저장됩니다

## 브라우저 지원

최신 브라우저(Chrome / Edge / Firefox / Safari 최근 2개 메이저 버전)를 대상으로 합니다. 빌드 타깃은 ES2020이며 IE는 지원하지 않습니다.

## 기여

issue와 PR을 환영합니다. 먼저 [CONTRIBUTING.md](./CONTRIBUTING.md)와 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)를 읽어 주세요. 보안 문제는 [SECURITY.md](./SECURITY.md)의 절차에 따라 비공개로 알려 주세요.

## 감사의 말

차이 알고리즘은 [jsdiff](https://github.com/kpdecker/jsdiff)(MIT), 조작감과 시각 디자인은 [Beyond Compare](https://www.scootersoftware.com/)를 참고했습니다.

## License

[MIT](./LICENSE) © shigc
