---
title: "크롬 브라우저에서 드래그시 border-radius가 적용되지 않는 문제"
description: "크롬 고스트 이미지 이슈"
series: ""
tags:
  - CSS
  - FE
publishedAt: "2023-12-24"
updatedAt: "2023-12-24"
isPublished: true
---

# 크롬 브라우저에서 드래그시 border-radius가 적용되지 않는 문제

## 문제

[드래그 앤 드롭](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)을 이용한 컴포넌트를 만들던 중, 드래그 중인 이미지의 모서리가 둥글게 잘리지 않는 현상을 발견했다.

ghost image에 `border-radius`가 적용이 안되는 것인데 이 문제는 크롬 브라우저에서만 나타났다.

깔끔한 UI를 위한 해결 방법 두 가지를 알아보자

> Mac OS 크롬
> <img alt="크롬" src="/2023/fixing-border-radius-drag-issue-in-chrome/01.png" width="50%" />

> Mac OS 파이어폭스
> <img alt="파이어폭스" src="/2023/fixing-border-radius-drag-issue-in-chrome/02.png" width="50%" />

## 해결

### 1. opacity 사용

첫 번째 해결 방법은 드래그 중인 요소에 opacity 속성을 적용하는 것이다.

opacity 값을 0.99로 설정하면 시각적으로 큰 차이 없이 문제를 해결할 수 있다.

```css
.dragging {
  opacity: 0.99;
}
```

### 2. transform 사용하기

두 번째는 `transform` 속성을 사용하는 것이다.
다음과 같이 요소의 위치와 레이어를 변화시키지 않고 해결할 수 있다.

```css
.dragging {
  transform: translateZ(0);
  /* 또는 */
  transform: translate(0, 0);
}
```

이 두 가지 방법을 통해 크롬 브라우저에서 발생하는 드래그 앤 드롭 시의 모서리가 잘리지 않는 문제를 해결할 수 있다.
