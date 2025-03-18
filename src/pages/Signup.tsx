import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.email === email)) {
      setError("Email already exists! Please login.");
      return;
    }

    const newUser: User = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser)); // Auto-login after signup

    alert("Signup successful! Redirecting to Todo...");
    navigate("/todo");
    window.location.reload(); // Refresh page after navigation
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle bg-light p-5 shadow rounded"
      style={{ width: "600px" }}
    >
      <h2 className="text-center mb-4">Signup</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label className="fw-bold fs-5">Name:</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-success w-100 p-3 fs-5">
          Signup
        </button>
      </form>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <button
          className="btn btn-link p-0 fs-5"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
