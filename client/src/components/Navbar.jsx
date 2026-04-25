import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(); // ✅ for outside click

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(res.data);
    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, [token]);

  // ✅ CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add">Add Item</Link>
          <Link to="/profile">Profile</Link>

          {/* 🔔 WRAPPED IN REF */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className="notify-btn"
              onClick={() => setOpen(!open)}
            >
              🔔
              {notifications?.due?.length > 0 && (
                <span className="badge">
                  {notifications.due.length}
                </span>
              )}
            </button>

            {/* 🔽 DROPDOWN */}
            {open && notifications && (
              <div className="dropdown">
                <h4>Due</h4>

                {notifications.due.length === 0 ? (
                  <p>No due items</p>
                ) : (
                  notifications.due.map((item) => (
                    <p key={item._id}>⚠️ {item.title}</p>
                  ))
                )}

                <h4>Upcoming</h4>

                {notifications.upcoming.length === 0 ? (
                  <p>No upcoming items</p>
                ) : (
                  notifications.upcoming.map((item) => (
                    <p key={item._id}>⏳ {item.title}</p>
                  ))
                )}
              </div>
            )}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;