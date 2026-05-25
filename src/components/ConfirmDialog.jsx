import React, { useEffect } from "react";

export default function ConfirmDialog({ book, onConfirm, onCancel, isDeleting }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal modal-small" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <div className="confirm-icon">🗑️</div>
        <h2 id="confirm-title" className="confirm-title">Delete Book?</h2>
        <p className="confirm-text">
          Are you sure you want to delete{" "}
          <strong className="confirm-book-name">"{book.title}"</strong>?
          <br />
          <span className="confirm-subtext">This action cannot be undone.</span>
        </p>
        <div className="form-actions">
          <button
            id="cancel-delete-btn"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            autoFocus
          >
            {isDeleting ? "⏳ Deleting..." : "🗑️ Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
