import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "", cnic: "", mobile: "", email: "", password: "", confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateCNIC = (cnic) => {
    return /^\d{5}-\d{7}-\d{1}$/.test(cnic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateCNIC(form.cnic)) {
      return setError("CNIC format must be: #####-#######-#");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    try {
      await axios.post("/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "40px" }}>🇵🇰</div>
          <h2 style={{ color: "#1a5276", margin: "10px 0 5px" }}>Pakistan Citizen Portal</h2>
          <p style={{ color: "#666", margin: 0 }}>Create your account</p>
        </div>

        {error && <div style={{ background: "#fde8e8", color: "#c0392b", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ background: "#d5f5e3", color: "#1e8449", padding: "10px", borderRadius: "6px", marginBottom: "20px", textAlign: "center" }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
            { label: "CNIC", name: "cnic", type: "text", placeholder: "e.g. 12345-1234567-1" },
            { label: "Mobile Number", name: "mobile", type: "text", placeholder: "e.g. 03001234567" },
            { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create a password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", color: "#2c3e50", fontWeight: "500" }}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                placeholder={field.placeholder}
                style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#1a5276", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "600", marginTop: "10px" }}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1a5276", fontWeight: "600" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
