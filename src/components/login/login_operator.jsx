import React, { useState } from "react";
import "./login.css";
import LetterGlitch from "./LetterGlitch";

const API_BASE_URL = "http://localhost:3000"; // 🔁 change if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");

    // basic validation
    if (!email || !password || !role) {
      setError("Please fill email, password and select a role.");
      return;
    }

    // pick correct endpoint based on role
    const endpoint =
      role === "operator"
        ? `${API_BASE_URL}/api/login/operator`
        : `${API_BASE_URL}/api/login/spotter`;

    try {
      setLoading(true);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Backend expects { emailAddress, password }
        body: JSON.stringify({
          emailAddress: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend sends { error: "..." }
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Save token if present
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", role);
        // you can also store operator/spotter data if needed
        if (data.operator) {
          localStorage.setItem("userData", JSON.stringify(data.operator));
        }
        if (data.spotter) {
          localStorage.setItem("userData", JSON.stringify(data.spotter));
        }
      }

      console.log("Login successful:", data);

      // TODO: navigate to dashboard based on role
      // e.g. window.location.href = role === "operator" ? "/operator-dashboard" : "/spotter-dashboard";
    } catch (err) {
      console.error("Login request error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="logo">CATERPILLAR®</div>

          <h1 className="welcome-text">Welcome back</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input form-select"
              >
                <option value="">Select a role</option>
                <option value="spotter">Spotter</option>
                <option value="operator">Operator</option>
              </select>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
