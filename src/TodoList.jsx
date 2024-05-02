import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.css'; // Import your CSS file for styling

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Complete assignment", completed: false },
    { id: 2, task: "Go grocery shopping", completed: false },
    { id: 3, task: "Call mom", completed: false }
  ]);

  const [newTodo, setNewTodo] = useState('');

  const handleDelete = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      setTodos([...todos, { id: newId, task: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleCheckboxChange = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  };

  return (
    <div className="container mt-5">
      <h1>Todo List</h1>
      <ul className="list-group mt-3">
        {todos.map(todo => (
          <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => handleCheckboxChange(todo.id)}
                checked={todo.completed}
              />
              <label className={`form-check-label ${todo.completed ? 'completed-task' : ''}`}>
                {todo.task}
              </label>
            </div>
            {todo.completed && (
              <button type="button" className="btn btn-secondary" onClick={() => handleDelete(todo.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleFormSubmit} className="mt-3">
        <div className="form-group">
          <h4>Add Todo:</h4>
          <input
            type="text"
            className="form-control"
            id="newTodo"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter new todo"
          />
        </div>
        <button type="submit" className="btn btn-outline-dark mt-3">Submit</button>
      </form>
    </div>
  );
}

export default TodoList;
