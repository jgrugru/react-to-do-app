import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function ToDoItem(props) {
  return (
    <div className="to-do" style={{ color: props.color }}>
      <input type="checkbox" onClick={props.onClick} />
      {props.toDoText}
      <button className="delete-to-do" type="button" onClick={props.delete}>-</button>
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
    <div className="to-dos-box">
      {toDoItems.map(({ text, done }, index) => (
        <ToDoItem toDoText={text} color={done ? 'green' : 'blue'} onClick={() => handleClick(index)} delete={() => deleteToDo(index)} key={index} />
      ))}

      <div className="new-to-do">
        <label htmlFor="#NewToDo" >ToDo:</label>
        <input type="text" id="NewToDo" name="NewToDo" placeholder="Wash the dishes." value={toDoInput} onChange={e => setToDoInput(e.currentTarget.value)} />
        <button className="add-to-do" type="button" onClick={() => addNewToDo(toDoInput)}>Add</button>
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


