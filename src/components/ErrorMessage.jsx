import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button id="retry-btn" className="btn btn-primary" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}
