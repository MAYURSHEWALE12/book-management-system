import React from "react";

const GENRE_COLORS = {
  Fiction: { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa", border: "rgba(139,92,246,0.35)" },
  "Sci-Fi": { bg: "rgba(6, 182, 212, 0.15)", text: "#22d3ee", border: "rgba(6,182,212,0.35)" },
  "Non-Fiction": { bg: "rgba(251, 146, 60, 0.15)", text: "#fb923c", border: "rgba(251,146,60,0.35)" },
  Biography: { bg: "rgba(34, 197, 94, 0.15)", text: "#4ade80", border: "rgba(34,197,94,0.35)" },
  Mystery: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239,68,68,0.35)" },
  Romance: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6", border: "rgba(236,72,153,0.35)" },
  Thriller: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245,158,11,0.35)" },
  Fantasy: { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8", border: "rgba(99,102,241,0.35)" },
  default: { bg: "rgba(100,116,139,0.15)", text: "#94a3b8", border: "rgba(100,116,139,0.35)" },
};

const COVER_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
];

function getCoverGradient(title = "") {
  const idx =
    title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    COVER_GRADIENTS.length;
  return COVER_GRADIENTS[idx];
}

export default function BookCard({ book, onEdit, onDelete }) {
  const genreStyle = GENRE_COLORS[book.genre] || GENRE_COLORS.default;
  const coverGradient = getCoverGradient(book.title);

  return (
    <div className="book-card">
      <div className="book-cover" style={{ background: coverGradient }}>
        <div className="book-cover-title">{book.title}</div>
        <div className="book-cover-author">{book.author}</div>
      </div>
      <div className="book-card-body">
        <div className="book-card-header">
          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>
          <span
            className="book-genre-badge"
            style={{
              background: genreStyle.bg,
              color: genreStyle.text,
              borderColor: genreStyle.border,
            }}
          >
            {book.genre}
          </span>
        </div>
        <p className="book-author">by {book.author}</p>
        {book.year && <p className="book-year">📅 {book.year}</p>}
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
        <div className="book-card-actions">
          <button
            id={`edit-book-${book.id}`}
            className="btn btn-edit"
            onClick={() => onEdit(book)}
            aria-label={`Edit ${book.title}`}
          >
            ✏️ Edit
          </button>
          <button
            id={`delete-book-${book.id}`}
            className="btn btn-delete"
            onClick={() => onDelete(book)}
            aria-label={`Delete ${book.title}`}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
