import { useState } from "react";
import api from "../api/axios";

export default function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const statusColor = (status) => {
    if (status === "Resolved") return "#2ecc71";
    if (status === "InProcess") return "#f39c12";
    return "#e74c3c";
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setComplaint(null);
    try {
      const res = await api.get(`/complaints/${complaintId}`);
      setComplaint(res.data);
    } catch (err) {
      setError("Complaint not found. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ color: "#1a5276", textAlign: "center", marginBottom: "8px" }}>Track Complaint</h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: "30px" }}>Enter your complaint ID to check status</p>

        <form onSubmit={handleTrack} style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <input type="text" value={complaintId} onChange={(e) => setComplaintId(e.target.value)} required placeholder="e.g. CMP-001"
              style={{ flex: 1, padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "15px" }} />
            <button type="submit" disabled={loading}
              style={{ padding: "12px 24px", background: "#1a5276", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
              {loading ? "..." : "Track"}
            </button>
          </div>
        </form>

        {error && <div style={{ background: "#fde8e8", color: "#c0392b", padding: "14px", borderRadius: "6px", textAlign: "center" }}>{error}</div>}

        {complaint && (
          <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderTop: `4px solid ${statusColor(complaint.status)}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#2c3e50" }}>{complaint.title}</h3>
              <span style={{ background: statusColor(complaint.status), color: "#fff", padding: "4px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>
                {complaint.status}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <p style={{ margin: "0 0 4px", color: "#888", fontSize: "13px" }}>Complaint ID</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#2c3e50" }}>{complaint.complaintId}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", color: "#888", fontSize: "13px" }}>Category</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#2c3e50" }}>{complaint.category}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", color: "#888", fontSize: "13px" }}>Filed On</p>
                <p style={{ margin: 0, fontWeight: "600", color: "#2c3e50" }}>{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p style={{ margin: "0 0 6px", color: "#888", fontSize: "13px" }}>Description</p>
              <p style={{ margin: 0, color: "#2c3e50", lineHeight: 1.6 }}>{complaint.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
