# 🎠 Paradise City Clone

[파라다이스시티](https://www.p-city.com) 메인 페이지를 React로 클론 코딩한 프로젝트입니다.
상단 띠 배너와 헤더, 이미지·영상 메인 슬라이더, 객실 예약 검색바, 푸터까지 한 페이지로 구성했습니다.

<br />

## 🛠 기술 스택

| 구분 | 사용 기술 | 버전 | 용도 |
| --- | --- | --- | --- |
| UI 라이브러리 | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | 18 | 함수형 컴포넌트 + `useState` |
| 빌드 도구 | ![CRA](https://img.shields.io/badge/Create_React_App-09D3AC?style=flat-square&logo=createreactapp&logoColor=white) | react-scripts 5 | 개발 서버, 번들링, 테스트 실행 |
| 슬라이더 | ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) | 11 | 메인 비주얼 슬라이드 |
| 스타일 | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | - | 일반 CSS (Flexbox, Grid, 미디어 쿼리) |
| 테스트 | ![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testinglibrary&logoColor=white) | 16 | Jest + React Testing Library |

- 라우터·전역 상태 관리 라이브러리 없이, 컴포넌트마다 `useState`로 상태를 관리합니다.
- UI 프레임워크(MUI, Tailwind 등) 없이 CSS를 직접 작성했습니다.

<br />

## 📁 폴더 구조

```
CloneCoding
├── public
│   ├── index.html          # 앱이 붙는 HTML 템플릿 (#root)
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── index.js            # 진입점: App을 #root에 렌더링
│   ├── App.js              # 페이지 레이아웃 (Header → Hero → SearchBar → Footer)
│   ├── App.css             # 전역 리셋 + Header·Hero·SearchBar 스타일
│   ├── App.test.js         # 렌더링 테스트
│   ├── assets
│   │   └── main_logo.svg   # 헤더 로고 (임시 텍스트 로고)
│   ├── data
│   │   └── nav.js          # GNB 메뉴 데이터
│   └── components
│       ├── Header/Header.jsx
│       ├── Hero/Hero.jsx
│       ├── SearchBar/SearchBar.jsx
│       └── Footer/
│           ├── Footer.jsx
│           └── Footer.css  # 푸터 전용 스타일
└── package.json
```

<br />

## 🧩 컴포넌트 구성

```
App
├── Header      띠 배너 · 로고 · GNB 메뉴 · 상단 링크(로그인/회원가입/예약하기)
├── main
│   ├── Hero        메인 비주얼 슬라이더
│   └── SearchBar   객실 예약 검색 폼
└── Footer      고객센터 · 약관 링크 · 회사 정보 · 패밀리 사이트
```

| 컴포넌트 | 주요 내용 |
| --- | --- |
| **Header** | `data/nav.js`의 메뉴 배열을 `map()`으로 렌더링 |
| **Hero** | Swiper의 `Navigation` · `Pagination` · `Autoplay` · `A11y` 모듈 사용. 5초 자동 재생, 무한 루프. 슬라이드 `type`에 따라 `<img>` 또는 `<video>` 출력 |
| **SearchBar** | 체크인/체크아웃 날짜, 성인/어린이 인원을 `useState`로 관리하는 제어 컴포넌트. 제출 시 입력값을 알림창으로 표시 |
| **Footer** | `useState`로 패밀리 사이트 드롭다운 열기/닫기 (`aria-expanded` 적용). CSS Grid 2단 레이아웃, 1024px 이하에서 1단으로 전환 |

<br />

## 🚀 실행 방법

```bash
npm install     # 의존성 설치
npm start       # 개발 서버 실행 (http://localhost:3000)
npm run build   # 배포용 빌드 (build/ 폴더 생성)
npm test        # 테스트 실행
```

<br />

## 📝 참고

- 헤더 로고는 임시 텍스트 SVG입니다. 원본 로고는 `src/assets/main_logo.svg`를 교체하면 적용됩니다.
- 슬라이드 이미지·영상은 원본 사이트의 URL을 그대로 불러옵니다.
- 학습 목적의 클론 코딩이며, 모든 콘텐츠의 저작권은 파라다이스시티에 있습니다.
