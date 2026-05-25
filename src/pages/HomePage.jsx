import React, { useEffect, useState } from "react";
import { useBooks } from "../context/BooksContext";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const {
    filteredBooks,
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    editBook,
    removeBook,
  } = useBooks();

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddClick = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDelete = (book) => {
    setDeletingBook(book);
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    let success;
    if (editingBook) {
      success = await editBook(editingBook.id, data);
    } else {
      success = await addBook(data);
    }
    setIsSubmitting(false);
    if (success) {
      setShowForm(false);
      setEditingBook(null);
    }
    return success;
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const success = await removeBook(deletingBook.id);
    setIsDeleting(false);
    if (success) setDeletingBook(null);
  };

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">
            Your Personal <span className="hero-accent">Library</span>
          </h1>
          <p className="hero-subtitle">
            Manage, discover, and organize your book collection — all in one
            beautiful place.
          </p>
        </div>
        <button
          id="add-book-btn"
          className="btn btn-primary btn-lg"
          onClick={handleAddClick}
          aria-label="Add a new book"
        >
          ➕ Add New Book
        </button>
      </section>

      {/* Controls */}
      <section className="controls-section">
        <SearchBar />
        <FilterBar />
      </section>

      {/* Stats Bar */}
      {!loading && !error && (
        <div className="stats-bar">
          <span className="stats-text">
            Showing{" "}
            <strong className="stats-count">{filteredBooks.length}</strong> of{" "}
            <strong className="stats-count">{books.length}</strong> books
          </span>
        </div>
      )}

      {/* Content */}
      <section className="content-section">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchBooks} />
        ) : (
          <BookList
            books={filteredBooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </section>

      {/* Modals */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleFormSubmit}
          onClose={() => { setShowForm(false); setEditingBook(null); }}
          isSubmitting={isSubmitting}
        />
      )}

      {deletingBook && (
        <ConfirmDialog
          book={deletingBook}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingBook(null)}
          isDeleting={isDeleting}
        />
      )}
    </main>
  );
}
