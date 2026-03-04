<p align="center">
  <img src="./apps/dodam-one-web/assets/dodam_logo.svg" width="20%" alt="dodam" />
</p>
<h3 align="center">도담도담 Micro Frontend (MFA)</h3>
<p align="center">대구소프트웨어마이스터고 스마트스쿨 플랫폼 — Module Federation 모노레포</p>

---

## [도담도담](https://dodam.b1nd.com/) 이란?

도담도담은 모든 학생과 모든 선생님에게 사고없이 편리함을 제공해줄 수 있는 스마트스쿨 플랫폼으로, 교내 전교생과 모든 선생님들이 사용하고 있어요.

> 아쉽지만 해당 서비스는 대소고 학생들만 사용할 수 있어요 🥲

## 이게 뭔가요?

도담도담의 프론트는 여러 서비스들을 **각각 독립적인 앱으로 개발·배포**하면서도, 사용자 눈에는 **하나의 서비스처럼** 보이게 만드는 Micro Frontend Architecture.

도담도담 서비스는 기능별로 여러 팀이 각자의 앱을 관리해요.
그러다 보니 앱마다 **사이드바가 따로 놀고, 로그인도 각각 따로** 해야 하는 문제가 있었어요.

이 레포의 `core`가 **Shell(껍데기)** 역할을 하면서 모든 서비스를 하나로 묶어줘요.
→ 로그인 한 번으로 모든 서비스 이용, 어느 페이지에서든 동일한 사이드바 제공

---

## 구조 한눈에 보기

```
브라우저 접속
     │
     ▼
┌─────────────────────────────┐
│         core (port 3001)    │  ← HOST (Shell)
│  - 로그인 페이지 (/sign)      │
│  - 공통 사이드바 (DodamNavBar)│
│  - 라우팅 관리               │
└──────────┬──────────────────┘
           │ Module Federation (원격 로드)
     ┌─────┴──────┐
     │             │
     ▼             ▼
dodam-one-web   nightstudy-web
 (port 3000)     (port 3002)
 메인 페이지      심자신청 페이지
```

| URL | 보여지는 화면 |
|-----|-------------|
| `localhost:3001/sign` | 로그인 / 회원가입 (core 소유) |
| `localhost:3001/` | 도담 메인 페이지 (dodam-one-web) |
| `localhost:3001/nightstudy` | 심자신청 페이지 (nightstudy-web) |

---

## 앱 소개

### `apps/core` — Shell (호스트)
> 전체를 하나로 묶는 껍데기 역할

- **로그인/회원가입** 페이지를 직접 소유
- 페이지 상단의 **DodamNavBar**(사이드바)를 공통으로 제공
- 각 서비스 앱을 **원격으로 불러와서** 화면에 끼워넣음 (현재 2개, 앞으로 계속 추가 예정)
- 포트: **3001**

### `apps/dodam-one-web` — Remote 1
> 도담도담 메인 기능 앱

- 외출·외박·버스 신청, 급식 조회, 기상송, 일정, 상벌점 등
- core에서 `/*` 경로로 접속하면 이 앱이 렌더링됨
- 포트: **3000**

### `apps/dodamdodam-nightstudy-web` — Remote 2
> 심야자율학습(심자) 신청 앱

- 심자 신청 / 관리자 승인 기능
- core에서 `/nightstudy/*` 경로로 접속하면 이 앱이 렌더링됨
- 포트: **3002**

### `packages/dds` — 공유 디자인 시스템
> 모든 서비스 앱이 함께 쓰는 UI 컴포넌트 라이브러리

- 버튼, 텍스트필드, 모달, 네비게이션 바, 테마 등
- `@mfa/dds`으로 import해서 사용

---

## Module Federation 이란?

> 쉽게 말하면: **앱 A가 실행 중에 앱 B의 코드를 네트워크로 가져와서 화면에 붙이는 기술**이에요.

```
core가 브라우저에서 실행됨
  └─ /nightstudy 접속 시
       └─ http://localhost:3002/remoteEntry.js 파일을 가져옴
            └─ nightstudy-web의 App 컴포넌트를 화면에 렌더링
```

각 앱은 독립적으로 배포/실행되지만, core가 이들을 하나의 화면으로 합쳐줘요.
이 방식을 **Micro Frontend Architecture (MFA)** 라고 해요.

---

## 시작하기

### 사전 준비

```bash
# pnpm이 없다면 설치
npm install -g pnpm

# 의존성 설치 (루트에서 한 번만)
pnpm install
```


### 로컬 개발 실행

터미널 3개를 열어서 각각 실행해요.

```bash
# 터미널 1 — nightstudy-web (port 3002, 먼저 실행 권장)
pnpm --filter dodamdodam-nightstudy dev

# 터미널 2 — dodam-one-web (port 3000)
pnpm --filter dodamdodam_one dev

# 터미널 3 — core shell (port 3001)
pnpm --filter @mfa/core dev
```

이후 브라우저에서 `http://localhost:3001` 로 접속하면 돼요.

---

## 디렉토리 구조

```
core-mfa/
├── apps/
│   ├── core/                      # Shell (MF 호스트)
│   │   └── src/
│   │       ├── components/
│   │       │   ├── Layout/        # DodamNavBar 레이아웃
│   │       │   └── Auth/          # 로그인/회원가입 컴포넌트
│   │       ├── pages/Auth/        # 로그인 페이지
│   │       ├── remotes/           # Remote 앱 래퍼
│   │       │   ├── DodamOneApp.tsx
│   │       │   └── NightstudyApp.tsx
│   │       └── components/Router/ # 라우팅 (/sign, /nightstudy/*, /*)
│   │
│   ├── dodam-one-web/             # Remote 1 — 메인 페이지
│   └── dodamdodam-nightstudy-web/ # Remote 2 — 심자신청 페이지
│
├── packages/
│   └── dds/                   # 공유 UI 컴포넌트 (@mfa/dds)
│
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 모노레포 | pnpm workspaces + Turborepo |
| MFA | `@module-federation/vite` (core, dodam-one-web), Webpack MF (nightstudy-web) |
| 프레임워크 | React 19 (core, dodam-one-web) / React 18 (nightstudy-web) |
| 빌드 도구 | Vite (core, dodam-one-web) / CRA + Craco (nightstudy-web) |
| 상태관리 | Zustand (core, dodam-one-web) / Recoil (nightstudy-web) |
| 데이터 패칭 | TanStack Query v5 (core, dodam-one-web) / React Query v3 (nightstudy-web) |
| 스타일링 | styled-components v6 |
| 언어 | TypeScript |
