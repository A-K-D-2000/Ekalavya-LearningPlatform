# 📚 Ekalavya — Learning Tracker Platform

A full-stack web application that helps students save, organize, and track their learning resources in one place.

**Live Demo → [ekalavya-learning-platform.vercel.app](https://ekalavya-learning-platform.vercel.app)**

---

## 🧩 Problem It Solves

Students today use multiple platforms — YouTube, blogs, documentation, shared links — and constantly struggle with:

- Links getting scattered across tabs and bookmarks
- Forgetting which concepts are unresolved
- No structured way to track understanding before exams or interviews

**Ekalavya** solves this by giving students a single place to save resources, set deadlines, and honestly track their clarity level on each topic.

---

## ✨ Features

- 🔐 **Authentication** — Secure register & login with JWT
- 🔗 **Save Any Link** — Add resources with title, notes, priority, and deadline
- 🧠 **Clarity Tracking** — Mark each resource as Confused / Revising / Understood
- 📅 **Deadline Alerts** — Get notified when resources are due or overdue
- 📊 **Learning Analytics** — See your progress stats on your profile page
- 🌙 **Dark / Light Mode** — Theme toggle that persists across sessions
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React.js, Vite, React Router         |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas (cloud)                |
| Auth       | JWT (JSON Web Tokens) + bcryptjs     |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🗂️ Project Structure

```
LearningPlatform/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Navbar, ProtectedRoute
│       └── pages/           # Home, Login, Register, Dashboard, AddItem, Profile
└── server/                  # Node.js + Express backend
    ├── config/              # MongoDB connection
    ├── controllers/         # Auth & learning logic
    ├── middleware/          # JWT auth middleware
    ├── models/              # User & LearningItem schemas
    ├── routes/              # API routes
    └── utils/               # Notification/reminder service
```

---

## 🚀 Run Locally

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/A-K-D-2000/Ekalavya-LearningPlatform.git
cd Ekalavya-LearningPlatform
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the server:

```bash
node server.js
```

### 3. Setup the frontend

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📸 Pages

| Page             | Description                                   |
| ---------------- | --------------------------------------------- |
| Home             | Landing page with project overview            |
| Register / Login | User authentication                           |
| Dashboard        | View all saved resources, edit or delete them |
| Add Item         | Save a new resource link with details         |
| Profile          | View learning analytics and stats             |

---

## 👨‍💻 Developed By

**Team Ekalavya** — Amita Kumari, Mini Project, Semester 6

---
