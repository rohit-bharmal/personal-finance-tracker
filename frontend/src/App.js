import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return page === "login" ? (
      <Login setToken={setToken} goToSignup={() => setPage("signup")} />
    ) : (
      <Signup goToLogin={() => setPage("login")} />
    );
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}

export default App;
