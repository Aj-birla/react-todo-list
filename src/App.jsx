import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { TodoForm } from './components/todoform/TodoForm'
import { TodoList } from './components/todolist/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchTodos = () => {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then(res => !!res.ok && res.json())
      .then(setTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = (newTodo) => {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then(res => !!res.ok && fetchTodos())
      // .then();
  }

  const handleUpdate = (id, newTodo) => {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo)
    })
      .then(res => !!res.ok && fetchTodos())
  }

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then(res => !!res.ok && fetchTodos())
  }

  function filterTodos(todo) {
    const { completed, priority } = filters;

    return (
      (completed === "" || todo.completed === completed) &&
      (priority === "" || todo.priority === priority)
    );
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png"/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>
      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleCreate} />
        <TodoFilters onFilter={setFilters} />
        <TodoList todos={todos.filter(filterTodos)} onUpdate={handleUpdate} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
