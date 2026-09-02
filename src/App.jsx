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
