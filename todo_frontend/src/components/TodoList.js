import React from "react";
import { TodoItem } from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * List of todos with empty state messaging.
 */
export function TodoList({ todos, onToggle, onDelete, onUpdateTitle }) {
  if (todos.length === 0) {
    return (
      <div className="emptyState" role="status" aria-live="polite">
        <div className="emptyState__title">No todos yet</div>
        <div className="emptyState__text">
          Add a task above to get started.
        </div>
      </div>
    );
  }

  return (
    <ul className="todoList" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </ul>
  );
}
