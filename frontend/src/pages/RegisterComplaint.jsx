import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function RegisterComplaint() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Police", "Health", "Education", "Electricity", "Water", "Other"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/complaints", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(`Complaint filed! ID: ${res.data.complaintId}`);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px 20px" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: "560px" }}>
        <h2 style={{ color: "#1a5276", marginBottom: "8px" }}>Register Complaint</h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>Fill in the details below to file your complaint</p>

        {error && <div style={{ background: "#fde8e8", color: "#c0392b", padding: "10px", borderRadius: "6px", marginBottom: "20px" }}>{error}</div>}
        {success && <div style={{ background: "#d5f5e3", color: "#1e8449", padding: "10px", borderRadius: "6px", marginBottom: "20px" }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Brief title of your complaint"
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe your complaint in detail..." rows={5}
              style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box", resize: "vertical" }} />
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#1a5276", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "600" }}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
