import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kavia_todos_v1";

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 * @property {number} createdAt
 * @property {number} updatedAt
 */

function safeParseTodos(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t === "object")
      .map((t) => ({
        id: typeof t.id === "string" ? t.id : crypto.randomUUID(),
        title: typeof t.title === "string" ? t.title : "",
        completed: Boolean(t.completed),
        createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
        updatedAt: typeof t.updatedAt === "number" ? t.updatedAt : Date.now(),
      }))
      .filter((t) => t.title.trim().length > 0);
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * React hook to manage a local-first Todo list persisted to localStorage.
 * Provides CRUD operations, completion toggling, and simple counts.
 *
 * @returns {{
 *  todos: Todo[],
 *  addTodo: (title: string) => void,
 *  deleteTodo: (id: string) => void,
 *  toggleTodo: (id: string) => void,
 *  updateTodoTitle: (id: string, title: string) => void,
 *  clearCompleted: () => void,
 *  counts: { total: number, active: number, completed: number }
 * }}
 */
export function useTodos() {
  const [todos, setTodos] = useState(() =>
    safeParseTodos(window.localStorage.getItem(STORAGE_KEY))
  );

  // Persist on any change.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  const addTodo = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = Date.now();
    const newTodo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    const now = Date.now();
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: now } : t
      )
    );
  };

  const updateTodoTitle = (id, title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = Date.now();
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed, updatedAt: now } : t))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return { todos, addTodo, deleteTodo, toggleTodo, updateTodoTitle, clearCompleted, counts };
}
