import React, { Component } from "react";
import "../src/styles/App.css";
import TodoItemsLeft from "./components/TodoItemsLeft";
import TodoItem from "./components/TodoItem";
import TodoCheckAll from "./components/TodoCheckAll";
import TodoFilter from "./components/TodoFilter";
import TodoClearCompleted from "./components/TodoClearCompleted";

class App extends Component {
  todoInput = React.createRef();

  state = {
    filter: "all",
    beforeEditCache: "",
    idForTodo: 3,
    todos: [
      {
        id: 1,
        title: " learning ReactJs ",
        completed: false,
        editing: false
      },

      {
        id: 2,
        title: "learning NodeJs ",
        completed: false,
        editing: false
      }
    ]
  };

  addTodo = event => {
    if (event.key === "Enter") {
      const todoInput = this.todoInput.current.value;

      if (todoInput.trim().length === 0) {
        return;
      }

      this.setState((prevState, props) => {
        let todos = prevState.todos;
        let idForTodo = prevState.idForTodo + 1;

        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false
        });
        return { todos, idForTodo };
      });

      this.todoInput.current.value = "";
    }
  };

  deleteTodo = index => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todos.splice(index, 1);

      return { todos };
    });
  };

  checkTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.completed = !todo.completed;

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  editTodo = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = true;

      todos.splice(index, 1, todo);

      return { todos, beforeEditCache: todo.title };
    });
  };

  doneEdit = (todo, index, event) => {
    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;
      todo.editing = false;

      if (event.target.value.trim().length === 0) {
        todo.title = prevState.beforeEditCache;
      } else {
        todo.title = event.target.value;
      }

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  cancelEdit = (todo, index, event) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todo.title = prevState.beforeEditCache;
      todo.editing = false;

      todos.splice(index, 1, todo);

      return { todos };
    });
  };

  itemsLeftsTodo = () => {
    return this.state.todos.filter(todo => !todo.completed).length;
  };

  anyItemsLefts = () => {
    return this.itemsLeftsTodo() !== 0;
  };

  clearCompletedCount = () => {
    return this.state.todos.filter(todo => todo.completed).length;
  };

  clearCompletedTodo = () => {
    this.setState((prevState, props) => {
      return { todos: prevState.todos.filter(todo => !todo.completed) };
    });
  };

  filterActiveTodo = filter => {
    this.setState({ filter });
  };

  filterTodo = () => {
    if (this.state.filter === "all") {
      return this.state.todos;
    } else if (this.state.filter === "active") {
      return this.state.todos.filter(todo => !todo.completed);
    } else if (this.state.filter === "completed") {
      return this.state.todos.filter(todo => todo.completed);
    }

    return this.state.todos;
  };

  checkAllTodo = event => {
    event.persist();

    this.setState((prevState, props) => {
      let todos = prevState.todos;

      todos.forEach(todo => (todo.completed = event.target.checked));

      return { todos };
    });
  };

  render() {
    return (
      <div style={{ marginTop: "100px" }} className="container">
        <h1 className="mb-5" style={{ textAlign: "center", fontSize: "50px" }}>
          TODO
        </h1>
        <div className="  mx-auto todo-border">
          <div className="col-md-8 mx-auto mb-4">
            <input
              type="text"
              className="t-input"
              placeholder="What needs to be done?"
              ref={this.todoInput}
              onKeyUp={this.addTodo}
            />
          </div>

          <div className="col-md-8 mx-auto">
            {this.filterTodo().map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                checkTodo={this.checkTodo}
                doneEdit={this.doneEdit}
                cancelEdit={this.cancelEdit}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
              />
            ))}

            <TodoCheckAll
              checkAllTodo={this.checkAllTodo}
              anyItemsLefts={this.anyItemsLefts}
            />
          </div>

          <div className="col-md-8 mx-auto">
            <div className="t-footer">
              <div className="row">
                <div className="col-md-3">
                  <TodoItemsLeft itemsLeftsTodo={this.itemsLeftsTodo()} />
                </div>

                <TodoFilter
                  filterActiveTodo={this.filterActiveTodo}
                  filter={this.state.filter}
                />

                {this.clearCompletedCount() > 0 && (
                  <TodoClearCompleted
                    clearCompletedTodo={this.clearCompletedTodo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
