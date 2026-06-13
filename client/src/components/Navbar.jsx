import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dropdownRef = useRef();

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        📚 <span>Ekalavya</span>
      </Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        {token ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/add" onClick={() => setMenuOpen(false)}>
              Add Item
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>

            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button className="notify-btn" onClick={() => setOpen(!open)}>
                🔔
                {notifications?.due?.length > 0 && (
                  <span className="badge">{notifications.due.length}</span>
                )}
              </button>
              {open && notifications && (
                <div className="dropdown">
                  <p className="dropdown-title">Overdue</p>
                  {notifications.due.length === 0 ? (
                    <p className="dropdown-empty">All clear! 🎉</p>
                  ) : (
                    notifications.due.map((item) => (
                      <p key={item._id} className="dropdown-item">
                        ⚠️ {item.title}
                      </p>
                    ))
                  )}
                  <p className="dropdown-title" style={{ marginTop: "10px" }}>
                    Upcoming
                  </p>
                  {notifications.upcoming.length === 0 ? (
                    <p className="dropdown-empty">Nothing soon</p>
                  ) : (
                    notifications.upcoming.map((item) => (
                      <p key={item._id} className="dropdown-item">
                        ⏳ {item.title}
                      </p>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
