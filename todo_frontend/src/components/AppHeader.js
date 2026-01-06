import React from "react";

/**
 * PUBLIC_INTERFACE
 * App header with title and quick counts.
 */
export function AppHeader({ counts }) {
  return (
    <header className="appHeader">
      <div className="appHeader__titleRow">
        <h1 className="appTitle">Todo</h1>
        <div className="appBadge" aria-label={`${counts.active} active todos`}>
          {counts.active} active
        </div>
      </div>

      <p className="appSubtitle">
        Local-first tasks with browser persistence.
      </p>

      <div className="appMeta" role="status" aria-live="polite">
        <span>Total: {counts.total}</span>
        <span className="appMeta__dot" aria-hidden="true">
          •
        </span>
        <span>Completed: {counts.completed}</span>
      </div>
    </header>
  );
}
