import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";

function Profile() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/learning/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("ANALYTICS ERROR:", err);
      }
    };

    fetchProfile();
    fetchAnalytics();
  }, []);

  if (!data || !stats) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>

      <div className="profile-email-card">
        <div className="profile-avatar">👤</div>
        <div>
          <h3>{data.email}</h3>
          <p>
            {stats.total} resource{stats.total !== 1 ? "s" : ""} saved ·{" "}
            {data.totalVisits} total visits
          </p>
        </div>
      </div>

      <p className="analytics-title">Learning Analytics</p>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: "var(--primary)" }}>
            {stats.understood}
          </div>
          <div className="stat-label">Understood</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: "var(--accent)" }}>
            {stats.revising}
          </div>
          <div className="stat-label">Revising</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: "var(--danger)" }}>
            {stats.confused}
          </div>
          <div className="stat-label">Confused</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: "var(--text-muted)" }}>
            {stats.notVisited}
          </div>
          <div className="stat-label">Not Visited</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{data.totalVisits}</div>
          <div className="stat-label">Total Visits</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
