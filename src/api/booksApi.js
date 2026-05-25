import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Normalize crudcrud's _id to id for consistency
const normalize = (book) => {
  if (!book) return book;
  const { _id, ...rest } = book;
  return { id: _id || book.id, ...rest };
};

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data.map(normalize);
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return normalize(response.data);
};

export const updateBook = async (id, bookData) => {
  // crudcrud PUT doesn't return body, so we construct updated obj
  await api.put(`/books/${id}`, bookData);
  return { id, ...bookData };
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
