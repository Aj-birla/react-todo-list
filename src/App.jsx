import styles from './App.module.css'
import { TodoForm } from './components/todoform/TodoForm'
import { TodoList } from './components/todolist/TodoList';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { useTodos } from './hooks/useTodos';
import { Alert } from './alert/Alert';

const App = () => {
  const todos = useTodos();

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png"/>
        <h2 className={styles.Title}>To-Do App</h2>
      </header>
      <div className={styles.AppContainer}>
        {!!todos.error.message && (
          <Alert onClear={todos.error.clear}>{todos.error.message}</Alert>
        )}
        <TodoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filter} />
        <TodoList todos={todos.data} onUpdate={todos.update} onDelete={todos.delete}/>
      </div>
    </div>
  )
}

export default App
