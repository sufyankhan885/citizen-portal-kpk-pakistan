import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchComplaints();
  }, [token]);

  const statusColor = (status) => {
    if (status === "Resolved") return "#2ecc71";
    if (status === "InProcess") return "#f39c12";
    return "#e74c3c";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "30px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#1a5276", margin: 0 }}>My Complaints</h2>
          <Link to="/register-complaint" style={{ background: "#1a5276", color: "#fff", padding: "10px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "600" }}>
            + New Complaint
          </Link>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
        ) : complaints.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <h3 style={{ color: "#1a5276" }}>No complaints yet</h3>
            <p style={{ color: "#666" }}>File your first complaint to get started</p>
            <Link to="/register-complaint" style={{ background: "#1a5276", color: "#fff", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", display: "inline-block", marginTop: "16px" }}>
              File Complaint
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {complaints.map((c) => (
              <div key={c._id} style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${statusColor(c.status)}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: "0 0 6px", color: "#2c3e50" }}>{c.title}</h3>
                    <p style={{ margin: "0 0 8px", color: "#666", fontSize: "14px" }}>{c.description?.substring(0, 100)}...</p>
                    <span style={{ fontSize: "13px", color: "#888" }}>ID: {c.complaintId} • {c.category}</span>
                  </div>
                  <span style={{ background: statusColor(c.status), color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
