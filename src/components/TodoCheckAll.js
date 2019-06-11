import React from "react";

const TodoCheckAll = props => {
  return (
    <div className="item-check-all">
      <div className="col-md-12 mx-auto">
        <input
          className="checkbox-all"
          type="checkbox"
          id="checkAll"
          onChange={props.checkAllTodo}
          checked={!props.anyItemsLefts()}
        />
        <label className="custom-label-check" htmlFor="checkAll">
          Check All
        </label>
      </div>
    </div>
  );
};

export default TodoCheckAll;
