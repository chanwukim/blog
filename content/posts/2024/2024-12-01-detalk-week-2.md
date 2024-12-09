---
title: "Detalk 개발 일지 - 2주차"
category: "detalk"
tags:
  - detalk
publishedAt: "2024-12-01"
isPublished: false
---

> 11/28 ~ 11/30
>
> 감기로 2주째 작업량 감소 🤧

# 📌 이번 주 진행 사항

## 1. 주요 작업 내용
1. ERD 설계
2. API 작업
    - 회원가입, 이메일 인증, 로그인, 로그아웃
    - 파일 Pre-signed URL 발급
    - 글 등록

## 2. 상세 진행 상황
### 2.1 구현 세부사항

<img width="80%" src="/2024-12-01-detalk-week-2/erd.png" alt="ERD"  />

- **ERD**
    - [prisma-markdown](https://github.com/samchon/prisma-markdown)으로 문서화를 간소화했다. `문서 작성 -> 스키마 작성/수정` 순서에서 `스키마 작성/수정 -> 문서 자동화`로 전환되어 생산성이 높아졌다. 삼촌 그는 신인가?
    - 스냅샷 기반 설계를 도입 해봤다. row 이력을 남김으로써 커뮤니티에서 문제 발생 시 추적 할 수 있고, 이후 A/B 테스트에도 활용할 수 있다.

- **Service**

서비스 코드는 객체 리터럴 방식을 사용했다. DI/IoC 컨테이너 외부 라이브러리 추가를 피하고 싶었고, 빠른 MVP 개발을 위해서다.
```ts
import "server-only";

import db from "@/lib/db";
import mailSender from "@/lib/mail-sender";

const memberService = {
  mailSender,
  async signUp({ email, password, userhandle }: SignUpSchema) {
    return db.$transaction(async (tx) => {
      // ...

      await this.mailSender.sendMail({ from: '"Detalk" <noreply@detalk.net>', to: email, subject: "", body: "" });

      return {
        id: verificationCode.id,
      };
    });
  },
};

export default memberService;
```

테스트 코드에서 외부 라이브러리 mocking 없이 의존성을 교체할 수 있다.

```ts
it("이메일 발송에 실패하면 에러가 발생해야 한다", async () => {
  // given
  memberService.mailSender = {
    async sendMail() {
      throw new Error("메일 발송 실패");
    },
  };

  const input: SignUpSchema = {
    email: "test@example.com",
    password: "password",
    userhandle: `${TEST_PREFIX}userhandle`,
  };

  // when & then
  await expect(memberService.signUp(input)).rejects.toThrow(new Error("메일 발송 실패"));
});
```

- **Cloudflare R2**

Next.js의 Image 컴포넌트는 이미지 최적화를 간편하게 제공해주지만 [무료가 아니다.](https://vercel.com/docs/image-optimization/limits-and-pricing)
대안으로 비용을 고려하면서 CDN을 구축해주는 Cloudflare를 선택했다.
Cloudflare R2는 데이터 전송 비용이 무료이고, 프리티어에서도 10GB의 스토리지를 제공해준다. Workers랑 같이 사용하면 이미지 최적화와 전송 처리를 간단하게 할 수 있다.


참고 - [Building a free image CDN with Cloudflare R2 and workers](https://transloadit.com/devtips/creating-a-free-image-cdn-with-cloudflare-r2/)

유용하게 쓰일 것 같아 메모로 글을 남겨야겠다.


## 3. 다음 주 계획
- 본격적인 프론트엔드 작업 시작
  - 가입, 로그인
  - 글 작성


