---
title: "Detalk 개발 일지 - 1주차"
category: "detalk"
tags:
  - detalk
publishedAt: "2024-11-18"
isPublished: true
---

> 11/18 ~ 11/20
> 
> 감기로 월화수만 작업

# 📌 이번 주 진행 사항

## 1. 주요 작업 내용
1. 기획
<img width="80%" alt="기획 사진" src="/2024-11-18-initial-service-design/01.png"/>

   - 노션으로 기획 작성 👉 Figma로 필수기능만 와이어프레임 작업
   - 아 디자이너 뽑고 싶다.

2. 프로젝트 세팅

## 2. 상세 진행 상황
### 2.1 기술적 결정

- **Next.js 풀스택**
    - 👍 풀스택으로 생산성 향상
    - 👍 Vercel 배포로 초기 인프라 비용 절감
    - 👎 route handler, TS DB 라이브러리 구조상 서비스 테스트 코드 작성이 아쉬움.
    - 🧑🏻‍💻 추후 트래픽/비즈니스 로직이 복잡해지면 Spring Boot로 API 서버 고려

> https://x.com/rexan_wong/status/1855760594403799132
> 
> POV: ur on ur way to school and see ur @vercel monthly bill…
> $200 😱😱🤯🤯
> 
> 결국 그는 유료 요금제를 도입했다.

- **Tailwind CSS + Radix UI**
    - 👍 Tailwind CSS : 빠른 개발. 클래스명 작명 고민 제거, 컴포넌트와 스타일 파일간 컨텍스트 스위칭 비용 X
    - 👎 Tailwind CSS : 긴 클래스 명으로 유지보수에 우려. MVP 단계이므로 크게 고려하지 않음
    - 🧑🏻‍💻 후에 Pigment css가 안정화되면 변경해볼 예정. React를 Vue의 SFC 처럼 쓸 수 있음
    - 👍 Radix UI : 웹 접근성 & 기능 구현 시간 단축. shardcn 예시가 잘되어있어 참고

- **TanStack Query**
    - Promise 데이터의 캐시 관리, 페이지네이션, Prefetching, 중복 요청 제거 등 좋은 기능이 많음
    - 아직 서버 컴포넌트에 대한 이해 부족은 덤.

- **Prisma**
    - DB 접근은 prisma로 선택
    - 👍 스키마 관리 편의성 : 단, 마이그레이션 코드는 수정이 필요할 때도 있음.
      - 예: PostgreSQL에서 `GENERATED ALWAYS AS IDENTITY` 대신  `SERIAL`을 사용함.
      - 이슈보니 바빠서 대응을 못하는 중 [Use IDENTITY columns in PG10+ ](https://github.com/prisma/prisma/issues/4693)
    - 👍 DB 레벨 JOIN 지원 [Prisma ORM Now Lets You Choose the Best Join Strategy (Preview)](https://www.prisma.io/blog/prisma-orm-now-lets-you-choose-the-best-join-strategy-preview)
    - 👎 TS 진영의 DB 라이브러리 생태계 미성숙 (트랜잭션 처리)
    - 🧑🏻‍💻 쿼리빌더 kysely + 스키마 관리 prisma 조합을 사용하려다 복잡성만 높이는 것 같아 제외


### 2.2 구현 세부사항
- **테일윈드 설정**
```ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  // ...
  theme: {
    extend: {
      // 반응형은 태블릿, PC만 쓸 예정이고
      // 직관적인 단위 `tablet`, `pc`를 추가
      screens: {
        tablet: "768px",
        pc: "1280px",
        ...defaultTheme.screens,
      },
      // `spacing` 토큰을 4px 단위로 쓰는데,
      // 이게 큰 값으로 넘어가면 개발하면서 계산을 해야해서 직관적이게 커스텀
      spacing: {
        "0": "0",
        "1": "1px",
        "2": "0.125rem",
        "3": "0.1875rem",
        "4": "0.25rem",
        "5": "0.3125rem",
        "6": "0.375rem",
        "7": "0.4375rem",
        "8": "0.5rem",
        "9": "0.5625rem",
        "10": "0.625rem",
        "11": "0.6875rem",
        "12": "0.75rem",
        // ...
        "288": "18rem",
        "320": "20rem",
        "384": "24rem",
      }
      // 그 외 color, border-radius 같은 테마를 담당하는 변수명은
      // shardcn을 따라했으나 내 스타일에 맞게 조정함.
      // 예를들어 shardcn primary 위의 전경색 `primary-foreground`는 
      // `foreground-on-primary` 이런식으로..
    }
  }
}
```
- 예시:
```html
<div className="mt-384">
  384px
</div>
```

### 2.3 마주친 문제점

## 3. 다음 주 계획
감기로 인해 못한 작업을 진행하기
## 4. 요약
- 기획 
- 빠른 MVP 개발을 위해 최대한 직관적인 형태로 세팅

## 5. 참고 자료


