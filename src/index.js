import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import clsx from 'clsx'

import "./index.css";

function ToDoItem(props) {
  
  return (
    <div className='todo' style={{ color: props.color }} >
      <input type="checkbox" value={props.to_do_text} onClick={props.onClick} />
      This is a to-do-item: {props.to_do_text}
      <button type="button" onClick={props.delete}>-</button>
    </div>
  );
}

const State = createContext({})

function GlobalStateProvider({children}) {

  const [state, setState] = useState({
    todoItems: []
  })

  const addTodo = (todo) => setState(prev => ({
    ...prev,
    todoItems: prev.todoItems.concat(todo)
  }))

  const ctxValue = {
    state,
    addTodo
  }



  return <State.Provider value={ctxValue}>{children}</State.Provider>
}

function Container() {

  const [todoItems, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState('')
  
  function handleClick(i) {
    setTodos(todos => {
      todos[i].done = !todos[i].done
      return Array.from(todos)
    })
  }

  function deleteToDoItem(i) {
    setTodos(todos => todos.filter((x,idx) =>  idx !== i))
  }

  function add_new_to_do(text) {
    const todo = { text, done: false }
    setTodos(todos => todos.concat(todo))
    setTodoInput('')
  }

  return <ul>
        {todoItems.map(({ text, done }, index) => (
          <li key={index}>
            <ToDoItem to_do_text={text} onClick={() => handleClick(index)} color={done ? 'green' : 'blue'} delete={() => deleteToDoItem(index)} />
          </li>
        ))}

        <li className="grid grid-columns-3 ">
          <label for="#NewToDo" >ToDo:</label>
          <input type="text" id="NewToDo" name="NewToDo" placeholder="Wash the dishes." value={todoInput} onChange={e => setTodoInput(e.currentTarget.value)} />
          <button type="button" onClick={() => add_new_to_do(todoInput)}>Add</button>
        </li>
      </ul >
}
 
function ToDoApp() {
  return (
    <GlobalStateProvider>
      <div className="to-do-app">
        <div className="header">
          To Do App
        </div>
        <div className="to-dos">
          <Container />
        </div>
      </div>
      </GlobalStateProvider>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoApp />);


