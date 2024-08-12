---
title: "오픈소스 Mantine에 기여했던 경험 feat: IME"
tags: ["React", "JavaScript", "frontend"]
publishedAt: "2024-08-08"
isPublished: true
---

## 개요

작고 소중한 오픈소스 기여 경험에 대해 적어보려 한다.

[Mantine](https://mantine.dev/)의 TagsInput 컴포넌트에서 버그를 발견하고 수정한 과정이다.

## 문제 상황

TagsInput 컴포넌트는 당시 Mantine 7이 릴리즈 되면서 [새로 나온 컴포넌트](https://mantine.dev/changelog/7-0-0/#tagsinput-component)였다.

마침 사이드 프로젝트에서 이 컴포넌트가 필요해서 사용했는데, 한글 입력시 문제가 있었다.

한글 단어를 입력후 엔터를 치면 마지막 문자가 추가로 입력되는 버그였다.

예를 들어 '가나다' 입력후 엔터를 치면 태그로 '가나다' '다'가 같이 입력되었다.

![bug](/2024/contributing-to-opensource-mantine-ime-bug-fix/01.png)

이 버그를 Mantine 디스코드에 알렸고, 메인테이너는 이슈를 고치는 방법을 안다면 PR을 요청했다.

![discord](/2024/contributing-to-opensource-mantine-ime-bug-fix/02.png)

## 문제 파악하기

구글링과 Mantine 이슈, PR에서 비슷한 문제나 해결 방법이 있는지 찾아보았고, **크롬 브라우저 + IME** 문제인 걸 알게 되었다.

음 IME.. 처음보는 단어를 발견했다.

### IME(input method editor, 입력 방법 편집기)란?

> 위키 한국어 :
>
> 한글, 한자처럼 컴퓨터 자판에 있는 글자보다 수가 더 많은 문자를 계산하거나 조합하여 입력해 주는 시스템 소프트웨어

IME는 한국어, 일본어, 한자처럼 **키보드로 입력하기 어려운 문자를 입력할 수 있게 해주는 소프트웨어**다.

MDN에서는 이런 경우에도 IME가 사용된다고 한다.

1. 키보드를 사용하여 중국어, 일본어 또는 영어 입력을 하는 경우
2. 숫자를 사용하여 키보드를 입력하는 경우 (피처폰에서 숫자키로 문자 입력할 때)
3. 터치 스크린에 입력하여 입력하는 경우 (스마트폰, 태블릿 터치나 손글씨 인식)

TagsInput 컴포넌트도 이 IME 문제로 다음 방법으로 해결할 수 있다.

## 해결 방법

`KeyboardEvent.isComposing`는 현재
현재 IME 입력 상태를 boolean 값으로 반환해주는 `KeyboardEvent.isComposing`을 사용하여 문제를 해결할 수 있었다.

먼저 TagsInput 컴포넌트 내부 코드에서, Enter가 눌렸을때 `isComposing` 값이 어떻게 되는지 확인해봤다.

```ts
if (event.key === "Enter" && length > 0) {
  console.log(event.nativeEvent.isComposing);

  ...
}
```

`KeyboardEvent.isComposing`은 React 이벤트 객체에 없기 때문에 React 이벤트 객체의 `nativeEvent`를 사용해서 접근해야 한다.

한글 입력후 엔터를 누르면 이벤트가 두 번 발생했는데, `isComposing` 값이 처음엔 `true`, 두번째는 `false`로 출력되었다. 이건 IME의 작동 방식 때문이다.

1. 첫 번째 `isComposing: true` : IME가 한글 입력을 조합중임을 나타낸다.
2. 두 번째 `isComposing: false`: IME 조합이 끝남을 나타낸다.

따라서 `isComposing`이 `false`일 때만 Enter 동작을 실행하도록 수정하면 문제를 해결할 수 있다.

```ts
// before
if (event.key === 'Enter' && length > 0) {
  ...
}

// after
if (event.key === 'Enter' && length > 0 && !event.nativeEvent.isComposing) {
  ...
}
```

이제 IME 입력 중에는 Enter 입력 동작을 무시하고, 입력이 끝난 후에 정상적으로 하나의 태그가 추가된다.

### PR 제출

한 줄의 코드를 수정하고, [PR을 제출](https://github.com/mantinedev/mantine/pull/4947)했다.

## 배운것

- IME가 무엇인지 알게 되었다.
- IME 이슈가 있을 때 `isComposing` 속성을 활용한 해결 방법을 알게 되었다.

## 기타

크롬 버그 토론에서 크롬 IME가 OS의 IME와도 충돌이 일어나는 코멘트들도 있었다. 아쉽게 이 링크는 찾지 못함

## 참고

- https://developer.mozilla.org/ko/docs/Glossary/Input_method_editor
- https://en.wikipedia.org/wiki/Input_method
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing
- https://w3c.github.io/uievents/#dom-keyboardevent-iscomposing
