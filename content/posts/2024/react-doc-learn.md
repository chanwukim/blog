---
title: "React 공식문서 - 학습하기"
category: "React 공식문서"
tags: ["React", "FE"]
publishedAt: "2024-11-14"
isPublished: true
---

<img alt="썸네일" src="/react-doc/thumbnail.png" width="100%" style="margin: 1.5rem auto;"/>

> 1. React 공식문서를 정주행하여 리액트 기본기를 다져보자. 
> 2. 필요할때 정리한 이 글에서 빠르게 찾아보자.


# [React로 사고하기](https://ko.react.dev/learn/thinking-in-react) 🔥
- React는 항상 컴포넌트 계층구조를 따라 부모에서 자식으로 데이터를 전달하는 **단방향 데이터 흐름**을 사용한다.
- React는 state를 통해 기반 데이터 모델을 변경할 수 있게 한다.

## React로 UI를 구현하는 단계
### 1. UI를 컴포넌트 계층구조로 나누기

- 컴포넌트는 단일 책임 원칙을 지키도록 한다. 만약 컴포넌트가 점점 커진다면 작은 하위 컴포넌트로 쪼갠다.
- 데이터 구조가 잘 구성되어 있다면, UI 컴포넌트 구조와 자연스럽게 매핑된다.

### 2. 정적인 버전을 만들기
- props만 사용하여 정적 버전을 먼저 구현한다.
- state는 오직 상호작용을 위해 사용하기 때문에 필요하지않다.
### 3. 최소한의 state 찾기
- DRY 원칙으로 최소한의 state만 사용한다.
- state가 아닌 것을 구분하자:
    - 시간이 지나도 변하지 않는 값
    - 부모로부터 props를 통해 전달되는 값
    - 기존의 state나 props를 가지고 계산이 가능한 값
### 4. state의 위치를 정하기
1. state를 쓰는 모든 컴포넌트 찾기
2. 공통 부모 찾기
3. state의 위치를 정하기

### 5. 역방향 데이터 흐름 추가하기
- 아래로 흐르는 props와 state 컴포넌트 구조에서 state를 변경하려면 반대 방향의 데이터 흐름을 만들어야 한다. 즉, 하위 컴포넌트에서 state를 변경할 수 있도록 함수를 전달한다.

```bash
     FilterableProductTable    <-------+ 
                |                      |   onFilterTextChange
                v filterText           |
             SearchBar    -------------+
```

### Props vs State
- Props는 자식 컴포넌로 전달되는 데이터이다.
- State는 컴포넌트 별 메모리이다.

state는 보통 부모 컴포넌트에 저장되며, 자식 컴포넌트에 props로서 전달한다.

### React의 단방향 흐름
React는 데이터 흐름을 명시적으로 보이게 만들어 준다. 그러나 이는 전통적인 양방향 데이터 바인딩보다 조금 더 많은 타이핑이 필요하다.


Vue와 비교해보면:
```html
<script setup>
const input = defineModel()
</script>

<template>
  <input v-model="input" />
</template>
```

```tsx
function Input() {
  const [value, setValue] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);  // 상태 업데이트를 명시적으로 처리
  }

  return <input value={value} onChange={handleChange} />
}
```

# [UI 표현하기](https://ko.react.dev/learn/describing-the-ui)
- React는 사용자 인터페이스(UI)를 렌더링하기 위한 JavaScript 라이브러리

## [컴포넌트](https://ko.react.dev/learn/your-first-component) 🔥

- 컴포넌트는 React의 핵심 개념 중 하나이다. 
- React 앱은 `컴포넌트`로 불리는 독립된 UI 조각들로 이루어진다.
- React를 사용하면 마크업, CSS, JavaScript를 **재사용 가능한 UI 요소인 컴포넌트**로 결합할 수 있다.
- **React 컴포넌트는 마크업으로 반환하는 JavaScript 함수이다.**

### 유의사항
- 컴포넌트의 이름은 대문자로 시작한다
- `return` 키워드와 같은 라인에 있지 않은 경우엔 괄호로 묶어야한다.

```tsx
return (
  <div>
    ...
  </div>
)
```

## [JSX](https://ko.react.dev/learn/writing-markup-with-jsx) 🔥

- JSX는 JavaScript를 확장한 문법으로, JavaScript에서 HTML 마크업을 작성할 수 있게 해준다.
- JSX는 JavaScript 확장 문법일 뿐, React와 다른 개념이다.

### 왜 JSX를 사용하게 되었을까?
1. 기존 Web은 HTML, CSS, JavaScript를 분리된 파일로 관리했다.
2. Web이 더욱 인터랙티브해지면서, 로직(JavaScript)이 내용(HTML)을 결정하는 경우가 많아졌다.
3. React는 이를 반영해 렌더링 로직과 마크업을 컴포넌트라는 동일한 곳에 두기로 했다.

### JSX 규칙
1. 하나의 루트 엘리먼트로 반환한다. JSX는 HTML처럼 보이지만, 내부적으로는 JavaScript 객체로 변환되기 떄문이다.

```jsx
return (
  <div>
    <h1>Hedy Lamarr's Todos</h1>
    <ul>...</ul>
  </div>
);
```

변환된 JavaScript 객체
```js
return React.createElement(
  'div', // type
  null,  // props
  React.createElement('h1', null, "Hedy Lamarr's Todos"), // ..children
  React.createElement('ul', null, '...')
);
```

만약 루트 엘리먼트로 감싸지 않는다면:
```js
return (
  <h1>Hedy Lamarr's Todos</h1>
  <ul>...</ul>
)

// 변환후
// 함수는 하나의 값만 반환해야함. 잘못된 코드
return (
  React.createElement('h1', null, "Hedy Lamarr's Todos"),
  React.createElement('ul', null, '...')
);
```

2. 모든 태그는 닫아준다.

HTML:
```html
<img>
```
JSX:
```jsx
<img/>
```

3. 어트리뷰트는 camelCase로 작성하기
- JSX의 어트리뷰트는 JavaScript 객체의 키로 변환된다.
- JavaScript의 변수명 규칙을 따르기 때문에 대부분 camelCase로 작성한다.

## [Props](https://ko.react.dev/learn/passing-props-to-a-component) 🔥
- React 컴포넌트는 Props를 이용해 서로 통신한다. props를 전달함으로써 데이터를 자식 컴포넌트에게 전달할 수 있다.
- Props는 "읽기 전용"이며 변경할 수 없다.

### [Key](https://ko.react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) 🔥
- 배열을 데이터로 렌더링 할 땐, 각 항목을 고유하게 식별할 수 있는 `Key`를 지정해야한다.
- Key는 각 컴포넌트가 어떤 배열 항목에 해당하는지 React에 알려주어 나중에 일치시킬 수 있도록 한다. 이는 배열 항목이 정렬로 인해 이동하거나 삽입, 삭제될 수 있는 경우 중요해진다.
재정렬로 인해 위치가 변경되더라도, Key는 React 생명주기 내내 해당 항목을 식별할 수 있게 해준다.

> 즉, Key는 배열 렌더링 시 React가 각 요소/컴포넌트를 고유하게 식별하고, DOM 트리 업데이트에 도움이 된다.

- key 규칙
    - key는 형제 간에만 반드시 고유해야 한다.
    - key는 변경되어서는 안된다.

## [컴포넌트를 순수하게 유지하기](https://ko.react.dev/learn/keeping-components-pure)

### 순수함수

순수함수는:
1. 같은 입력에 대해 같은 출력을 한다.
2. 사이드 이펙트가 없어야 한다.

React는 이 컨셉을 기반으로 설계되었다.
1. 입력이 같을 경우, 컴포넌트는 같은 JSX를 반환한다.
2. 렌더링 전에 존재했던 객체나 변수를 변경하지 않는다.

### 부작용 (Side effects)
- 사이드 이펙트란, 렌더링 중에 발생하는 것이 아닌 "사이드"에서 발생하는 현상.
- React에서 보통 **사이드 이펙트는 이벤트 핸들러에 포함**된다. 예를 들어 버튼을 클릭하는 행위는 렌더링 중에는 실행되지 않는다.
그래서 **이벤트 핸들러는 순수할 필요가 없다.**
- 무언가를 변경할 땐 이벤트 핸들러를, 마지막 수단은 `useEffect`를 사용한다.

### React는 왜 순수함을 신경쓸까?
1. 컴포넌트는 다른 환경(서버 사이드)에서 실행될 수 있다.
    - 동일한 입력에 대해 동일한 출력을 하므로 컴포넌트를 서버에서 안전하게 실행할 수 있다.
     ```tsx
      // 이게 서버컴포넌트라면
      // 여러 사용자의 요청이 서로 간섭되고,
      // 동시 요청시 결과 예측 불가능
      let userCount = 0;

      function UserCard() {
        userCount++1; // 🚨 사이드이펙트
        return <p>당신은 {userCount}번째 입니다</p>
      }

      ```

2. 성능 최적화
    - 동일한 입력에 대해 동일한 출력 👉 입력이 변경되지 않은 컴포넌트의 렌더링을 건너뛰어 성능을 향상할 수 있다. - [React.memo](https://ko.react.dev/reference/react/memo)

3. 렌더링 중단과 재시작이 안전하다.
    - 사이드 이펙트가 없으므로 렌더링 도중 데이터가 변경되어도 렌더링을 언제든지 중단하고 다시 시작할 수 있다.

## [트리로서 UI 이해하기](https://ko.react.dev/learn/understanding-your-ui-as-a-tree)

- React는 React 앱의 컴포넌트 간의 관계를 관리하고 모델링하기 위해 **트리 구조를 사용**한다.

<img width="100%" src="https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_dom_tree.png&w=1920&q=75">


- React는 위 이미지처럼 컴포넌트로부터 UI 트리를 생성한다. 트리는 노드로 구성되어 있으며, 각 노드는 컴포넌트를 나타낸다. 다음 코드와 이미지를 보면 `App`, `FancyText`, `Copyright` 같은 컴포넌트는 모두 트리의 노드이다.

```tsx
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
```

<img width="80%" style="margin: 0 auto" src="https://ko.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Frender_tree.png&w=1080&q=75" >
