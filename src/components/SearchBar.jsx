import React, { useCallback, useRef } from "react";
import { useBooks } from "../context/BooksContext";

export default function SearchBar() {
  const { searchQuery, setSearch } = useBooks();
  const inputRef = useRef(null);

  const handleChange = useCallback(
    (e) => setSearch(e.target.value),
    [setSearch]
  );

  const handleClear = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        id="search-books-input"
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={handleChange}
        aria-label="Search books"
      />
      {searchQuery && (
        <button
          id="clear-search-btn"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
