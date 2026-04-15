---
title: "우분투 카카오톡 설치하기"
description: "Ubuntu에서 Wine으로 카카오톡을 설치하기"
series: ""
tags:
  - 메모
publishedAt: "2026-04-15"
updatedAt: "2026-04-15"
isPublished: true
---

# 우분투 카카오톡 설치하기

## Wine 설치
1. 32비트(i386) 활성화

64비트 리눅스에서 32비트 Windows 앱 지원을 위해 i386 아키텍처 추가

```bash
sudo dpkg --add-architecture i386
```

2. WineHQ 키(인증서) 등록

> - 저장소가 “진짜 WineHQ에서 온 것인지” 확인하려고 GPG 키를 등록
> - apt를 사용하여 (업데이트/설치) 시 저장소의 서명을 확인해서 "신뢰성 있는 곳"인지 확인하는데, WineHQ가 제공하는 서명 키(GPG 키)를 등록해두면 apt가 다운로드 할 때  위조/변조된 파일이 아닌지 자동으로 체크

WineHQ GPG 키 저장을 위한 폴더 생성 (권한 755)

```bash
sudo mkdir -pm755 /etc/apt/keyrings
```

WineHQ 공식 GPG 키 다운로드 (패키지 인증서)

```bash
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key  
```
3. Ubuntu 24.04(noble) 저장소 추가
> Ubuntu 코덱명 확인 명령어 `lsb_release -sc`

```bash
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/noble/winehq-noble.sources
```
4. Wine 설치

```bash
sudo apt update
sudo apt install --install-recommends winehq-stable
```

```
wine --version
```

## 카카오톡 설치
1.  Windows 32bit로 다운로드
https://kakaotalk.download.beer
2. 다운로드 경로에서 wine으로 설치파일 실행
```bash
LANG="ko_KR.UTF-8" wine KakaoTalk_Setup.exe
```

## 한글 폰트 깨짐

```bash
sudo apt install fonts-nanum*
```

그래도 깨질경우

```
sudo apt install winetricks
winetricks cjkfonts
```
이후 카카오톡 설치 재수행

## 앱 아이콘이 Apps에 안보일 때
1. `KakaoTalk.exe` 경로 찾기
```
find ~/.wine -name "KakaoTalk.exe"
```
2. 수동 .desktop 생성
```
nano ~/.local/share/applications/kakaotalk.desktop
```
- 다음 내용 붙여넣기
- `Exec=wine` 우측에 `KakaoTalk.exe`경로 넣기
  
```
[Desktop Entry]
Name=KakaoTalk
Exec=wine "KakaoTalk.exe 경로를 여기에"
Type=Application
StartupNotify=true
Icon=kakaotalk
Categories=Network;Chat;
```


## 출처
- saturn.tistory.com
	- https://saturn.tistory.com/entry/Ubuntu-2404%EC%97%90%EC%84%9C-Wine%EC%9C%BC%EB%A1%9C-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-DPI-%ED%95%B4%EA%B2%B0
- i-can-du.tistory.com
	- https://i-can-du.tistory.com/166
