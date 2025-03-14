// mern-frontend/src/pages/Todos.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/todos', { text });
      setTodos([...todos, res.data]);
      setText('');
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div className="page">
      <h1>Todo List</h1>
      <form onSubmit={addTodo} className="todo-form">
        <input 
          type="text"
          placeholder="Enter new todo"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
