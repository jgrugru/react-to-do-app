import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function ToDoItem(props) {
  return (
    <div class="to-do" style={{ color: props.color }}>
      <input type="checkbox" onClick={props.onClick} />
      {props.toDoText}
      <button class="delete-to-do" type="button" onClick={props.delete}>-</button>
    </div>
  );
}

function Container() {

  const [toDoItems, setToDoItems] = useState([]);
  const [toDoInput, setToDoInput] = useState("");


  function addNewToDo(text) {
    let newToDo = { text, done: false }
    setToDoItems(todos => todos.concat(newToDo))
    setToDoInput('');
  }

  function deleteToDo(i) {
    setToDoItems(todos => todos.filter((x, index) => index !== i))
  }

  function handleClick(i) {
    setToDoItems(todos => {
      todos[i].done = !todos[i].done
      return Array.from(todos)
    })
  }

  return (
    <div class="to-dos-box">
      {toDoItems.map(({ text, done }, index) => (
        <ToDoItem toDoText={text} color={done ? 'green' : 'blue'} onClick={() => handleClick(index)} delete={() => deleteToDo(index)} />
      ))}

      <div class="new-to-do">
        <label for="#NewToDo" >ToDo:</label>
        <input type="text" id="NewToDo" name="NewToDo" placeholder="Wash the dishes." value={toDoInput} onChange={e => setToDoInput(e.currentTarget.value)} />
        <button class="add-to-do" type="button" onClick={() => addNewToDo(toDoInput)}>Add</button>
      </div>
    </div >

  );
}


function ToDoApp(props) {
  return (
    <div className="to-do-app">
      <div className="header">
        To Do App
      </div>
      <div className="to-dos">
        <Container />
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoApp />);


