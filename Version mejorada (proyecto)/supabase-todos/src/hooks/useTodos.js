import { useState, useEffect, useCallback } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // función para ordenar por prioridad
  function sortByPriority(list) {
    const order = { alta: 1, media: 2, baja: 3 };
    return list.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(sortByPriority(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (text, priority) => {
    try {
      const newTodo = await addTodo(text, priority);
      setTodos((prev) => sortByPriority([newTodo, ...prev]));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggle = async (id, done) => {
    try {
      const updated = await updateTodo(id, !done);
      setTodos((prev) =>
        sortByPriority(prev.map((todo) => (todo.id === id ? updated : todo)))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    const ok = confirm("¿Seguro que quieres eliminar esta tarea?");
    if (!ok) return;

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


