import React from 'react'

 const TodoClearCompleted = (props) => {

    return (
      <div className="col-md-3">
      <button onClick={props.clearCompletedTodo}>Clear completed </button>
    </div>
    )

}


export default TodoClearCompleted;