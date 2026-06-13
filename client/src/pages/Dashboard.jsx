import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Dashboard.css";

const clarityTag = (level) => {
  const map = {
    Confused: "tag tag-confused",
    Revising: "tag tag-revising",
    Understood: "tag tag-understood",
  };
  return <span className={map[level] || "tag"}>{level}</span>;
};

const priorityColor = { High: "#EF4444", Medium: "#F59E0B", Low: "#94A3B8" };

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ priority: "", clarityLevel: "", title: "", targetDate: "" });
  const now = new Date();

  const missedDeadline = (item) => item.targetDate && new Date(item.targetDate) < now;
  const dueItems = items.filter(item => item.nextReviewDate && new Date(item.nextReviewDate) <= now);
  const upcomingItems = items
    .filter(item => item.nextReviewDate && new Date(item.nextReviewDate) > now)
    .sort((a, b) => new Date(a.nextReviewDate) - new Date(b.nextReviewDate));

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/learning", { headers: { Authorization: `Bearer ${token}` } });
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/learning/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) { console.error("Delete failed:", err); }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(`/learning/${id}`, editData, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.data?._id) return;
      setItems(prev => prev.map(item => item._id === id ? res.data : item));
      setEditingId(null);
    } catch (err) { console.error("Update failed:", err); }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    fetchItems();
  }, []);

  if (loading) return <p className="loading">Loading your resources...</p>;

  const renderCard = (item, isUrgent = false) => (
    <div key={item._id} className={`card ${isUrgent ? "urgent" : ""}`}>
      {editingId === item._id ? (
        <input className="input" value={editData.title}
          onChange={e => setEditData({ ...editData, title: e.target.value })}
          style={{marginBottom:"10px"}} />
      ) : (
        <h3>{item.title || "Untitled Resource"}</h3>
      )}

      <a href={item.link} target="_blank" rel="noreferrer"
        onClick={async () => {
          try {
            const token = localStorage.getItem("token");
            await api.put(`/learning/${item._id}/visit`, {}, { headers: { Authorization: `Bearer ${token}` } });
          } catch {}
        }}>
        🔗 Open Resource
      </a>

      <div className="info">
        {item.description && <p><strong>Notes:</strong> {item.description}</p>}

        {editingId === item._id ? (
          <>
            <div className="form-group" style={{marginBottom:"8px"}}>
              <label>Clarity</label>
              <select value={editData.clarityLevel}
                onChange={e => setEditData({ ...editData, clarityLevel: e.target.value })}>
                <option value="Confused">Confused</option>
                <option value="Revising">Revising</option>
                <option value="Understood">Understood</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:"8px"}}>
              <label>Priority</label>
              <select value={editData.priority}
                onChange={e => setEditData({ ...editData, priority: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:"8px"}}>
              <label>Target Date</label>
              <input type="date" value={editData.targetDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => setEditData({ ...editData, targetDate: e.target.value })} />
            </div>
          </>
        ) : (
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap", margin:"10px 0"}}>
            {clarityTag(item.clarityLevel)}
            <span className="tag" style={{background:"var(--bg-subtle)", color: priorityColor[item.priority]}}>
              {item.priority} Priority
            </span>
          </div>
        )}

        <p><strong>Visits:</strong> {item.visitCount || 0}</p>
        {item.targetDate && (
          <p><strong>Deadline:</strong> {new Date(item.targetDate).toLocaleDateString()}</p>
        )}
        {missedDeadline(item) && (
          <span className="missed-label">⚠️ Deadline missed</span>
        )}
      </div>

      <div className="buttonGroup">
        <button className="button delete" onClick={() => handleDelete(item._id)}>Delete</button>
        <button className="button edit" onClick={() => {
          setEditingId(item._id);
          setEditData({
            priority: item.priority,
            clarityLevel: item.clarityLevel,
            title: item.title || "",
            targetDate: item.targetDate ? item.targetDate.split("T")[0] : "",
          });
        }}>Edit</button>
        {editingId === item._id && (
          <button className="button save" onClick={() => handleUpdate(item._id)}>Save</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Resources</h2>
        <p>{items.length} resource{items.length !== 1 ? "s" : ""} saved</p>
      </div>

      <div className="section-header">
        <span>⚠️</span>
        <h3>Overdue / Due</h3>
      </div>
      {dueItems.length === 0
        ? <div className="empty-state"><div className="emoji">🎉</div><p>No overdue items</p></div>
        : <div className="grid">{dueItems.map(item => renderCard(item, true))}</div>}

      <div className="section-header">
        <span>📅</span>
        <h3>Upcoming</h3>
      </div>
      {upcomingItems.length === 0
        ? <div className="empty-state"><div className="emoji">✨</div><p>Nothing upcoming</p></div>
        : <div className="grid">{upcomingItems.map(item => renderCard(item))}</div>}
    </div>
  );
};

export default Dashboard;