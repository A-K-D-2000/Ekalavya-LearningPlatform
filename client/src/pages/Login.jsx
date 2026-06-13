import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{textAlign:"center", marginBottom:"8px", fontSize:"32px"}}>📚</div>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Sign in to continue learning</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@email.com" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{width:"100%", marginTop:"8px"}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{textAlign:"center", marginTop:"20px", fontSize:"14px", color:"var(--text-muted)"}}>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}