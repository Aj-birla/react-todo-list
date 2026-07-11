import { useEffect, useState } from "react";
import { api } from "../api";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchTodos = async () => {
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data)
    } catch (error) {
      console.log("Failed to get todo's. Please try again later.");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleCreate = async (newTodo) => {
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      console.log("Failed to create todo. Please try again later.");
    }
  }

  const handleUpdate = async(id, newTodo) => {
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos();
    } catch (error) {
      console.log("Failed to update todo. Please try again later.");
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      console.log("Failed to delete todo. Please try again later.");
    }
  }

  return {
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
  };
}