import { useEffect, useState } from "react";
import { api } from "../api";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data)
    } catch (error) {
      setErrorMessage("Failed to get todo's. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  const handleCreate = async (newTodo) => {
    setIsLoading(true);
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to create todo. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdate = async (id, newTodo) => {
    setIsLoading(true);
    try {
      await api.todos.update(id, newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to update todo. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await api.todos.delete(id);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Failed to delete todo. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    data: todos,
    fetch: fetchTodos,
    filter: setFilters,
    create: handleCreate,
    update: handleUpdate,
    delete: handleDelete,
    error: {
      message: errorMessage,
      clear: () => setErrorMessage(),
    },
    isLoading
  };
}