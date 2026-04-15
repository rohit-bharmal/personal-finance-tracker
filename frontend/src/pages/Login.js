import { useState } from "react";
import { login } from "../api";

export default function Login({ setToken, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login({ email, password });
    if (res.access_token) {
      localStorage.setItem("token", res.access_token);
      setToken(res.access_token);
    } else {
      setError(res.detail || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your finance tracker</p>

        {error && <div className="error-msg">{error}</div>}

        <label className="field-label">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="field-label">Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">Sign In</button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <span className="link" onClick={goToSignup}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
