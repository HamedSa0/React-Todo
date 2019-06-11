import React from "react";

const TodoItem = props => {
  return (
    <div key={props.todo.id} className="item-check">
      <div className="row ">
        <div className="col-md-10 ">
          <input
            className="checkbox-list"
            type="checkbox"
            onChange={event => props.checkTodo(props.todo, props.index, event)}
            checked={props.todo.completed}
          />

          {!props.todo.editing && (
            <div
              className={
                "custom-label " + (props.todo.completed ? "completed" : "")
              }
              onDoubleClick={event =>
                props.editTodo(props.todo, props.index, event)
              }
            >
              {props.todo.title}
            </div>
          )}

          {props.todo.editing && (
            <input
              className="t-item-edit"
              type="text"
              autoFocus
              defaultValue={props.todo.title}
              onBlur={event => props.doneEdit(props.todo, props.index, event)}
              onKeyUp={event => {
                if (event.key === "Enter") {
                  props.doneEdit(props.todo, props.index, event);
                } else if (event.key === "Escape") {
                  props.cancelEdit(props.todo, props.index, event);
                }
              }}
            />
          )}
        </div>

        <div className="col-md-2">
          <div
            style={{ float: "right", color: "red", cursor: "pointer" }}
            className="custom-label"
            onClick={event => props.deleteTodo(props.index)}
          >
            &times;
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
