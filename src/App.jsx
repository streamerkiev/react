import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then(response => this.setState({ todos: response.data }))
            .catch(this.handleError);
    }

    handleAdd(title) {
        axios.post('/api/todos', {title})
            .then(response => response.data)
            .then(todo => {
                const todos = [...this.state.todos, todo];

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleDelete(id) {
        axios.delete(`/api/todos/${id}`)
            .then(() => {
                const todos = this.state.todos.filter(todo => todo.id !== id);

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleToggle(id) {
        axios.patch(`/api/todos/${id}`)
            .then(response => {
                const todos = this.state.todos.map(todo => {
                    if (todo.id === id) {
                        todo = response.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleEdit(id, title) {
        axios.put(`/api/todos/${id}`, {title})
            .then(response => {
                const todos = this.state.todos.map(todo => {
                    if (todo.id === id) {
                        todo = response.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleError(error) {
        console.log(error);
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

                <section className="todo-list">
                    {this.state.todos.map(todo => 
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onDelete={this.handleDelete}
                            onToggle={this.handleToggle}
                            onEdit={this.handleEdit}
                        />)
                    }
                </section>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));