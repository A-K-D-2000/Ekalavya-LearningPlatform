import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("PROFILE DATA:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err);
      }
    };
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/learning/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("ANALYTICS:", res.data);
        setStats(res.data);
      } catch (err) {
        console.error("ANALYTICS ERROR:", err);
      }
    };

    fetchProfile();
    fetchAnalytics();
  }, []);

  if (!data || !stats) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Profile</h2>
      </div>

      {/* User Info */}
      <div className="profile-card">
        <div className="profile-row">
          <span className="label">Email</span>
          <span className="value">{data.email}</span>
        </div>
      </div>

      {/* Stats Section */}
      {/* Stats Section */}
      <div className="profile-section">
        <h3 className="section-title">Your Learning Analytics</h3>

        <div className="stats-container">
          <div className="stat-box">
            <p className="stat-value">{stats.total}</p>
            <p className="stat-label">Total Topics</p>
          </div>

          <div className="stat-box">
            <p className="stat-value">{stats.understood}</p>
            <p className="stat-label">Understood</p>
          </div>

          <div className="stat-box">
            <p className="stat-value">{stats.confused}</p>
            <p className="stat-label">Confused</p>
          </div>
        </div>

        <div className="stats-container" style={{ marginTop: "15px" }}>
          <div className="stat-box">
            <p className="stat-value">{stats.revising}</p>
            <p className="stat-label">Revising</p>
          </div>

          <div className="stat-box">
            <p className="stat-value">{stats.notVisited}</p>
            <p className="stat-label">Not Visited</p>
          </div>

          <div className="stat-box">
            <p className="stat-value">{stats.totalVisits}</p>
            <p className="stat-label">Total Visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
