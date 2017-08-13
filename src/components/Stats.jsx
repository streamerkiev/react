import React from 'react';

function Stats(props) {
    let total = props.todos.length;
    let completed = props.todos.filter(todo => todo.completed).length;
    let left = total - completed;

    return (
        <table className="stats">
            <tbody>
            <tr>
                <th>Total todos</th>
                <td>{total}</td>
            </tr>
            <tr>
                <th>Completed</th>
                <td>{completed}</td>
            </tr>
            <tr>
                <th>Left</th>
                <td>{left}</td>
            </tr>
            </tbody>
        </table>
    );
}

Stats.propTypes = {
    todos: React.PropTypes.array.isRequired
};

export default Stats;