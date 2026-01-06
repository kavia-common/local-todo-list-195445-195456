import React, { useEffect, useId, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Single todo row with toggle, edit, and delete.
 */
export function TodoItem({ todo, onToggle, onDelete, onUpdateTitle }) {
  const checkboxId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(todo.title);
  }, [todo.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.title) {
      onUpdateTitle(todo.id, trimmed);
    } else {
      setDraft(todo.title);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(todo.title);
    setIsEditing(false);
  };

  const onEditKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <li className={`todoItem ${todo.completed ? "todoItem--completed" : ""}`}>
      <div className="todoItem__main">
        <div className="todoToggle">
          <input
            id={checkboxId}
            className="todoToggle__checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label className="todoToggle__label" htmlFor={checkboxId}>
            <span className="srOnly">
              Mark "{todo.title}" as {todo.completed ? "not completed" : "completed"}
            </span>
          </label>
        </div>

        {!isEditing ? (
          <button
            type="button"
            className="todoTitleBtn"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit todo: ${todo.title}`}
          >
            {todo.title}
          </button>
        ) : (
          <div className="todoEdit">
            <label className="srOnly" htmlFor={`${checkboxId}-edit`}>
              Edit todo title
            </label>
            <input
              id={`${checkboxId}-edit`}
              ref={inputRef}
              className="todoEdit__input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onEditKeyDown}
            />
            <button type="button" className="btn btnGhost" onClick={commit}>
              Save
            </button>
            <button type="button" className="btn btnGhost" onClick={cancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="todoItem__actions">
        <button
          type="button"
          className="iconBtn iconBtn--danger"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete todo: ${todo.title}`}
          title="Delete"
        >
          ×
        </button>
      </div>
    </li>
  );
}
