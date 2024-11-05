---
title: "You Don’t Know JS Yet - 자바스크립트 개념, 스코프와 클로저"
category: "책"
tags: ["책", "JavaScript"]
publishedAt: "2024-11-05"
isPublished: true
---

<img src="/you-dont-know-js-yet/01.jpg" alt="표지" style="margin-left: auto; margin-right: auto; max-height: 256px"/>

2024.11.05 ~ 작성중

## 책을 선택한 이유

원래 영어로 된 [온라인 버전](https://github.com/getify/You-Dont-Know-JS)을 알고 있었다. 하지만 영알못이라 원서를 읽기에는 부담이 커서 번역본이 나오길 기다리고 있었다. 그러다 [모던 JavaScript 튜토리얼](https://ko.javascript.info/)을 번역하신 이보라님이 이 책의 번역을 맡으신다는 소식을 SNS에서 보게 됐다. 그래서 출간되자마자 구매했는데, 이제야 읽어보게 되었다.

책의 소개처럼 JavaScript를 단순하게 사용하는 것을 넘어서, JavaScript의 본질과 개념들이 '왜' 만들어졌고 '왜' 알아야 하는지 이해하고 싶었다.

> You Don’t Know JS Yet이라는 제목은 대부분의 자바스크립트 개발자가 본인이 작성하는 코드가 어떻게 작동하는지 깊게 이해하는 데 시간을 쓰지 않는다는 점을 지적하려고 만들었습니다.

> 많은 개발자가 프로그램이 반환하는 결과만 중요시하고 코드를 어떻게 작성했는지, 왜 그렇게 작성했는지, 그리고 코드 작동 방식에 대해서는 중요하게 생각하지 않는다는 사실을 목격했습니다.

## 개념

### 1장 자바스크립트

- JavaScript는 ECMAScript 표준을 구현한 다중 패러다임 언어이다. 브라우저, Node.js 등 다양한 환경에서 실행된다.
- JavaScript는 컴파일 처리되는 언어이다.

> 저자는 JS를 컴파일 언어에 가깝다고 주장한다. 왜 그렇게 주장할까?
> 
> 1. 스크립트/인터프리터 언어와 달리 파싱 단계가 존재
>     - JS는 [ECMAScript 명세](https://tc39.es/ecma262/#sec-error-handling-and-language-extensions) 따라 문법 오류를 찾아냄[^parsing]. 파싱이 없다면 이런 오류를 사전에 탐지할 수 없음.
>     - 파싱 결과로 추상 구문 트리(AST)를 생성
>     - 저자는 "파싱을 거치는 언어는 컴파일 언어로 통용된다"고 설명
> 
> 2. 컴파일 단계와 JIT
>     - JS에서 파싱이 끝난 코드는 컴파일러를 거쳐 최적화된 이진 코드로 변환되어 실행 됨.
>     - 또 JS 엔진은 파싱 이후 생성된 코드를 다양한 방법으로 실행 전에 그때그때 JIT 처리 및 최적화함.
> 3. 단계 정리
> ```
> JS엔진이 전달 받은 코드를 파싱해 AST를 생성
> |
> 엔진은 AST를 이진 바이트 코드로 변환 + JIT 최적화 함께 진행 
> |
> JS 가상 머신이 프로그램 실행
> ```

이에 대해서 나는 [MDN의 설명](https://developer.mozilla.org/ko/docs/Web/JavaScript)대로 '인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어'로 이해하고 있다.

[^parsing]: 중복된 매개변수명 같이 정적으로 탐지가 가능한 오류를 초기 오류라고 부르고, 가능하면 프로그램 실행 전에 초기 오류를 찾아 낼 수 있어야 한다고 언급.
