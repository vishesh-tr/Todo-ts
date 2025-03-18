import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./user/UserSlice";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  image: string;
}

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: any) => state.user.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (users.some((user: User) => user.email === email)) {
      alert("Email already exists!");
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      role: isAdmin ? "admin" : "user", 
      image: image || "default-user.png",
    };

    dispatch(addUser(newUser));

    
    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    alert("User created successfully!");
    navigate("/User-list");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Create New User</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Image URL</label>
          <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL (optional)" />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          <label className="form-check-label">Admin Role</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Create User</button>
      </form>
    </div>
  );
}

export default Create;
