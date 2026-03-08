---
title: "테일윈드 인텔리센스 안 될 때"
series: ""
description: ""
tags:
  - FE
  - 메모
  - CSS
publishedAt: "2026-03-09"
updatedAt: "2026-03-09"
isPublished: true
---

Tailwind 4는 tailwind.config.js 없이 CSS 파일만 쓰기 때문에, VS Code 확장이 설정을 못 찾을 수 있다. 특히 모노레포면 더.

`.vscode/settings.json`에 아래 내용을 넣는다.

```json
"tailwindCSS.experimental.configFile": "여기에_CSS_파일경로_넣기"
```

Tailwind를 불러오는(`@import "tailwindcss"`) CSS 파일 경로를 넣는다.
