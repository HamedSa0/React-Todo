import React from "react";
import * as classnames from "classnames";

const TodoFilter = props => {
  return (
    <div className="col-md-6">
      <button
        className={classnames({ active: props.filter === "all" })}
        onClick={() => props.filterActiveTodo("all")}
      >
        All
      </button>
      <button
        className={classnames({ active: props.filter === "active" })}
        onClick={() => props.filterActiveTodo("active")}
      >
        Active
      </button>
      <button
        className={classnames({ active: props.filter === "completed" })}
        onClick={() => props.filterActiveTodo("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
