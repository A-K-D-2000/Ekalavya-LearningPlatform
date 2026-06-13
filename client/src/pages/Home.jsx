import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-badge">✦ Your Personal Learning OS</div>
        <h1 className="home-title">
          Track what you learn.
          <br />
          <span className="home-accent">Never forget</span> what matters.
        </h1>
        <p className="home-subtitle">
          Save links, set deadlines, track your clarity — all in one place.
          Built for students who take learning seriously.
        </p>
        <div className="home-actions">
          {token ? (
            <Link to="/dashboard" className="btn">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Save Any Link</h3>
          <p>
            YouTube videos, blogs, docs — paste a link and it's tracked
            instantly.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Set Deadlines</h3>
          <p>
            Add a target date and get notified when resources are due for
            review.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Track Clarity</h3>
          <p>
            Mark resources as Confused, Revising, or Understood as you progress.
          </p>
        </div>
      </div>
    </div>
  );
}
