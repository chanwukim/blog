---
title: "리액트 React Event Object와 합성 이벤트"
category: "React"
description: "React 이벤트 객체와 합성 이벤트에 대해 정리"
tags:
  - React
  - DOM
  - FE
publishedAt: "2024-06-28"
isPublished: true
---

## React 이벤트 객체

React에서 이벤트 핸들러는 매개변수로 '합성 이벤트 객체(synthetic event)'인 '[React 이벤트 객체](https://react.dev/reference/react-dom/components/common#react-event-object)'를 받는다.

```tsx
function App() {
  function handleClick(e: React.MouseEvent) {
    // ...
  }

  return <button onClick={handleClick}>children</button>;
}
```

- **왜? :** React는 **크로스 브라우징 이슈를 해결하기 위해** 자체적으로 React 이벤트 객체를 만들었다. 덕분에 일관된 API를 사용해 모든 브라우저에서 동작할 수 있는 코드를 작성할 수 있다.
- **한계점 :** React 이벤트 객체가 모든 브라우저의 이벤트 프로퍼티나 메서드를 제공하지 않기 때문에, 필요하다면 React 이벤트 객체의 `nativeEvent`를 사용하여 브라우저의 기본 이벤트 객체를 참조할 수 있다.

> React 이벤트 객체의 타입 최상단 `BaseSyntheticEvent`에서 `nativeEvent`를 볼 수 있다.
>
> ```ts
> interface BaseSyntheticEvent<E = object, C = any, T = any> {
>         nativeEvent: E;
>         currentTarget: C;
>         target: T
>         ...
> }
> ```

## 합성 이벤트(synthetic event)

합성 이벤트는 코드로 [직접 생성하고 이벤트를 발생(dispatch)시키는 이벤트](https://dom.spec.whatwg.org/#events)다. 사용자 클릭 같은 브라우저 자체에서 발생하는 이벤트와 다르게, 합성 이벤트는 개발자가 필요할 때 직접 생성하고 실행할 수 있다.

코드로 알아보자:

```js
const btn = document.getElementById("btn");

// 1. 버튼을 클릭하면
btn.addEventListener("click", (e) => {
  // 2. 커스텀 이벤트 'cat'을 생성한다
  const customEvent = new CustomEvent("cat", {
    detail: {
      name: "navy",
    },
  });

  // 3. 'cat' 이벤트를 발생시킨다
  btn.dispatchEvent(customEvent);
});

// 4. 'cat' 이벤트 리스너
obj.addEventListener("cat", function (e) {
  // 이벤트 발생 시 처리할 로직
  console.log(e.detail);
});
```

- (1): 버튼 클릭 시 콜백 함수가 실행된다.
- (2): CustomEvent를 생성한다. CustomEvent 생성자의 두 번째 인자 옵션은 [EventInit](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#options)을 상속한 CustomEventInit이며, detail 프로퍼티를 추가적으로 갖는다. detail 프로퍼티는 이벤트와 함께 전달할 추가적인 데이터를 포함할 수 있다.
- (3): 생성된 customEvent를 dispatchEvent() 메서드를 사용해 발생시킨다.
- (4): 'cat' 이벤트 리스너는 발생한 커스텀 이벤트를 처리한다.

이 과정을 통해 이벤트를 직접 생성하고 발생시킬 수 있게 되었다.

## 결론

- React 이벤트 객체는 크로스 브라우징 이슈를 해결하고 일관된 이벤트 처리를 가능하게 한다.
- 합성 이벤트에 대해 정리했다. 합성 이벤트를 사용하면, 직접 시맨틱한 커스텀 이벤트를 생성하고 원하는 시점에 발생시킬 수 있다.

## 참고

- [React 이벤트 객체 | react.dev](https://ko.react.dev/reference/react-dom/components/common#common)
- [Introduction to "DOM Events" | dom.spec.whatwg.org](https://dom.spec.whatwg.org/#introduction-to-dom-events)
- [Creating and triggering events | MDN](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
