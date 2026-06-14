import { TodoListItem } from "../todolistitem/TodoListItem";
import styles from "./TodoList.module.css";
export const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <section>
      <h3>To-Do's</h3>
      {!todos.length && <p>Sorry, you don't have any to-do's</p>}

      <ul className={styles.TodoList}>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onUpdate={ onUpdate} onDelete={onDelete} />
        ))}
      </ul>
    </section>
  );
}