import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const now = new Date();

  const missedDeadline = (item) =>
    item.targetDate && new Date(item.targetDate) < now;

  const dueItems = items.filter(
    (item) => item.nextReviewDate && new Date(item.nextReviewDate) <= now,
  );

  const upcomingItems = items
    .filter(
      (item) => item.nextReviewDate && new Date(item.nextReviewDate) > now,
    )
    .sort((a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate));

  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    priority: "",
    clarityLevel: "",
    title: "",
    targetDate: "",
  });

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/learning", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/learning/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(`/learning/${id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data || !res.data._id) return;

      setItems((prev) =>
        prev.map((item) => (item._id === id ? res.data : item)),
      );

      setEditingId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  // ✅ reusable card
  const renderCard = (item, isUrgent = false) => (
    <div key={item._id} className={`card ${isUrgent ? "urgent" : ""}`}>
      {editingId === item._id ? (
        <input
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        />
      ) : (
        <h3>{item.title || "No title"}</h3>
      )}

      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={async () => {
          try {
            const token = localStorage.getItem("token");
            await api.put(
              `/learning/${item._id}/visit`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
          } catch {}
        }}
      >
        🔗 Open Resource
      </a>

      <div className="info">
        <p>
          <strong>Description:</strong> {item.description || "No description"}
        </p>
        {editingId === item._id ? (
          <>
            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <select
              value={editData.clarityLevel}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  clarityLevel: e.target.value,
                })
              }
            >
              <option value="Confused">Confused</option>
              <option value="Understood">Understood</option>
              <option value="Revising">Revising</option>
            </select>

            <select
              value={editData.priority}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  priority: e.target.value,
                })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              value={editData.targetDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  targetDate: e.target.value,
                })
              }
            />
          </>
        ) : (
          <>
            <p>
              <strong>Clarity:</strong> {item.clarityLevel}
            </p>
            <p>
              <strong>Priority:</strong> {item.priority}
            </p>
          </>
        )}

        <p>
          <strong>Visits:</strong> {item.visitCount}
        </p>

        <p>
          <strong>Next Review:</strong>{" "}
          {item.nextReviewDate
            ? new Date(item.nextReviewDate).toLocaleDateString()
            : "Not set"}
        </p>

        <p>
          <strong>Deadline:</strong>{" "}
          {item.targetDate
            ? new Date(item.targetDate).toLocaleDateString()
            : "Not set"}
        </p>

        {missedDeadline(item) && (
          <p style={{ color: "red", fontWeight: "bold" }}>⚠️ Deadline missed</p>
        )}
      </div>

      <div className="buttonGroup">
        <button
          className="button delete"
          onClick={() => handleDelete(item._id)}
        >
          Delete
        </button>

        <button
          className="button edit"
          onClick={() => {
            setEditingId(item._id);
            setEditData({
              priority: item.priority,
              clarityLevel: item.clarityLevel,
              title: item.title,
              targetDate: item.targetDate ? item.targetDate.split("T")[0] : "",
            });
          }}
        >
          Edit
        </button>

        {editingId === item._id && (
          <button
            className="button save"
            onClick={() => handleUpdate(item._id)}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <h2 className="heading">Your Learning Items</h2>

      {/* 🔴 OVERDUE */}
      <h3>⚠️ Overdue / Due</h3>
      {dueItems.length === 0 ? (
        <p>No overdue items 🎉</p>
      ) : (
        <div className="grid">
          {dueItems.map((item) => renderCard(item, true))}
        </div>
      )}

      {/* 🟢 UPCOMING */}
      <h3 style={{ marginTop: "20px" }}>📅 Upcoming</h3>
      {upcomingItems.length === 0 ? (
        <p className="empty">No upcoming items</p>
      ) : (
        <div className="grid">
          {upcomingItems.map((item) => renderCard(item))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
