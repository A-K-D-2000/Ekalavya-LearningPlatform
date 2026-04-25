import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>Ekalavya: Learning Tracker</h1>
        <p style={{ marginBottom: "20px" }}>
          Save links, track your learning, and never forget what you studied.
        </p>

        {!token ? (
          <>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="btn-outline" style={{ marginLeft: "10px" }}>
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <p style={{ marginTop: "10px", fontWeight: "500" }}>
              Welcome back 👋
            </p>

            <Link to="/dashboard">
              <button className="btn" style={{ marginTop: "15px" }}>
                Go to Dashboard
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;