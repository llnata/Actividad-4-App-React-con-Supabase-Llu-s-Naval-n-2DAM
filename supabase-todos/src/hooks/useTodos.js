import { useState, useEffect, useCallback } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (text) => {
    try {
      const newTodo = await addTodo(text);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggle = async (id, done) => {
    try {
      const updated = await updateTodo(id, !done);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, [load]);

  return { todos, loading, error, create, toggle, remove };
}


