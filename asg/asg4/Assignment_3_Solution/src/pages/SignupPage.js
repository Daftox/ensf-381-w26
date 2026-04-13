import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link pour le bouton Signup
import Header from "../components/Header";
import Footer from "../components/Footer";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match!" });
      return;
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    if (!usernameRegex.test(formData.username)) {
      setStatus({ 
        type: "error", 
        message: "Username must be 3-20 characters and start with a letter." 
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character.",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Registration successful! Redirecting to login...",
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Error connecting to server." });
    }
  };

  return (
    <>
      <Header />
      <main className="main-section">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h2 className="login-title">Create an Account</h2>

            <label>Username</label>
            <br />
            <input
              className="login-input"
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <br />
            <br />

            <label>Email</label>
            <br />
            <input
              className="login-input"
              type="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <br />
            <br />

            <label>Password</label>
            <br />
            <input
              className="login-input"
              type="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <br />
            <br />

            <label>Confirm Password</label>
            <br />
            <input
              className="login-input"
              type="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <br />
            <br />

            <button type="submit" className="login-button">
              Sign Up
            </button>

            <p style={{ marginTop: "10px" }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>

            {status.message && (
              <p
                style={{
                  color: status.type === "success" ? "green" : "red",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignupPage;
