import React, { useMemo, useState } from "react";
import "./App.css";
import { AppHeader } from "./components/AppHeader";
import { TodoFilters } from "./components/TodoFilters";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

// PUBLIC_INTERFACE
function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodoTitle, clearCompleted, counts } =
    useTodos();

  const [filter, setFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const showClearCompleted = counts.completed > 0;

  return (
    <div className="App">
      <main className="page">
        <div className="card">
          <AppHeader counts={counts} />

          <TodoInput onAdd={addTodo} />

          <div className="toolbar">
            <TodoFilters
              value={filter}
              onChange={setFilter}
              disabled={todos.length === 0}
            />

            <div className="toolbar__spacer" />

            <button
              type="button"
              className="btn btnSecondary"
              onClick={clearCompleted}
              disabled={!showClearCompleted}
              aria-disabled={!showClearCompleted}
            >
              Clear completed
            </button>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdateTitle={updateTodoTitle}
          />
        </div>

        <footer className="footer">
          <span>
            Tip: click a todo title to edit. Press <kbd>Esc</kbd> to cancel.
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
