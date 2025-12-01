---
title: "Cloudflare DNS, Vercel 배포된 앱 연결하기"
description: ""
series: "Cloudflare"
tags:
  - Vercel
  - Cloudflare
  - 메모
publishedAt: "2025-02-04"
updatedAt: "2025-02-04"
isPublished: true
---

# Cloudflare DNS, Vercel 배포된 앱 연결하기

1. Cloudflare 대시보드에서 도메인을 구매 또는 타서비스에서 구매한 도메인을 등록한다.
2. Cloudflare 대시보드에서 DNS 레코드를 다음과 같이 설정한다.

### A 레코드 추가

| 타입 | 이름 |           콘텐츠            | Proxy status |
| :--: | :--: | :-------------------------: | :----------: |
|  A   |  @   | Vercel에서 제공하는 IP 주소 |      X       |

콘텐츠에 들어갈 IP 주소는 Vercel에서 도메인 등록할 때 확인할 수 있다.

### CNAME 레코드 추가

| 타입  | 이름 |         콘텐츠         | Proxy status |
| :---: | :--: | :--------------------: | :----------: |
| CNAME | www  | `cname.vercel-dns.com` |      X       |

`www.domain.com` 서브도메인을 Vercel로 연결되도록 설정한다.

## Vercel 설정

Vercel 대시보드에 구매한 도메인을 등록한다. 잘못된 설정 오류와 함께 관련 정보가 다음과 같이 나타난다.
![Vercel 도메인 등록](/2025/cloudflare-dns-vercel-setup/01.png)
여기서 `value`를 참고하여 [A 레코드 추가](#a-레코드-추가)에서 콘텐츠에 들어갈 IP 주소를 입력한다. 이제 도메인을 통해 Vercel로 접속할 수 있다.

## 리디렉션 문제가 발생할 경우

설정을 마치고 도메인에 접속했는데 무한 리디렉션 문제가 발생할 수 있다. 이 문제는 Cloudflare가 Vercel로 요청을 보낼 때 HTTPS가 아닌 HTTP를 사용하고, Vercel이 이를 다시 HTTPS로 리디렉션하는 과정에서 발생한다. 이로 인해 무한 리디렉션이 발생한다.

> 관련 문서의 내용:
>
> 1. Cloudflare는 https://domain.com을 제공하고 Vercel의 http://domain.com에 요청을 보냅니다.
> 2. Vercel은 http://domain.com에 대한 보호되지 않은 요청을 식별하고 https://domain.com으로 리디렉션하는 308 상태 코드를 보냅니다.
> 3. Cloudflare는 리디렉션을 사용자에게 전달합니다. 하지만 클라이언트는 이미 https://domain.com에 있기 때문에 같은 위치로 다시 리디렉션을 발생시켜 루프가 생깁니다.

### 문제 해결 방법

https 연결을 위해 Cloudflare 도메인 대시보드에서 SSL/TLS 설정을 전체(Full)로 변경해야한다.

1. Cloudflare 도메인 대시보드에서 `SSL/TLS` 탭으로 이동한다.
2. SSL/TLS 암호화의 "설정"을 누른다.
   ![Cloudflare SSL/TLS 설정 진입](/2025/cloudflare-dns-vercel-setup/02.png)
3. "사용자 지정 SSL/TLS"의 "전체"로 변경한다.
   ![Cloudflare SSL/TLS 설정](/2025/cloudflare-dns-vercel-setup/03.png)
4. 설정을 저장하고, 리디렉션 문제가 해결되었는지 확인한다.

## 참고

- [Add Cloudflare custom domain to Vercel - github/nivethan-me ](https://gist.github.com/nivethan-me/a56f18b3ffbad04bf5f35085972ceb4d)
- [How do I resolve "err_too_many_redirects" when using a Cloudflare proxy with Vercel? - Vercel](https://vercel.com/guides/resolve-err-too-many-redirects-when-using-cloudflare-proxy-with-vercel#how-do-i-resolve-err_too_many_redirects-when-using-a-cloudflare-proxy-with-vercel)
