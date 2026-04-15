import { useState } from "react";
import { signup } from "../api";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await signup({ email, password });
    if (res.message === "User created") {
      setSuccess("Account created! Redirecting to login...");
      setTimeout(goToLogin, 1500);
    } else {
      const detail = res.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(", "));
      } else {
        setError(detail || "Signup failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Start tracking your finances</p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

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
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">Create Account</button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span className="link" onClick={goToLogin}>Sign In</span>
        </p>
      </form>
    </div>
  );
}
