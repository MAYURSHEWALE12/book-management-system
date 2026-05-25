import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Normalize database records to ensure both id and _id are defined for absolute robustness
const normalize = (book) => {
  if (!book) return book;
  const id = book.id || book._id;
  return {
    ...book,
    id: id,
    _id: id,
  };
};

export const getBooks = async () => {
  const response = await api.get("/books");
  const data = Array.isArray(response.data) ? response.data : [];
  return data.map(normalize);
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return normalize(response.data);
};

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  // If the API returns an empty response (like CrudCrud PUT), construct a normalized object
  if (!response.data || Object.keys(response.data).length === 0) {
    return normalize({ id, ...bookData });
  }
  return normalize(response.data);
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
