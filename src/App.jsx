import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { TodoForm } from './components/todoform/TodoForm'
import { TodoList } from './components/todolist/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { api } from "./api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchTodos = () => {
    api.todos.getAll(filters).then(setTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleCreate = (newTodo) => {
    api.todos.create(newTodo).then(fetchTodos);
  }

  const handleUpdate = (id, newTodo) => {
    api.todos.update(id, newTodo).then(fetchTodos);
  }

  const handleDelete = (id) => {
    api.todos.delete(id).then(fetchTodos);
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
        <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
