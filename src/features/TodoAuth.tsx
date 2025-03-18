import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TodoAuth() {
  const { userId } = useParams<{ userId?: string }>(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users: { id: number; email: string; password: string }[] = JSON.parse(localStorage.getItem("users") || "[]");
    const parsedUserId = parseInt(userId ?? "0"); 

    const user = users.find((u) => u.id === parsedUserId && u.email === email && u.password === password);

    if (user) {
      navigate(`/todo/${parsedUserId}`); 
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Credentials to View Todos</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Verify & Continue</button>
      </form>
    </div>
  );
}

export default TodoAuth;
