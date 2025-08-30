---
title: "TypeScript에서 enum 대신 const 사용하기"
description: ""
series: ""
tags:
  - TypeScript
publishedAt: "2024-09-18"
updatedAt: "2024-09-18"
isPublished: true
---

# TypeScript에서 enum 대신 const 사용하기

> TypeScript 버전 5.5.4

## enum

```ts
export enum Theme {
  Light,
  Dark,
}
```

트랜스파일 결과:

```js
"use strict";

// src/enum.ts
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2[(Theme2["Light"] = 0)] = "Light";
  Theme2[(Theme2["Dark"] = 1)] = "Dark";
  return Theme2;
})(Theme || {});
```

- IIFE(즉시 실행 함수)로 변환됨
- TSC는 IIFE를 사용하는지 사용하지 않는 코드인지 알 수 없어 자바스크립트 번들에 항상 포함(tree-shaking 어려움)

## const

```ts
export const Theme = {
  Light: "light",
  Dark: "dark",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];
```

트랜스파일 결과:

```js
"use strict";

// src/enum.ts
var Theme = {
  Light: "light",
  Dark: "dark",
};
```

- 단순 객체로 변환
- 필요 시에만 번들에 포함 (tree-shaking 가능)

```ts
// 사용 예
function setTheme(theme: Theme) {}

setTheme(Theme.Dark);
```

## 참고

- [LINE Engineering 블로그 - TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking)
- [TypeScript Handbook: Objects vs Enums](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)
