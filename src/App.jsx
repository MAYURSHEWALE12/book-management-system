import React from "react";
import { Toaster } from "react-hot-toast";
import { BooksProvider } from "./context/BooksContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BooksProvider>
      <div className="app">
        <Navbar />
        <HomePage />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1c1917",
            border: "1.5px solid #e7e5e0",
            borderRadius: "8px",
            fontSize: "0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          },
          success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
          error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
        }}
      />
    </BooksProvider>
  );
}
