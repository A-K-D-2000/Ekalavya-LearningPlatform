import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [targetDate, setTargetDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post("/learning",
        { title, link, description, priority, targetDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div style={{maxWidth:"560px", margin:"0 auto"}}>
        <h2 style={{marginBottom:"6px"}}>Add Learning Resource</h2>
        <p style={{color:"var(--text-muted)", marginBottom:"28px", fontSize:"14px"}}>
          Save a link and set your learning goal for it.
        </p>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Resource Link *</label>
              <input placeholder="https://..." value={link}
                onChange={e => setLink(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Title (optional)</label>
              <input placeholder="Give it a short name" value={title}
                onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <input placeholder="Why are you saving this?" value={description}
                onChange={e => setDescription(e.target.value)} />
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px"}}>
              <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Target Date</label>
                <input type="date" value={targetDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={e => setTargetDate(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn" style={{width:"100%", marginTop:"8px"}}>
              {loading ? "Saving..." : "Save Resource"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}