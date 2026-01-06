import React from "react";

const FILTERS = /** @type {const} */ (["all", "active", "completed"]);

/**
 * PUBLIC_INTERFACE
 * Filter control for the todo list.
 */
export function TodoFilters({ value, onChange, disabled }) {
  return (
    <div className="filters" role="radiogroup" aria-label="Todo filters">
      {FILTERS.map((f) => (
        <button
          key={f}
          type="button"
          className={`filterBtn ${value === f ? "filterBtn--active" : ""}`}
          onClick={() => onChange(f)}
          disabled={disabled}
          role="radio"
          aria-checked={value === f}
        >
          {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
        </button>
      ))}
    </div>
  );
}
