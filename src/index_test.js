import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function LineItem(props) {
  return (
    <div><span>{props.index}</span> {props.value}</div>
  );
}

function Container() {

  const [lineItems, setLineItems] = useState([]);

  function addLineItem(text) {
    setLineItems(line_items => line_items.concat(text))
  }

  return (
    <div>
      <button onClick={() => addLineItem("jeffrey")}>Press me.</button>

      <div>
        {lineItems.map((x, index) => (
          <LineItem value={x} index={index} key={index} />
        ))}
      </div >
    </div>

  );
}


function ToDoApp(props) {
  return (
    <div>
      TESTING
      <Container />
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ToDoApp />);


