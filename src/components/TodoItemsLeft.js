import React from "react";

const TodoItemsLeft = (props) => {
  return (
    <div>
      <span style={{ color: "blue" }}>{props.itemsLeftsTodo}</span> items
      left
    </div>
  );
};

export default TodoItemsLeft;
