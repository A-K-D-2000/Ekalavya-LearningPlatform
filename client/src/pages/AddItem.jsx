import { useState } from "react";
import axios from "axios";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [targetDate, setTargetDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/learning",
        {
          title,
          link,
          description,
          priority,
          targetDate, // ✅ DEADLINE SENT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Item added!");

      // reset form
      setTitle("");
      setLink("");
      setDescription("");
      setPriority("Low");
      setTargetDate("");
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>➕ Add Learning Item</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div className="form-group">
          {/* TITLE */}
          <label>Title (optional)</label>
          <input
            placeholder="Title (optional)"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* LINK */}

        <div className="form-group">
          <label>Resource Link</label>
          <input
            placeholder="Link"
            className="input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <input
            placeholder="Description"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* DEADLINE */}
        <div className="form-group">
          <label>Target Date</label>
          <input
            type="date"
            className="input"
            value={targetDate}
            min={new Date().toISOString().split("T")[0]} // 🔥 THIS LINE
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
        {/* PRIORITY */}
        <div className="form-group">
          <label>Priority Level</label>
          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button className="btn">Add Item</button>
      </form>
    </div>
  );
}
