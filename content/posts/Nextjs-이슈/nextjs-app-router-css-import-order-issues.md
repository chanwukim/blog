---
title: "Next.js App Router 중복 import, 순서 문제"
summary: "최고다 Next 14.x"
tags: ["frontend", "Next.js"]
publishedAt: "2024-07-19"
isPublished: true
---

## 문제 상황

Next.js 14.x 버전 app router에서 css가 중복되어 빌드 되거나, 순서가 잘못되어 스타일이 깨지는 문제가 발생했다.

관련 이슈 모두 open된 상태인데, 코멘트보니 15 버전 작업으로 바쁜 듯 🙄

- [Css is imported multiple times and out of order in /app dir](https://github.com/vercel/next.js/issues/51030)
- [Inconsistent CSS resolution order](https://github.com/vercel/next.js/issues/64921)

내 경험으로는 [module.css](https://github.com/css-modules/css-modules), [vanilla-extract](https://vanilla-extract.style/), [pigment-css](https://github.com/mui/pigment-css)에서 라이브러리나 프레임워크 환경에 상관 없이 나타났다.

<img alt="duplicate styles" src="/nextjs-app-router-css-import-order-issues/01.png"  />
<p style='text-align: center;'>reset style이 두 번 빌드되어 나타나더니,</p>
<img alt="broken styles" src="/nextjs-app-router-css-import-order-issues/02.png"  />
<p style='text-align: center;'>결과적으로 컴포넌트에 reset style이 덮어씌워져 스타일이 깨져버린다.</p>

## 해결 방법

webpack 수정 없이 심플하게 해결해보자

### 1. @layer

CSS [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)를 사용해서 중복이 나더라도 적용 순서를 정할 수 있다.

```css
@layer reset, base, componetns, util;
```

이 방법의 한계는

- 여전히 스타일이 중복되어 빌드된다.
- 라이브러리, 프레임워크가 `@layer`를 지원하지 않을 떄다.
  pigment-css도 아직 `@layer`는 [요청 단계](https://github.com/mui/pigment-css/issues?q=is%3Aissue+is%3Aopen+layer)였다.

### 2. global, reset 스타일을 Root Layout으로 옮기기

전역 레벨의 스타일을 root `layout.tsx`로 옮기는 방법이다.

내 경우 `theme-provider`에서 전역 스타일을 적용하고, `app/layout`에서 이를 import하는 구조였다.

```bash
├── app
│   └── layout.tsx # import { ThemeProvider } from "@/shared/theme/theme-provider";
└── shared
    └── theme
        ├── global.ts
        └── theme-provider.tsx # import ",/global";
```

이를 다음과 같이 전역 레벨 스타일을 layout에서 직접 import로 변경했다:

```bash
├── app
│   └── layout.tsx # import "@/shared/theme/global";
└── shared
    └── theme
        ├── global.ts
        └── theme-provider.tsx
```

이렇게 구조를 변경함으로써 전역 스타일이 한 번만 적용되고, 순서 문제도 해결할 수 있다.

<img alt="resolve" src="/nextjs-app-router-css-import-order-issues/03.png"  />

오늘도 무사히 스타일을 입힐 수 있게되었다.
