import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const now = new Date();

  // 🔴 Deadline checker
  const missedDeadline = (item) =>
    item.targetDate && new Date(item.targetDate) < now;

  // 🔴 Due items (review)
  const dueItems = items.filter(
    (item) => item.nextReviewDate && new Date(item.nextReviewDate) <= now,
  );

  // 🟢 Upcoming items
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

      const res = await axios.get("http://localhost:5000/api/learning", {
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

      await axios.delete(`http://localhost:5000/api/learning/${id}`, {
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
    console.log("Sending:", editData);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/learning/${id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ SAFETY CHECK (prevents disappearing card)
      if (!res.data || !res.data._id) {
        console.error("Invalid response:", res.data);
        return;
      }

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

  return (
    <div className="dashboard-container">
      <h2 className="heading">Your Learning Items</h2>

      {/* 🔴 Due Section */}
      {dueItems.length > 0 && (
        <div className="due-box">
          <h3>⚠️ Due Today / Overdue</h3>
          {dueItems.map((item) => (
            <p key={item._id}>🔴 {item.title}</p>
          ))}
        </div>
      )}

      {/* 📭 Empty State */}
      {upcomingItems.length === 0 ? (
        <p className="empty">🎉 You're all caught up!</p>
      ) : (
        <div className="grid">
          {upcomingItems.map((item) => (
            <div
              key={item._id}
              className={`card ${
                dueItems.find((d) => d._id === item._id) || missedDeadline(item)
                  ? "urgent"
                  : ""
              }`}
            >
              {editingId === item._id ? (
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              ) : (
                <h3>{item.title}</h3>
              )}

              {/* 🔗 Link */}
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3b82f6", textDecoration: "none" }}
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");

                    await fetch(
                      `http://localhost:5000/api/learning/${item._id}/visit`,
                      {
                        method: "PUT",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );
                  } catch (err) {
                    console.error("Visit tracking failed", err);
                  }
                }}
              >
                🔗 Open Resource
              </a>

              <div className="info">
                {editingId === item._id ? (
                  <>
                    {/* ✅ EDIT TITLE */}
                    <input
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          title: e.target.value,
                        })
                      }
                      placeholder="Edit title"
                    />

                    {/* ✅ EDIT CLARITY */}
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

                    {/* ✅ EDIT PRIORITY */}
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

                    {/* ✅ EDIT DEADLINE */}
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
                    {/* <p>
                      <strong>Deadline:</strong>{" "}
                      {item.targetDate
                        ? new Date(item.targetDate).toLocaleDateString()
                        : "Not set"}
                    </p> */}
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

                {/* ✅ DEADLINE */}
                <p>
                  <strong>Deadline:</strong>{" "}
                  {item.targetDate
                    ? new Date(item.targetDate).toLocaleDateString()
                    : "Not set"}
                </p>

                {/* 🔥 EXTRA: Deadline warning */}
                {missedDeadline(item) && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    ⚠️ Deadline missed
                  </p>
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
                      targetDate: item.targetDate
                        ? item.targetDate.split("T")[0]
                        : "",
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
