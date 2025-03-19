import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const users: Array<{ email: string; password: string }> = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password!"); 
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful! Redirecting...");
    navigate("/todo");
    window.location.reload(); // Refresh page after navigation
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle bg-light p-5 shadow rounded"
      style={{ width: "600px" }}
    >
      <h2 className="text-center mb-4">Login</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="fw-bold fs-5">Email:</label>
          <input
            type="email"
            className="form-control p-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="fw-bold fs-5">Password:</label>
          <input
            type="password"
            className="form-control p-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 p-3 fs-5">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <button
          className="btn btn-link p-0 fs-5"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;
                