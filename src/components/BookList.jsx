import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h2 className="empty-title">No books found</h2>
        <p className="empty-text">
          Try adjusting your search or filters, or add a new book to your
          library.
        </p>
      </div>
    );
  }

  return (
    <div className="book-grid" aria-label="Book list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
