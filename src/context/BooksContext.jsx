import React, { createContext, useContext, useReducer, useCallback } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "../api/booksApi";
import toast from "react-hot-toast";

const BooksContext = createContext(null);

const initialState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedGenre: "All",
};

function booksReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_BOOKS":
      return { ...state, books: action.payload, loading: false, error: null };
    case "ADD_BOOK":
      return { ...state, books: [action.payload, ...state.books] };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((b) =>
          b.id === action.payload.id ? action.payload : b
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
      };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_GENRE":
      return { ...state, selectedGenre: action.payload };
    default:
      return state;
  }
}

export function BooksProvider({ children }) {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  const fetchBooks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getBooks();
      dispatch({ type: "SET_BOOKS", payload: data });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch books.";
      dispatch({ type: "SET_ERROR", payload: msg });
      toast.error(msg);
    }
  }, []);

  const addBook = useCallback(async (bookData) => {
    const toastId = toast.loading("Adding book...");
    try {
      const newBook = await createBook(bookData);
      dispatch({ type: "ADD_BOOK", payload: newBook });
      toast.success("Book added successfully!", { id: toastId });
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add book.";
      toast.error(msg, { id: toastId });
      return false;
    }
  }, []);

  const editBook = useCallback(async (id, bookData) => {
    const toastId = toast.loading("Updating book...");
    try {
      const updated = await updateBook(id, bookData);
      dispatch({ type: "UPDATE_BOOK", payload: updated });
      toast.success("Book updated successfully!", { id: toastId });
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update book.";
      toast.error(msg, { id: toastId });
      return false;
    }
  }, []);

  const removeBook = useCallback(async (id) => {
    const toastId = toast.loading("Deleting book...");
    try {
      await deleteBook(id);
      dispatch({ type: "DELETE_BOOK", payload: id });
      toast.success("Book deleted.", { id: toastId });
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete book.";
      toast.error(msg, { id: toastId });
      return false;
    }
  }, []);

  const setSearch = useCallback((query) => {
    dispatch({ type: "SET_SEARCH", payload: query });
  }, []);

  const setGenre = useCallback((genre) => {
    dispatch({ type: "SET_GENRE", payload: genre });
  }, []);

  const filteredBooks = state.books.filter((book) => {
    const q = state.searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q);
    const matchesGenre =
      state.selectedGenre === "All" || book.genre === state.selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const value = {
    ...state,
    filteredBooks,
    fetchBooks,
    addBook,
    editBook,
    removeBook,
    setSearch,
    setGenre,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used within BooksProvider");
  return ctx;
}
