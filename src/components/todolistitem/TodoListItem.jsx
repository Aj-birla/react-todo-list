import { useState } from "react";
import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import { TodoFormFields } from "../todoformfields/TodoFormFields";
import styles from "./TodoListItem.module.css";

export function TodoListItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleCompleted(event) {
    onUpdate(todo.id, { ...todo, completed: event.target.checked });
  }

  const handleEdit = (event) => {
    event.preventDefault()
    const { elements } = event.target;
    if (elements.name.value === "") return;

    onUpdate(todo.id, {
      name: elements.name.value,
      description: elements.description.value,
      deadline: elements.deadline.value,
      priority: elements.priority.value,
      completed: todo.completed,
    });

    setIsEditing(false);
  }

  const viewingTemplate = (
    <div className={styles.Content}>
      <input
        type="checkbox"
        name="completed"
        checked={todo.completed}
        onChange={handleCompleted}
        className={styles.Status}
      />

      <div className={styles.Info}>
        {todo.name}

        {todo.description && (
          <span className={styles.Description}>{todo.description}</span>
        )}

        <div className={styles.AdditionalInfo}>
          {todo.deadline}{" "}
          {todo.priority !== PRIORITY_DEFAULT && (
            <span style={{ color: PRIORITIES[todo.priority].color }}>
              {PRIORITIES[todo.priority].label}
            </span>
          )}
        </div>
      </div>

      <div className={styles.Controls}>
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
        <button onClick={() => setIsEditing(true)}>📝</button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={() => handleEdit(event)}>
      <TodoFormFields todo={todo} />

      <div className={styles.Controls}>
        <input type="submit" value="💾" />
        <input type="reset" value="❌" />
      </div>
    </form>
  );

  return (
    <li className={styles.TodoListItem} data-completed={todo.completed}>
      {isEditing ? editingTemplate : viewingTemplate}
    </li>
  );
}