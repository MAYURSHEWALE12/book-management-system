import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Biography",
  "Mystery",
  "Romance",
  "Thriller",
  "Fantasy",
];

export default function BookForm({ book, onSubmit, onClose, isSubmitting }) {
  const isEditing = !!book;
  const firstInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: book
      ? {
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year,
          description: book.description || "",
        }
      : { genre: "Fiction", year: new Date().getFullYear() },
  });

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const onFormSubmit = async (data) => {
    const success = await onSubmit({ ...data, year: parseInt(data.year, 10) });
    if (success) reset();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={isEditing ? "Edit Book" : "Add New Book"}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? "✏️ Edit Book" : "➕ Add New Book"}
          </h2>
          <button id="close-modal-btn" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form className="book-form" onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="form-group">
            <label htmlFor="book-title" className="form-label">Title <span className="required">*</span></label>
            <input
              id="book-title"
              ref={firstInputRef}
              className={`form-input ${errors.title ? "input-error" : ""}`}
              placeholder="e.g. The Great Gatsby"
              {...register("title", { required: "Title is required", maxLength: { value: 120, message: "Max 120 characters" } })}
            />
            {errors.title && <span className="error-msg">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="book-author" className="form-label">Author <span className="required">*</span></label>
            <input
              id="book-author"
              className={`form-input ${errors.author ? "input-error" : ""}`}
              placeholder="e.g. F. Scott Fitzgerald"
              {...register("author", { required: "Author is required", maxLength: { value: 80, message: "Max 80 characters" } })}
            />
            {errors.author && <span className="error-msg">{errors.author.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="book-genre" className="form-label">Genre <span className="required">*</span></label>
              <select
                id="book-genre"
                className={`form-input form-select ${errors.genre ? "input-error" : ""}`}
                {...register("genre", { required: "Genre is required" })}
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.genre && <span className="error-msg">{errors.genre.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="book-year" className="form-label">Year <span className="required">*</span></label>
              <input
                id="book-year"
                type="number"
                className={`form-input ${errors.year ? "input-error" : ""}`}
                placeholder="e.g. 2023"
                {...register("year", {
                  required: "Year is required",
                  min: { value: 1000, message: "Enter a valid year" },
                  max: { value: new Date().getFullYear(), message: "Year can't be in the future" },
                })}
              />
              {errors.year && <span className="error-msg">{errors.year.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="book-description" className="form-label">Description</label>
            <textarea
              id="book-description"
              className="form-input form-textarea"
              placeholder="A brief description of the book..."
              rows={3}
              {...register("description", { maxLength: { value: 300, message: "Max 300 characters" } })}
            />
            {errors.description && <span className="error-msg">{errors.description.message}</span>}
          </div>

          <div className="form-actions">
            <button id="cancel-form-btn" type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              id="submit-form-btn"
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">⏳ Saving...</span>
              ) : isEditing ? (
                "💾 Save Changes"
              ) : (
                "📚 Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
