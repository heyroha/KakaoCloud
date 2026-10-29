# 🎠 Paradise City Clone

[파라다이스시티](https://www.p-city.com) 메인 페이지를 클론 코딩한 풀스택 프로젝트입니다.
**React + TypeScript** 프런트엔드와 **Node.js(Express) + TypeScript** API 서버로 구성하고,
두 쪽이 같은 타입 정의를 공유하도록 만들었습니다.

<br />

## 🛠 기술 스택

### Frontend — `client/`
| 기술 | 용도 |
| --- | --- |
| ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) | 함수형 컴포넌트, `useState` · `useEffect` |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 컴포넌트 props · state · API 응답 타입 지정 (`strict` 모드) |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 개발 서버, 번들링, `/api` 프록시 |
| ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) | 메인 비주얼 슬라이더 |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Flexbox, Grid, 미디어 쿼리 |

### Backend — `server/`
| 기술 | 용도 |
| --- | --- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | 서버 런타임 |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | REST API 라우팅, JSON 파싱 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | 요청/응답 타입, 입력값 검증 |
| tsx | TypeScript를 빌드 없이 바로 실행 (watch 모드) |

### 공통
| 기술 | 용도 |
| --- | --- |
| npm workspaces | `client` · `server`를 한 저장소에서 관리, 루트에서 함께 실행 |
| ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) | 클라이언트(React Testing Library) · 서버(Supertest) 테스트 |

<br />

## 🏗 아키텍처

```
 브라우저 (localhost:3000)
   │  React + TypeScript (Vite)
   │
   │  fetch("/api/...")
   ▼
 Vite dev server ── proxy ──▶  Express API (localhost:4000)
                                 ├─ GET  /api/slides               메인 슬라이드 목록
                                 ├─ POST /api/reservations/search  객실 검색 (입력값 검증 + 숙박 요금 계산)
                                 └─ GET  /api/health               서버 상태 확인

 shared/types.ts  ←  client · server 모두 import (Slide, SearchRequest, SearchResult …)
```

- 개발 중에는 Vite가 `/api` 요청을 Express로 넘겨 주기 때문에, 프런트에서는 같은 주소를 호출하듯 쓸 수 있고 CORS 설정이 필요 없습니다.
- API의 요청·응답 모양을 `shared/types.ts` 한 곳에서 정의해서, 서버 응답 형식이 바뀌면 프런트 코드에서 바로 타입 에러가 납니다.

<br />

## 📁 폴더 구조

```
CloneCoding
├── package.json                # 루트: workspaces 설정, dev/build/test 스크립트
├── shared
│   └── types.ts                # client · server 공용 타입
├── server                      # Node.js + Express + TypeScript
│   └── src
│       ├── index.ts            # 서버 실행 (API_PORT, 기본 4000)
│       ├── app.ts              # Express 앱 생성 · 라우터 연결 (테스트에서 재사용)
│       ├── app.test.ts         # API 테스트 (Supertest)
│       ├── routes
│       │   ├── slides.ts       # GET /api/slides
│       │   └── reservations.ts # POST /api/reservations/search
│       └── data
│           ├── slides.ts       # 슬라이드 데이터
│           └── rooms.ts        # 샘플 객실 데이터
└── client                      # React + TypeScript + Vite
    ├── index.html
    ├── vite.config.ts          # /api 프록시, 테스트 설정
    └── src
        ├── main.tsx            # 진입점
        ├── App.tsx             # Header → Hero → SearchBar → Footer
        ├── App.css
        ├── App.test.tsx        # 화면 테스트 (fetch 목 처리)
        ├── api/client.ts       # API 호출 함수 (제네릭 request<T>)
        ├── data/nav.ts         # GNB 메뉴 데이터
        ├── assets              # 로고, 아이콘
        └── components
            ├── Header/Header.tsx
            ├── Hero/Hero.tsx
            ├── SearchBar/SearchBar.tsx
            └── Footer/{Footer.tsx, Footer.css}
```

<br />

## ✨ 주요 구현

### 1. 서버에서 받아오는 메인 슬라이더 (`Hero.tsx` ↔ `GET /api/slides`)
- `useEffect`에서 `/api/slides`를 호출하고 `useState<Slide[]>`에 저장합니다.
- 슬라이드 `type`(`"image" | "video"`)에 따라 `<img>` 또는 `<video>`를 렌더링합니다.
- Swiper `Navigation` · `Pagination` · `Autoplay` · `A11y` 모듈을 사용하고, 5초마다 자동으로 넘어갑니다.

### 2. 객실 검색 (`SearchBar.tsx` ↔ `POST /api/reservations/search`)
- 폼 전체를 `useState<SearchRequest>` 하나로 관리하고, 제네릭 `update<K extends keyof SearchRequest>`로 필드별 값 타입을 강제합니다.
- 서버에서 입력값을 검증합니다: 존재하는 호텔인지, 날짜 형식이 맞는지, 체크아웃이 체크인보다 뒤인지, 인원 수가 올바른지. 잘못되면 `400`과 에러 메시지를 돌려줍니다.
- 통과하면 숙박 일수를 계산하고, 인원이 들어가는 객실만 골라 총 요금과 함께 돌려줍니다.
- 화면에는 검색 중 상태, 결과 목록, 에러 메시지를 각각 표시합니다.

### 3. 공용 타입과 API 클라이언트
- `shared/types.ts`의 `HOTELS`는 `as const` 배열이고, 여기서 `Hotel` 유니언 타입을 뽑아 씁니다. 그래서 프런트의 선택 목록과 서버의 검증 기준이 항상 같습니다.
- `api/client.ts`의 `request<T>()`가 응답 상태를 확인하고, 실패하면 서버 메시지를 담은 `Error`를 던집니다.

<br />

## 📡 API 명세

### `GET /api/slides`
메인 비주얼 슬라이드 목록을 돌려줍니다.

```json
[
  { "id": 1, "type": "image", "src": "https://.../1752744777561.png", "title": "", "sub": "조엘 메슬러의 감각적인 아트로 물든 트로피컬 서머!" },
  { "id": 3, "type": "video", "src": "https://.../1745830105346.mp4", "title": "Special Offer", "sub": "Only this week" }
]
```

### `POST /api/reservations/search`
조건에 맞는 객실과 숙박 요금을 돌려줍니다.

**Request**
```json
{ "hotel": "호텔 파라다이스", "checkIn": "2026-11-01", "checkOut": "2026-11-03", "adult": 2, "child": 1 }
```

**Response `200`**
```json
{
  "nights": 2,
  "rooms": [
    { "id": "hp-family", "hotel": "호텔 파라다이스", "name": "디럭스 패밀리 트윈", "maxGuests": 4, "pricePerNight": 410000, "totalPrice": 820000 },
    { "id": "hp-suite", "hotel": "호텔 파라다이스", "name": "프리미어 스위트", "maxGuests": 3, "pricePerNight": 780000, "totalPrice": 1560000 }
  ]
}
```

**Response `400`** — 입력값이 잘못된 경우
```json
{ "message": "체크아웃은 체크인 다음 날 이후여야 합니다." }
```

| 검증 항목 | 조건 |
| --- | --- |
| `hotel` | `HOTELS` 목록에 있는 호텔 |
| `checkIn` · `checkOut` | `YYYY-MM-DD` 형식, 체크아웃이 체크인보다 뒤 |
| `adult` | 1 이상의 정수 |
| `child` | 0 이상의 정수 |

<br />

## 🔄 개발 과정

1. **React 클론 (CRA)** — 원본 사이트의 HTML·CSS 구조를 참고해 Header · Hero · SearchBar · Footer를 컴포넌트로 나누고, Swiper로 메인 슬라이더를 구현했습니다.
2. **TypeScript 전환** — 빌드 도구를 CRA에서 Vite로 바꾸고, 모든 컴포넌트를 `.tsx`로 옮겨 props · state · API 응답에 타입을 붙였습니다.
3. **Node.js API 서버 추가** — 프런트에 하드코딩돼 있던 슬라이드 데이터와 `alert`로 끝나던 검색 기능을 Express API로 옮겨, 실제로 서버와 데이터를 주고받는 구조로 확장했습니다.
4. **공용 타입 · 테스트** — `shared/types.ts`로 API 계약을 한 곳에서 관리하고, 서버(Supertest)와 화면(Testing Library) 테스트를 추가했습니다.

<br />

## 🧯 트러블슈팅

| 문제 | 원인 | 해결 |
| --- | --- | --- |
| 헤더가 메인 슬라이더에 가려져 보이지 않음 | `position: fixed` 헤더에 `z-index`가 없어, DOM상 뒤에 오는 `#main`(`position: relative`)이 위에 그려짐 | `.headerWrap`에 `z-index` 지정 |
| 슬라이더 무한 반복이 동작하지 않음 | Swiper 11의 `loop` 모드는 슬라이드 수가 적으면(3장) 비활성화됨 | 마지막 → 처음으로 되감는 `rewind` 옵션으로 변경 |
| CRA 테스트에서 `swiper/react`를 찾지 못함 | Swiper 11은 ESM 전용 + package `exports` 사용, CRA의 Jest 27이 이를 해석하지 못함 | Vite + Vitest로 전환해 ESM을 그대로 사용 |
| API 서버가 프런트와 같은 포트로 뜸 | 실행 환경이 넘겨준 `PORT=3000` 환경변수를 서버도 읽음 | 서버 포트를 `API_PORT`로 분리 (기본 4000) |
| 서버가 꺼져 있을 때 `Unexpected end of JSON input` 에러 | 프록시가 빈 응답을 주어 `res.json()` 파싱 실패 | 파싱 실패 시 "서버에 연결할 수 없습니다" 메시지로 변환 |

<br />

## 🚀 실행 방법

```bash
npm install     # client · server 의존성 한 번에 설치
npm run dev     # API 서버(4000) + 프런트(3000) 동시 실행 → http://localhost:3000
```

| 명령 | 설명 |
| --- | --- |
| `npm run build` | 서버 타입 검사 + 프런트 배포용 빌드 (`client/dist`) |
| `npm run typecheck` | client · server TypeScript 타입 검사 |
| `npm test` | 서버 API 테스트 + 프런트 화면 테스트 |

<br />

## 📝 참고

- 객실 데이터와 요금은 실제 예약 시스템이 아닌 **샘플 데이터**입니다.
- 슬라이드 이미지·영상은 원본 사이트의 URL을 그대로 불러옵니다.
- 학습 목적의 클론 코딩이며, 모든 콘텐츠의 저작권은 파라다이스시티에 있습니다.
