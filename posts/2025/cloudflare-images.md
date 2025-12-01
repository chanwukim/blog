---
title: "Cloudflare Images 초기 설정 메모"
description: ""
series: "Cloudflare"
tags:
  - Cloudflare
  - 메모
publishedAt: "2025-01-26"
updatedAt: "2025-12-02"
isPublished: true
---

# Cloudflare Images 초기 설정 메모

## Cloudflare Images를 사용한 이유

이미지 스토리지를 만들 때 다음 문제를 해결해야 한다.

- 안전한 이미지 업로드
- 이미지 최적화 및 변환
- 빠른 이미지 전송을 위한 CDN 설정
- 비용 등

Cloudflare의 R2 버킷, Workers로 구현시 다음과 같은 문제가 있었다.

1. 복잡한 구성: R2 버킷, Workers의 복잡한 설정 작업과 둘을 이어주는 작업이 어려움.
2. 성능 이슈: R2 리전이 한국에 없는지 이미지 처리 성능이 느림. 이게 크리티컬 했다.

이번에 `Cloudflare Images`를 사용해보면서 어려움을 해결할 수 있었다.

## Cloudflare Images

Cloudflare Images는 단일 API를 통해 이미지 인프라를 간소화하는 데 도움이 되는 종단 간 솔루션이라고 하며 실제로 사용해보니 간단했다.

Cloudflare Images는 R2 + Workers보다는 비용이 드는 편인데, 그래도 Cloudflare 비용 정책은 저렴하다.

무료 플랜의 경우 월 최대 5,000개의 `변환` 기능을 무료로 요청할 수 있고, 초과 될 경우 오류를 반환한다고 한다.
자세한건 [문서](https://developers.cloudflare.com/images/pricing)를 참고한다.

월 $5 플랜을 사용으로 맘편하게 시작했다.

## 주요 기능 구현

### 1. 업로드

**Accept user-uploaded images**

Images는 [다양한 업로드 방법을 제공한다.](https://developers.cloudflare.com/images/upload-images)

`Accept user-uploaded images` 방법은

- 사용자에게 API 키나 토큰을 노출하지 않고
- 일회용 업로드 URL로 이미지를 업로드
- 클라이언트가 직접 업로드로 API 서버 부하 감소

여러 스토리지 서비스의 pre signed url 발급과 유사하다.

1. 서버에서 URL 발급

```bash
curl --request POST \
https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v2/direct_upload \
--header "Authorization: Bearer <API_TOKEN>" \
--form 'requireSignedURLs=true' \
--form 'metadata={"key":"value"}'
```

- `account_id`는 Images 대시보드에서 확인할 수 있다.
  ![account_id](/2025/cloudflare-images/01.png)

- `API_TOKEN`은 `대시보드` - `계정 관리` - `계정 API 토큰`에서 발급한다. 토큰 생성 클릭후 `Cloudflare Stream 및 Images 읽기 및 쓰기` 템플릿을 사용하여 어려움 없이 토큰을 발급할 수 있다.
  ![API_TOKEN](/2025/cloudflare-images/02.png)

2. 클라이언트에서 발급받은 URl로 이미지 업로드

위 정보를 이용하여 요청을 보내면 다음과 같은 응답 정보가 온다.

```js
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
    "uploadURL": "https://upload.imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901"
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

![response](/2025/cloudflare-images/03.png)

클라이언트는 `uploadURL`을 이용하여 이미지를 업로드 할 수 있다.
실제로 잘 동작하는지 Postman 같은 API Client를 이용하여 확인해볼 수 있다.

![postman](/2025/cloudflare-images/04.png)
`Images` 대시보드에서도 업로드 된 이미지를 확인할 수 있다.

![dashboard](/2025/cloudflare-images/05.png)

### 2. 이미지 접근 설정

**접근 설정이 필요한 이유**

위의 대시보드 이미지에 `test.png` 파일명을 보면 자물쇠 아이콘이 있다.

기본적으로 모든 이미지는 비공개라서,
[기본으로 제공되는 변형(`variants`)인 `public`](https://developers.cloudflare.com/images/manage-images/create-variants/)을 항상 접근할 수 있게 수정해줘야 한다.

**설정 방법**

1. 대시보드 - `Images`
2. 변환 > `public` 편집
3. `Always allow public access` 체크후 저장

![public](/2025/cloudflare-images/06.png)

![public](/2025/cloudflare-images/07.png)

### 3. 커스텀 도메인 연동

`https://imagedelivery.net/계정-해시/이미지-id/public`로 접근할 수 있는 이미지를 [커스텀 도메인](https://developers.cloudflare.com/images/manage-images/serve-images/serve-from-custom-domains/)으로 바꿔 내 서비스 이미지를 향상 시킨다.

`https://cdn.mydomain.com/images/이미지-id/public` 형태로 접근할 수 있도록 설정해보자.

**설정 방법**

1.  DNS 설정 `대시보드` - `1. 웹 사이트` - `2. 도메인 추가`후, 추가된 도메인에 클릭한다. 도메인 추가 과정은 생략한다.
    ![domain](/2025/cloudflare-images/08.png)
2.  `DNS - 레코드` 탭 접근후 `레코드 추가` 버튼을 누른다.
    ![domain](/2025/cloudflare-images/09.png)
3.  유형은 `CNAME`, 이름은 `cdn`, 대상은 도메인으로 입력한다. 즉, `mydomain.com`이라면 대상에 `mydomain.com`을 그대로 입력한다.
    ![domain](/2025/cloudflare-images/10.png)

4.  URL 재작성 규칙 설정 1. 도메인 대시보드에서 `규칙` - `개요` 탭 접근 후 `URL 다시 쓰기 규칙` 옆의 `규칙 생성` 버튼을 누른다.
    ![rule](/2025/cloudflare-images/11.png)

5.  규칙 이름은 적당히 입력하고

- 와일드카드 패턴 `*` 선택
- 요청 URL `https://cdn.mydomain.com/images/*`
- 대상 경로 `images/*`
- 다시 쓰기 대상 `https://imagedelivery.net/계정-해시/${1}`
- 위 정보를 입력하고 `배포` 버튼을 누른다.
  ![rule](/2025/cloudflare-images/12.png)

## 최종 사용

모든 설정이 끝났다면, 이미지 업로드후 다음 형태로 접근할 수 있다.

```bash
# 이미지 접근 URL 형식
https://cdn.mydomain.com/images/[이미지-id]/public
```

## 참고

- https://developers.cloudflare.com/images
- https://developers.cloudflare.com/images/upload-images/direct-creator-upload/
- https://developers.cloudflare.com/images/manage-images/serve-images/serve-from-custom-domains/
