import React from "react";
import { useBooks } from "../context/BooksContext";

const GENRES = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Mystery", "Romance", "Thriller", "Fantasy"];

export default function FilterBar() {
  const { selectedGenre, setGenre, books } = useBooks();

  const getCount = (genre) => {
    if (genre === "All") return books.length;
    return books.filter((b) => b.genre === genre).length;
  };

  return (
    <div className="filter-bar" role="group" aria-label="Filter by genre">
      {GENRES.map((genre) => {
        const count = getCount(genre);
        if (genre !== "All" && count === 0) return null;
        return (
          <button
            key={genre}
            id={`filter-${genre.toLowerCase().replace(/[^a-z]/g, "-")}`}
            className={`filter-chip ${selectedGenre === genre ? "active" : ""}`}
            onClick={() => setGenre(genre)}
            aria-pressed={selectedGenre === genre}
          >
            {genre}
            <span className="filter-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
