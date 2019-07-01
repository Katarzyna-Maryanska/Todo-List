import React from 'react';
import TodoForm from "./TodoForm";
import "./TodoList.css"
import Todo from "./Todo"

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todosToShow: "all",
            toggleAllComplete: true
        }
    }

    addTodo = (todo) => {
        this.setState({
            todos: [todo,...this.state.todos]
        })
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {

                if (todo.id === id) {
                    return{
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })
    };

    updateToDoToShow = (string) => {
        this.setState({
            todosToShow: string
        })
    };

    onDeleteHandler = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    };

    onDeleteAllCompleteHandler = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    };

    render() {
        let todos = [];

        if(this.state.todosToShow === "all") {
            todos = this.state.todos;
        }
        else if (this.state.todosToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete)
        }
        else if (this.state.todosToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete)
        }

        return (
            <div className="container">
                <TodoForm onSubmit={this.addTodo}/>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        toggleComplete={() => this.toggleComplete(todo.id)}
                        onDelete={() => this.onDeleteHandler(todo.id)}
                        todo={todo}/>
                ))}
                <div>
                    Todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button
                        onClick={() => this.updateToDoToShow("all")}>All
                    </button>
                    <button
                        onClick={() => this.updateToDoToShow("active")}>Active
                    </button>
                    <button
                        onClick={() => this.updateToDoToShow("complete")}>Complete
                    </button>
                </div>
                {this.state.todos.filter(todo => todo.complete).length ? (
                    <div>
                        <button onClick={this.onDeleteAllCompleteHandler}>
                            Remove all complete todos
                        </button>
                    </div>
                ) : null}
                <div>
                    <button onClick={() => this.setState({
                        todos: this.state.todos.map(todo => ({
                            ...todo,
                            complete: this.state.toggleAllComplete
                        })),
                        toggleAllComplete: !this.state.toggleAllComplete
                    })}>
                        Toggle all complete:{`${this.state.toggleAllComplete}`}
                    </button>
                </div>
            </div>
        )

    }
}

export default TodoList