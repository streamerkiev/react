import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import todos from './todos';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: this.props.initialData
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleStatusChange(id) {
        let todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({ todos });
    }

    handleDelete(id) {
        let todos = this.state.todos.filter(todo => todo.id !== id);

        this.setState({ todos });
    }

    handleAdd(title) {
        let todos = this.state.todos;

        let todo = {
            id: todos.length + 1,
            title,
            completed: false
        };


        todos = [...todos, todo];

        this.setState({ todos });
    }

    handleEdit(id, title) {
        let todos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }

            return todo;
        });

        this.setState({ todos });
    }

    render() {
        return (
            <main>
                <Header title={this.props.title} todos={this.state.todos} />

                <ReactCSSTransitionGroup
                    component="section"
                    className="todo-list"
                    transitionName="slide"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {this.state.todos.map(todo =>
                        <Todo key={todo.id}
                              id={todo.id}
                              title={todo.title}
                              completed={todo.completed}
                              onStatusChange={this.handleStatusChange}
                              onDelete={this.handleDelete}
                              onEdit={this.handleEdit}
                        />
                    )}
                </ReactCSSTransitionGroup>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

App.propTypes = {
    title: React.PropTypes.string.isRequired,
    initialData: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired
    })).isRequired
};

ReactDOM.render(<App title={"React Todo"} initialData={todos} />, document.getElementById('root'));