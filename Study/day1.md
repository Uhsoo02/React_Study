## Todo-List 코드 (간단한 CRUD 구현 수준)

```jsx
import { useState } from 'react'
import './App.css'

// 할일
// [{
//   id: String
//   text: String,
//   completed: Boolean,
// }]

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().toString(),
      text: inputValue,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');

  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => todo.id === id ? { ... todo, completed: !todo.completed } : todo)
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return <>
  <div className='app'>
    <div className = 'todo-container'>
      <header className = 'header'>
        <h1>🔥Todo List</h1>
        <p className = "subtitle">일정을 체계적으로 관리하세요.</p>
      </header>
      <form className = 'input-form' onSubmit={addTodo}>
        <input
          type="text"
          value = {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          placeholder="새로운 할 일을 입력하세요."
          className="todo-input"
        />
        <button type = "submit" className='add-button'>추가</button>
      </form>
      <div
      className='todo-list'>
        {todos.length === 0? (
            <div className='empty-state'>아직 할 일이 없습니다.</div>
          ) : (
            todos.map((todo) => (
              <div 
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <label className='todo-checkbox'>
                  <input
                    type = 'checkbox'
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                </label>
                <span className='todo-text'>{todo.text}</span>
                <button className='delete-button' onClick={() => deleteTodo(todo.id)}>
                  🗑️
                </button>
              </div>
          ))
        )}
      </div>
    </div>
  </div>
</>
}

export default App

```

## 1. import 부분

```jsx
import { useState } from 'react'
import './App.css'
```

`useState` 는 React에서 변경되는 값을 저장하기 위해 사용하는 Hook

일반 JavaScript 변수와 가장 큰 차이점은 값이 변경되었을 때 React가 이를 알고 화면을 다시 렌더링 진행함.

### 예)

- 일반 변수라면

```jsx
let count = 0;
count = 1;
```

값은 바뀌지만 React가 값이 바뀌었다는 것을 판단하기 어려우며 화면을 자동으로 다시 그린다고(렌더링)   보장을 못함.

But

```jsx
const [count, setCount] = useState(0);

setCount(1);
```

이 처럼 setCount()를 사용하게 되면 React가 “상태가 변경되었구나” 라고 판단하여 화면을 다시 렌더링을 하게 됨.

---

## 2. Todo 데이터 구조

```jsx
// 할일
// [{
//   id: String
//   text: String,
//   completed: Boolean,
// }]
```

Todo 하나를 어떤 형태로 저장할지 메모해둔 주석처리

실제 Todo 하나는 이런 객체가 됨

```jsx
{
  id: "Thu Sep 03 2026 ...",
  text: "React 공부하기",
  completed: false
}
```

각 값의 역할은 아래와 같이 됨

| **속성** | **역할** |
| --- | --- |
| `id` | Todo를 구분하기 위한 고유 값 |
| `text` | 할 일 내용 |
| `completed` | 완료 여부 |

### 예)

- Todo가 3개라면 `todos` 는 이런 배열이 됨

```jsx
[
  {
    id: "1",
    text: "React 공부",
    completed: false
  },
  {
    id: "2",
    text: "운동하기",
    completed: true
  },
  {
    id: "3",
    text: "정보처리기사 공부",
    completed: false
  }
]
```

---

## 3. State 선언

이 파트는 Todo-List에서 가장 중요한 부분 중 하나

```jsx
const [inputValue, setInputValue] = useState('');
const [todos, setTodos] = useState([]);
```

현재 State를 2개 사용

`inputValue`

```jsx
const [inputValue, setInputValue] = useState('');
```

사용자가 입력창에 작성하고 있는 내용을 저장

처음에는

```jsx
''
```

초기 값이 ``으로 빈 문자열

사용자가

```jsx
React 공부하기
```

라고 입력을 하게 된다면

```jsx
inputValue = "React 공부하기"
```

상태가 됨

하지만 직접적으로 

```jsx
inputValue = "React 공부하기";
```

이렇게 변경하는 방식이 아닌 반드시

```jsx
setInputValue("React 공부하기");
```

setInputValue를 사용

### 예)

```jsx
const [todos, setTodos] = useState([]); 의 경우
초기 값이 빈 배열이며,
todos가 만약 CRUD의 영향을 받아 id, text, completed에 영향이 생기면 
setTodos가 값을 변경하는 함수로 작용해 todos가 변경되는거고
 그걸 React가 화면을 다시 렌더링하는 방식
```

---

## 5. Todo 추가 함수 `addTodo`

```jsx
const addTodo = (e) => {
  e.preventDefault();

  const newTodo = {
    id: new Date().toString(),
    text: inputValue,
    completed: false,
  };

  setTodos([newTodo, ...todos]);
  setInputValue('');
};
```

이 부분이 **Todo를 추가하는 기능의 핵심 로직**부분

## 5-1. `e.preventDefault()`

```jsx
e.preventDefault();
```

밑에 `form`이 있음

```jsx
<form className='input-form' onSubmit={addTodo}>
```

HTML에서의 `<form>` 은 기본적으로 제출이 되면 페이지를 새로고침하려는 동작을 함.

하지만 React에서는 페이지 전체를 새로고침하지 않고 JavaScript로 처리를 하고 싶어 함.

그래서

```jsx
e.preventDefault();
```

를 사용해 form의 기본 제출 동작을 막으라는 의미.

즉,

```jsx
추가 버튼 클릭을 하면
↓
form submit이 발생
↓
addTodo를 실행
↓
페이지 새로고침은 막음
```

## 5-2. 새로운 Todo 객체 만들기

```jsx
const newTodo = {
  id: new Date().toString(),
  text: inputValue,
  completed: false,
};
```

사용자가 입력한 내용을 가지고 새로운 Todo 객체를 생성

### 예)

사용자가

```jsx
React 공부하기
```

를 입력했다면

```jsx
inputValue = "React 공부하기"
```

이기 때문에 `newTodo` 는 대략

```jsx
{
  id: "Thu Sep 03 2026 21:30:00 ...",
  text: "React 공부하기",
  completed: false
}
```

위처럼 됨.

`completed: false` 
새로운 Todo를 만들었기 때문에 처음부터 완료 상태일 수 없기 때문에

```jsx
completed: false
```

위와 같이 시작을 하게 됨.

## 5-3. Todo 배열에 추가

```jsx
setTodos([newTodo, ...todos]);
```

이 파트도 중요한 부분

`...todos` 는 Spread 문법.

기존 배열이

```jsx
todos = [
  { text: "운동하기" },
  { text: "공부하기" }
]
```

위와 같이 되어 있다면

```jsx
...todos
```

는 배열 내부의 요소를 펼치는 것이라고 생각하면 됨.

따라서

```jsx
[newTodo, ...todos]
```

위는

```jsx
[
  newTodo,
  { text: "운동하기" },
  { text: "공부하기" }
]
```

와 같은 의미라고 보면 됨.
즉, 새로운 Todo를 맨 앞에 추가하는 개념

(편하게 생각하면 우리가 Todo를 생성하면 새로운 것이 기존에 있던 Todo 위에 생기는 것을 생각하면 이해하기 좀 더 편함)

```jsx
todos.push(newTodo);
```

위와 같이 하면 안되는 이유: JavaScript에서는 가능하지만 React 같은 경우 State를 직접 수정하는 방식을 권장하지 않기 때문에 기존 데이터를 기반으로 새로운 배열을 만들어 State를 교체하는 방식을 사용.

```jsx
setTodos([newTodo, ...todos]);
```

위 코드의 핵심 - 기존 `todos` 를 직접 수정하는 것이 아니라 새로운 배열을 만들어 `setTodos()` 로 전달

## 5-4. 입력창 초기화

```jsx
setInputValue('');
```

Todo를 추가했으면 입력창을 비워줌.

### 예)

```jsx
React 공부하기
```

사용자가 위 내용을 입력하고 추가를 하게 되면

```jsx
setInputValue('');
```

을 통해서 입력창이 기존에 있던 빈 입력창으로 돌아오게 됨.

---