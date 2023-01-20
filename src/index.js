import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function ToDoItem(props) {
  return (
    <div className="to-do-item" style={{ color: props.color }} >
      <input type="checkbox" value={props.to_do_text} onClick={() => props.onClick()} />
      This is a to-do-item: {props.to_do_text}

      <button type="button" onClick={() => props.delete()}>-</button>
    </div>
  );
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to_do_items: [
        this.render_to_do_item(0, "Test1"),
        this.render_to_do_item(1, "Test2"),
        this.render_to_do_item(2, "Test3")
      ],
    };
  }

  handleClick(i, text) {
    console.log(i);
    var to_do_items = this.state.to_do_items.slice();
    to_do_items[i] = this.render_to_do_item(i, text, "green")
    this.setState({ to_do_items: to_do_items })
  }

  deleteToDoItem(i) {
    console.log(i);
    var to_do_items = this.state.to_do_items.slice();
    to_do_items[i] = null
    this.setState({ to_do_items: to_do_items })
  }

  render_to_do_item(i, text, color = "blue") {
    return <ToDoItem to_do_text={text} onClick={() => this.handleClick(i, text)} color={color} delete={() => this.deleteToDoItem(i)} />;
  }

  add_new_to_do(text, color = "blue") {
    var to_do_items = this.state.to_do_items.slice();
    var new_index = to_do_items.length;
    to_do_items.push(this.render_to_do_item(new_index, text, color));
    this.setState({ to_do_items: to_do_items })
  }

  render() {
    return (
      <ul>
        {this.state.to_do_items.map((to_do_item, index) => (
          <li key={index}>{to_do_item}</li>
        ))}

        <li key={-1}>
          <label for="NewToDo">ToDo:</label>
          < input type="text" id="NewToDo" name="NewToDo" placeholder="Wash the dishes." ></input >
          <button type="button" onClick={() => this.add_new_to_do(document.getElementById('NewToDo').value
          )}>Add</button>
        </li >
      </ul >
    );
  }
}

class ToDoApp extends React.Component {
  render() {
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
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoApp />);


