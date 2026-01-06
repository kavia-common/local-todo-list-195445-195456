import React, { useId, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Controlled input + submit for creating a new todo.
 */
export function TodoInput({ onAdd }) {
  const inputId = useId();
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form className="todoInput" onSubmit={submit} aria-label="Add a new todo">
      <label className="srOnly" htmlFor={inputId}>
        New todo
      </label>
      <input
        id={inputId}
        className="todoInput__field"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task…"
        autoComplete="off"
      />
      <button className="btn btnPrimary" type="submit">
        Add
      </button>
    </form>
  );
}
