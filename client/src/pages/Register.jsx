import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created! Please sign in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{textAlign:"center", marginBottom:"8px", fontSize:"32px"}}>🚀</div>
        <h2>Create account</h2>
        <p className="auth-subtitle">Start tracking your learning today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your name" value={name}
              onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{width:"100%", marginTop:"8px"}}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{textAlign:"center", marginTop:"20px", fontSize:"14px", color:"var(--text-muted)"}}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}