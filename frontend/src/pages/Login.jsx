cat > frontend/src/pages/Login.jsx << 'EOF'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "40px" }}>🇵🇰</div>
          <h2 style={{ color: "#1a5276", margin: "10px 0 5px" }}>Pakistan Citizen Portal</h2>
          <p style={{ color: "#666", margin: 0 }}>Login to your account</p>
        </div>
        {error && (
          <div style={{ background: "#fde8e8", color: "#c0392b", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email"
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Enter your password"
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
          </div>
          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <Link to="/forgot-password" style={{ color: "#1a5276", fontSize: "13px" }}>Forgot Password?</Link>
          </div>
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#1a5276", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "600" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1a5276", fontWeight: "600" }}>Register</Link>
        </p>
      </div>
    </div>
  );
}
EOF
