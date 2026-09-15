## 9. 입력창

```jsx
	<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="새로운 할 일을 입력하세요."
  className="todo-input"
/>
```

이 부분에는 React에서 중요한 개념인 Controlled Component가 사용됨.

Controlled Component란?

- React 등의 프레임워크에서 폼 입력 값을 컴포넌트의 내부 상태로 완전히 관리하고 통제하는 방식

핵심은

```jsx
value={inputValue}
```

와

```jsx
onChange={(e) => setInputValue(e.target.value)}
```

이렇게 두가지가 핵심이라고 할 수 있음.

## 9-1. 사용자가 글자를 입력하면

### 예) 사용자가 `R` 을 입력하면

```jsx
onChange
```

이벤트가 발생을 하게 되는데

```jsx
(e) => setInputValue(e.target.value)
```

여기서

```jsx
e.target
```

은 현재 <input>을 의미하며,

```jsx
e.target.value
```

는 입력창에 있는 값을 의미함.

따라서

```jsx
setInputValue(e.target.value)
```

가 실행이 되는 방식

```jsx
사용자 "React" 입력
       ↓
onChange 발생
       ↓
e.target.value = "React"
       ↓
setInputValue("React")
       ↓
inputValue = "React"
       ↓
value={inputValue}
       ↓
화면에도 "React" 표시
```

위는 전체 흐름을 표현한 것

---

## 10. Form 제출

```jsx
<form className='input-form' onSubmit={addTodo}>
```

그리고 버튼이

```jsx
<button type="submit">
  추가
</button>
```

입니다.

`type="submit"` 버튼을 클릭하면 `<form>` 의 `onSubmit` 이 실행됨.

따라서 흐름은

```jsx
추가 버튼 클릭
↓
form submit
↓
onSubmit
↓
addTodo()
```

위와 같이 진행하게 됨

또한 이 구조의 장점은 입력창에서 Enter를 누러도 Todo가 추가됨.

---

## 11. Todo가 없을 때

```jsx
{todos.length === 0 ? (
  <div className='empty-state'>
    아직 할 일이 없습니다.
  </div>
) : (
  ...
)}
```

위에 있는 코드 또한 삼항 연산자.

삼항 연산의 구조는

```jsx
조건 ? A : B
```

위와 같이 구성됩니다.

현재 조건

```jsx
todos.length === 0
```

입니다.

만약 Todo가 없다면 [ ] 이기 때문에

```jsx
todos.length
```

는 0입니다.

따라서

Todo는 0개이며 그 결과 값으로 → “아직 할 일이 없습니다.” 를 보여주게 됩니다.

만약 반대로 Todo가 하나라도 있다면 아래의 `todos.map()` 이 실행됩니다.

---

## 12. Todo 목록 화면에 출력

```jsx
todos.map((todo) => (
  <div key={todo.id}>
    ...
  </div>
))
```

Todo 배열에 있는 항목 하나마다 JSX를 하나씩 생성합니다.

### 예)

```jsx
[
  { text: "React 공부" },
  { text: "운동하기" },
  { text: "독서하기" }
]
```

위 처럼 만약 있다면, 화면에는

```jsx
☐ React 공부     🗑️
☐ 운동하기       🗑️
☐ 독서하기       🗑️
```

위 처럼 3개의 Todo가 만들어지게 됩니다.

## 12-1. `key={todo.id}`

```jsx
<div key={todo.id}>
```

React에서 `map()` 으로 여러 요소를 렌더링할 때는 각각을 구분할 수 있는 `key` 가 필요합니다.

React 입장에서는

```jsx
이 Todo가 새로 생겼는지
이 Todo가 삭제됐는지
이 Todo가 변경됐는지
```

구분하기 위해 사용하게 됩니다.

그래서 고유한 값인

```jsx
todo.id
```

를 `key`로 사용을 진행함.

---

## 13. 완료된 Todo에 CSS 적용

```jsx
className={`todo-item ${todo.completed ? 'completed' : ''}`}
```

Template Literal과 삼항 연산자가 같이 사용되었습니다.

만약 Todo가 완료되지 않았다면

```jsx
todo.completed = false
```

이므로 결과는 대략

```jsx
className="todo-item "
```

가 됩니다.

만약 Todo가 완료되었다면

```jsx
todo.completed = true
```

이므로

```jsx
className="todo-item completed"
```

가 됩니다.

그러면 CSS에서 예를 들어

```jsx
.completed {
  opacity: 0.5;
}
```

또는

```jsx
.completed .todo-text {
  text-decoration: line-through;
}
```

같은 스타일을 적용할 수 있습니다.

---

## 14. 체크박스

```jsx
<input
  type='checkbox'
  checked={todo.completed}
  onChange={() => toggleTodo(todo.id)}
/>
```

`checked`

```jsx
checked={todo.completed}
```

Todo의 완료 여부와 체크박스 상태를 연결함.

```jsx
completed = false
-> 체크 해제

completed = true
-> 체크됨
```

그리고 사용자가 클릭을 하게 되면

```jsx
onChange={() => toggleTodo(todo.id)}
```

가 실행되게 됩니다.

### 예) React 공부 Todo의 ID가 `123` 이라면

```jsx
toggleTodo(123)
```

이 실행됩니다.

그 함수가 해당 Todo의 `completed` 값을 반대로 변경함.