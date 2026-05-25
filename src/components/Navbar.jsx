import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-icon">📚</span>
          <span className="navbar-title">BookShelf</span>
          <span className="navbar-badge">Manager</span>
        </div>
        <div className="navbar-tagline">Your personal library.</div>
      </div>
    </nav>
  );
}
