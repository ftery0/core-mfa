# Dodam Design System (DDS)

> B1ND의 공식 디자인 시스템 - React 컴포넌트 라이브러리

**DodamDodamDesignSystem**의 약자로, 도담도담 웹 서비스의 디자인 통일성을 제공하고 UI 컴포넌트와 스타일시트 개발을 지원합니다.

[![npm version](https://img.shields.io/npm/v/dds-web-test.svg)](https://www.npmjs.com/package/dds-web-test)
[![license](https://img.shields.io/npm/l/dds-web-test.svg)](https://github.com/Team-B1ND/dds-web/blob/main/LICENSE)

## 📦 설치

```bash
npm install dds-web-test
# or
yarn add dds-web-test
# or
pnpm add dds-web-test
```

### Peer Dependencies

이 패키지는 다음 라이브러리가 필요합니다:

```bash
npm install react react-dom styled-components @tanstack/react-query
```

## 🚀 시작하기

### DodamProvider로 시작하기

**DodamProvider**는 DDS의 핵심 Provider로, **Theme 관리**와 **Portal 컨테이너** 기능을 하나로 제공합니다.

#### DodamProvider가 하는 일:
- ✅ **Theme 관리**: 라이트/다크 테마 자동 적용
- ✅ **Portal 컨테이너**: 모달/다이얼로그를 안전하고 안정적으로 렌더링

### 기본 사용법 (React)

```tsx
import { useState } from 'react';
import { DodamProvider, DodamFilledButton } from 'dds-web-test';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <DodamProvider theme={isDark ? "DARK" : "LIGHT"}>
      <DodamFilledButton onClick={() => setIsDark(!isDark)}>
        테마 전환
      </DodamFilledButton>
    </DodamProvider>
  );
}
```

### Next.js에서 사용하기

Next.js 13+ (App Router)에서 사용 시 추가 설정이 필요합니다:

```js
// next.config.js
module.exports = {
  compiler: {
    styledComponents: true,
  },
};
```

```tsx
// app/layout.tsx
'use client';

import { useState } from 'react';
import { DodamProvider } from 'dds-web-test';

export default function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <html>
      <body>
        <DodamProvider theme={isDark ? "DARK" : "LIGHT"}>
          {children}
        </DodamProvider>
      </body>
    </html>
  );
}
```

> **중요**: `DodamProvider`는 앱의 **최상위(root)**에 한 번만 배치하면 됩니다.
> 이것만으로 모든 컴포넌트에 테마가 적용되고, 모달/다이얼로그도 정상적으로 작동합니다.

## 🎨 주요 컴포넌트

### Buttons
- `DodamFilledButton` - 채워진 버튼
- `DodamContentButton` - 콘텐츠 버튼
- `DodamSegmentedButton` - 세그먼트 버튼
- `DodamToggleButton` - 토글 버튼

### Form
- `DodamTextField` - 텍스트 입력 필드
- `DodamFilledTextField` - 채워진 텍스트 필드
- `DodamCheckBox` - 체크박스
- `DodamDatePicker` - 날짜 선택기

### Typography
- `DodamHeading1`, `DodamHeading2` - 제목
- `DodamBody1`, `DodamBody2` - 본문
- `DodamCaption1`, `DodamCaption2` - 캡션
- `DodamTitle1`, `DodamTitle2` - 타이틀
- `DodamLabel` - 라벨

### Layout
- `DodamModal` - 모달
- `DodamDialog` - 다이얼로그
- `DodamNavBar` - 네비게이션 바
- `Flex` - Flex 레이아웃
- `Portal` - 포털

### Other
- `DodamBus` - 버스 좌석 선택
- `DodamPageIndicator` - 페이지 인디케이터
- `DodamNotFoundPage` - 404 페이지
- `DodamErrorBoundary` - 에러 바운더리

## 🎭 테마

### DodamProvider (권장)

**DodamProvider**는 Theme + Portal을 하나로 제공하는 통합 Provider입니다.

```tsx
import { DodamProvider } from 'dds-web-test';

function App() {
  return (
    <DodamProvider theme="LIGHT"> {/* or "DARK" */}
      <YourApp />
    </DodamProvider>
  );
}
```

#### 테마 전환

```tsx
import { useState } from 'react';
import { DodamProvider } from 'dds-web-test';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <DodamProvider theme={isDark ? "DARK" : "LIGHT"}>
      <button onClick={() => setIsDark(!isDark)}>테마 전환</button>
    </DodamProvider>
  );
}
```

---

### DodamThemeProvider (레거시)

테마만 필요한 경우 사용 가능합니다. (모달/다이얼로그 사용 시 Portal 에러 발생 가능)

```tsx
import { DodamThemeProvider } from 'dds-web-test';

function App() {
  return (
    <DodamThemeProvider theme="LIGHT"> {/* or "DARK" */}
      <YourApp />
    </DodamThemeProvider>
  );
}
```

---

### Portal 시스템

`DodamProvider`는 내부적으로 Portal 컨테이너를 생성하여 모달과 다이얼로그를 안전하게 렌더링합니다.

#### 모달 사용

```tsx
import { useState } from 'react';
import { DodamProvider, DodamModal } from 'dds-web-test';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DodamProvider theme="LIGHT">
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <DodamModal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div>모달 내용</div>
      </DodamModal>
    </DodamProvider>
  );
}
```

#### 다이얼로그 사용

```tsx
import { DodamProvider, DodamDialog } from 'dds-web-test';

function App() {
  const handleAlert = () => {
    DodamDialog.alert('알림 메시지');
  };

  const handleConfirm = async () => {
    const result = await DodamDialog.confirm('확인하시겠습니까?');
    console.log(result); // true or false
  };

  return (
    <DodamProvider theme="LIGHT">
      <button onClick={handleAlert}>알림</button>
      <button onClick={handleConfirm}>확인</button>
    </DodamProvider>
  );
}
```

### Storybook 다크 모드 사용법

배경을 변경하고 theme 버튼을 클릭하여 모드를 변경할 수 있습니다.

![스크린샷 2025-05-02 오전 10 58 40](https://github.com/user-attachments/assets/3cd7f57a-890a-4f2b-b7d0-49d058dbbf0c)

## 📖 문서

- **[DDS 공식 문서](https://dds.b1nd.com/)**
- **[Storybook](https://6790af6f8be4854ca7b49f7e-gfjyrtgjug.chromatic.com/?path=/docs/ui-dodambutton-dodamcontentbutton--docs)**

## 🏗️ 아키텍처

### Foundation
<img width="1570" alt="도담디자인시스템" src="https://github.com/user-attachments/assets/44e8e3e4-0364-4fa7-90d0-d4f03ecac669" />

### Component
<img width="1274" alt="도담도담 디자인시스템2" src="https://github.com/user-attachments/assets/f64b4ac7-5e48-49e5-ab2a-616dcca9b3a7" />

## 🔄 디자인 시스템 경량화 

### 🔴 문제점 (원인)

이 프로젝트는 원래 **모노레포 구조**로 설계되어 여러 개의 독립적인 패키지로 나누어 관리되었습니다.

#### 모노레포 구조의 문제점:
- ❌ **복잡한 설치 프로세스**: 사용자가 필요한 패키지를 하나씩 따로 다운로드해야 함
- ❌ **버전 관리 혼란**: 각 패키지의 버전이 독립적으로 관리되어 호환성 문제 발생
- ❌ **패키지 간 의존성 관리**: 패키지들 간의 복잡한 의존성 관계 처리 어려움
- ❌ **사용자 경험 저하**: 어떤 패키지를 설치해야 하는지 불명확함
- ❌ **단일 버전 동기화 불가**: 전체 라이브러리의 버전을 일관되게 유지하기 어려움
- ❌ **배포 및 관리의 복잡성**: 여러 패키지를 각각 빌드하고 배포해야 함
- ❌ **인수인계의 어려움**: 다음 기수에게 인수할 때 각 패키지를 문서로 설명하고 하나하나 관리해야 하는 복잡한 과정 필요

### 🟡 과정

**설계 중반에 이러한 문제점들을 인식했지만**, 이미 디자인 시스템이 거의 다 만들어진 상태였습니다. 완전히 다시 구조를 변경하기에는 시간이 너무 오래 걸릴 상황이었습니다.

따라서 **"일단 모든 패키지를 하나로 묶어서 배포하자"** 는 결정을 내리게 되었습니다.

#### 크기 변화 과정:

```
1️⃣ 모노레포 상태
   ↓ (여러 패키지를 하나로 묶음)

2️⃣ 단일 패키지로 변경
   📦 크기: ~76.5MB (거대한 번들)
   ❌ 모든 내용이 하나로 번들되어 매우 무거움

   ↓ (최적화 시작)

3️⃣ 1차 최적화 (34.5MB)
   ✅ 기본적인 구조 정리

   ↓ 

4️⃣ 최종 최적화 (702KB)
   ✅ 99.1% 크기 감소
```

### 🟢 결과 및 최적화 전략

**최종 목표를 달성하기 위해 적용한 세 가지 최적화 기법:**

#### 1️⃣ 벡터 SVG 변환 (99% 감소)
```
문제: 아이콘이 base64 인코딩된 PNG 이미지로 내장되어 있음

해결:
- School.tsx: 3.93MB (base64 PNG) → 40KB (진짜 벡터 SVG) - 99% ↓
- Schedule.tsx: 788KB (base64 PNG) → 32KB (진짜 벡터 SVG) - 96% ↓
- 전체 icons.js: 4.55MB → 128KB (97.2% ↓)
```

#### 2️⃣ 폰트 파일 CDN 분리
```
문제: Pretendard 폰트가 번들에 포함되어 있음

해결:
- 폰트를 jsDelivr CDN에서 동적으로 로드
- 사용자만 폰트를 다운로드 (필요시)
- 번들 크기에서 폰트 데이터 제거
```

#### 3️⃣ 코드 분할 (Code Splitting)
```
문제: 아이콘을 사용하지 않는 사용자도 아이콘 코드를 로드함

해결:
구조 변경:
├── dds-web-test           → 메인 번들 (컴포넌트, 훅, 스타일 등)
└── dds-web-test/icons     → 아이콘 번들 (선택적 import)
```

### 📊 개선 현황

| 항목 | 변경 전 | 변경 후 | 감소율 |
|------|---------|---------|--------|
| **npm 패키지** | 76.5MB | **702KB** | **99.1% ↓** |
| **icons.js** | 4.55MB | **128KB** | **97.2% ↓** |
| **설치 속도** | 매우 느림 | **빠름** | ⚡ |

### 📦 현재 구조

```
npm package: 702KB
├── index.js (ESM)        : 125KB  (컴포넌트, 훅, 스타일)
├── index.cjs (CJS)       : 129KB
├── icons.js (ESM)        : 128KB  (모든 아이콘)
├── icons.cjs (CJS)       : 140KB
└── types/                : 타입 정의
```

### 💡 사용 방법

```tsx
// 메인 기능만 사용 (125KB)
import { DodamFilledButton } from 'dds-web-test';

// 아이콘 추가 필요시 (추가 128KB)
import { Bell, School } from 'dds-web-test/icons';
```

### ✨ 최종 성과

- ✅ npm 설치 속도 대폭 향상 (76.5MB → 702KB)
- ✅ 선택적 import로 불필요한 코드 로드 방지
- ✅ 모든 기능 및 아이콘 정상 작동
- ✅ Breaking change 없음 (기존 사용 방식 그대로 지원)
- ✅ 원래의 모노레포 문제 완전히 해결

## 🛠️ 기술 스택

- **React** 18/19
- **TypeScript** 5.x
- **styled-components** 6.x
- **tsup** - 빌드 도구
- **Storybook** - 컴포넌트 문서화

## 📄 라이선스

MIT © Team B1ND

## 🤝 기여하기

기여는 언제나 환영합니다! [GitHub Repository](https://github.com/Team-B1ND/dds-web)에서 이슈를 등록하거나 PR을 보내주세요.

## 📞 문의

- **GitHub**: [Team-B1ND](https://github.com/Team-B1ND)
- **Website**: [dds.b1nd.com](https://dds.b1nd.com/)
