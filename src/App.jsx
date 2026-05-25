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
            background: "rgba(15, 23, 42, 0.95)",
            color: "#e2e8f0",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "#4ade80", secondary: "#0f172a" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#0f172a" } },
        }}
      />
    </BooksProvider>
  );
}
