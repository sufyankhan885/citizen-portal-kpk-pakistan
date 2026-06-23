import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

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

  const updateStatus = async (complaintId, status) => {
    setUpdating(complaintId);
    try {
      await api.patch(`/complaints/${complaintId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(complaints.map((c) =>
        c.complaintId === complaintId ? { ...c, status } : c
      ));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating("");
    }
  };

  const statusColor = (status) => {
    if (status === "Resolved") return "#2ecc71";
    if (status === "InProcess") return "#f39c12";
    return "#e74c3c";
  };

  const stats = {
    total: complaints.length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    inProcess: complaints.filter((c) => c.status === "InProcess").length,
    pending: complaints.filter((c) => c.status === "Pending").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "30px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ color: "#1a5276", marginBottom: "24px" }}>Admin Dashboard</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total", value: stats.total, color: "#1a5276" },
            { label: "Resolved", value: stats.resolved, color: "#2ecc71" },
            { label: "In Process", value: stats.inProcess, color: "#f39c12" },
            { label: "Pending", value: stats.pending, color: "#e74c3c" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", padding: "24px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderTop: `4px solid ${s.color}`, textAlign: "center" }}>
              <p style={{ fontSize: "36px", fontWeight: "700", color: s.color, margin: "0 0 4px" }}>{s.value}</p>
              <p style={{ color: "#666", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #eee" }}>
            <h3 style={{ margin: 0, color: "#2c3e50" }}>All Complaints</h3>
          </div>
          {loading ? (
            <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>Loading...</p>
          ) : complaints.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>No complaints found</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    {["ID", "Title", "Category", "Status", "Date", "Action"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px", color: "#666", fontWeight: "600", borderBottom: "1px solid #eee" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c) => (
                    <tr key={c._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{c.complaintId}</td>
                      <td style={{ padding: "12px 16px", fontWeight: "500", color: "#2c3e50" }}>{c.title}</td>
                      <td style={{ padding: "12px 16px", fontSize: "14px", color: "#666" }}>{c.category}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: statusColor(c.status), color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <select value={c.status} onChange={(e) => updateStatus(c.complaintId, e.target.value)}
                          disabled={updating === c.complaintId}
                          style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}>
                          <option value="Pending">Pending</option>
                          <option value="InProcess">InProcess</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
