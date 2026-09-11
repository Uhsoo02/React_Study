## 6. 완료 상태 변경 `toggleTodo`

```jsx
const toggleTodo = (id) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  )
}
```

- Todo 전체를 돌면서 클릭한 Todo만 `completed` 값을 반대로 변경하는 것

## 6-1. `map()`

```jsx
todos.map((todo) => ...)
```

- `map()` 은 배열 전체를 하나씩 확인하고 새로운 배열을 만들어주는 함수

### 예)

```jsx
[1, 2, 3].map((number) => number * 2)
```

위의 결과는

```jsx
[2, 4, 6]
```

여기서는 Todo 배열 전체를 확인한다고 이해하면 됨

## 6-2. 어떤 Todo를 클릭했는지 확인

```jsx
todo.id === id
```

체크박스를 클릭할 때

```jsx
toggleTodo(todo.id)
```

위에 있는 곳으로 해당 Todo의 id를 보내고 있음.

### 예)

```jsx
[
  { id: 1, text: "공부", completed: false },
  { id: 2, text: "운동", completed: false },
  { id: 3, text: "독서", completed: false }
]
```

`id = 2` 가 전달되었다고 가정했을 때 `map()` 은

```jsx
id 1 === 2 ? → false
id 2 === 2 ? → true
id 3 === 2 ? → false
```

위와 같이 하나씩 돌며 검사를 진행함.

## 6-3. 삼항 연산자

```jsx
todo.id === id
  ? { ...todo, completed: !todo.completed }
  : todo
```

위의 삼항 연산자는

```jsx
조건 ? 참일 때 : 거짓일 때
```

```jsx
todo.id === id
```

위 내용이 참이라고 한다면

```jsx
{ ...todo, completed: !todo.completed }
```

이것을 반환하는 것이며,

거짓일 경우

```jsx
todo
```

위 todo를 그대로 반환함.

## 6-4. `{ ...todo }` 가 중요한 이유

```jsx
{ ...todo, completed: !todo.completed }
```

```jsx
{
  id: 1,
  text: "React 공부",
  completed: false
}
```

Todo가 원래 위 상태라고 가정했을 때

```jsx
...todo
```

를 사용하게 되면 기존 속성을 복사를 함.

```jsx
{
  id: 1,
  text: "React 공부",
  completed: false
}
```

그리고 뒤에서 

```jsx
completed: !todo.completed
```

를 작성했습니다.

`false` 라면

!false는 true이기 때문에 결과적으로

```jsx
{
  id: 1,
  text: "React 공부",
  completed: true
}
```

가 되며, 다시 누르게 되면 !true로 false가 됨.

그래서 Toggle이라고 보면 됨

---

## 7. 삭제 함수 `deleteTodo`

```jsx
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
}
```

삭제는 `filter()` 를 사용함.

`filter()` 는 조건에 맞는 값만 남겨서 새로운 배열을 생성함.

### 예)

```jsx
[1, 2, 3, 4].filter(number => number !== 2)
```

위의 결과는

```jsx
[1, 3, 4]
```

Todo에서도 똑같음.

```jsx
todo.id !== id
```

즉, 삭제하려는 Todo와 ID가 다른 것들만 남겨라.

---

## 8. `map()` 과 `filter()` 차이

이번 코드에서 아주 중요한 JavaScript의 개념.

| **함수** | **현재 코드에서 역할** |
| --- | --- |
| `map()` | Todo를 수정 |
| `filter()` | Todo를 삭제 |

쉽게 기억하는 방법

```jsx
map
→ 배열의 항목을 가공해서 새로운 배열 생성

filter
→ 조건에 맞는 항목만 남겨서 새로운 배열 생성
```

이번 코드에서는

```jsx
todos.map(...)
```

으로 특정 Todo의 `completed` 를 수정하고,

```jsx
todos.filter(...)
```

위 `filter()` 를 통해 특정 Todo를 제거함.