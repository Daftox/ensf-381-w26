import React, { useState, useEffect, createContext } from "react";
import AuthMessage from "./AuthMessage";
import { useNavigate, Link } from "react-router-dom";
export const AuthContext = createContext();

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ⚡ Stop form submission
    if (username === "" || password === "") {
      setStatus({ type: "error", message: "Fields cannot be empty" });
      return;
    }
    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must be at least 8 characters",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);

        setStatus({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          navigate("/flavors");
          window.location.reload();
        }, 2000);
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Could not connect to the backend server.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ status }}>
      <div className="login-form">
        <form>
          <h2 className="login-title">Login</h2>

          <label>Username </label>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <label>Password </label>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit" className="login-button" onClick={handleLogin}>
            Login
          </button>

          <br/>

          <button className="forgot-password">Forgot Password?</button>

          <p style={{ marginTop: "10px" }}>
            Need an account? <Link to="/signup">Sign up</Link>
          </p>

          <AuthMessage />
        </form>
      </div>
    </AuthContext.Provider>
  );
}

export default LoginForm;
