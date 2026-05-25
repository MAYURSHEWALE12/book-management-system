import React from "react";

export default function LoadingSpinner({ message = "Loading books..." }) {
  return (
    <div className="loading-container" aria-live="polite" aria-busy="true">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
