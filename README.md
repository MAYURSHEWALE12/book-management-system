# 📚 BookShelf Manager

A modern, full-featured **Book Management System** built with React + Vite. Manage your personal book collection with full CRUD operations, real-time search, genre filtering, and a clean editorial UI.

🔗 **Live Demo**: [https://bookmanagementsystem-virid.vercel.app](https://bookmanagementsystem-virid.vercel.app)

---

## ✨ Features

- 📖 **View** all books in a responsive, animated card grid
- ➕ **Add** new books via a validated modal form
- ✏️ **Edit** any book's details inline
- 🗑️ **Delete** books with a confirmation dialog
- 🔍 **Search** by title or author in real-time
- 🏷️ **Filter** by genre with animated chip buttons
- ⏳ **Loading states** on every async operation
- ⚠️ **Error handling** with retry functionality
- 🍞 **Toast notifications** for all actions
- 📱 **Fully responsive** (mobile → desktop)
- ♿ **Accessible** (ARIA roles, keyboard navigation, focus management)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| State | Context API + useReducer |
| Forms | React Hook Form |
| HTTP | Axios |
| Notifications | React Hot Toast |
| API | MockAPI.io (hosted mock REST API) |
| Styling | Vanilla CSS (clean editorial light theme) |
| Fonts | Google Fonts (Inter + Playfair Display) |
| Deployment | Vercel |

---

## 🚀 Local Setup

### Prerequisites

- Node.js 18+ and npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/book-management-system.git
cd book-management-system

# 2. Install dependencies
npm install

# 3. Set up environment variable
# Create a .env file in the root:
echo "VITE_API_BASE_URL=https://6a14429e6c7db8aac0542924.mockapi.io" > .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 API — MockAPI.io

This project uses [MockAPI.io](https://mockapi.io) as a hosted mock REST API.

**Base URL**: `https://6a14429e6c7db8aac0542924.mockapi.io`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Fetch all books |
| POST | `/books` | Create a new book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

**Book Schema:**
```json
{
  "_id": "string (auto-generated)",
  "title": "string",
  "author": "string",
  "genre": "string",
  "year": "number",
  "description": "string"
}
```

> **Note**: The MockAPI.io endpoint is free and persistent — data does not expire.

---

## 📦 Project Structure

```
src/
├── api/
│   └── booksApi.js          # Axios CRUD functions
├── components/
│   ├── BookCard.jsx          # Individual book card
│   ├── BookForm.jsx          # Add/Edit modal form
│   ├── BookList.jsx          # Responsive book grid
│   ├── SearchBar.jsx         # Real-time search input
│   ├── FilterBar.jsx         # Genre filter chips
│   ├── LoadingSpinner.jsx    # Loading state
│   ├── ErrorMessage.jsx      # Error display + retry
│   ├── ConfirmDialog.jsx     # Delete confirmation
│   └── Navbar.jsx            # Top navigation
├── context/
│   └── BooksContext.jsx      # Global state (Context + useReducer)
├── pages/
│   └── HomePage.jsx          # Main page
├── App.jsx                   # Root component + Toaster
├── main.jsx                  # React entry point
└── index.css                 # Full design system
```

---

## ☁️ Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add environment variable in Vercel:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://6a14429e6c7db8aac0542924.mockapi.io`
4. Click **Deploy** ✅

---

## 📝 Available Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

