import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "./UserSlice";
import { User } from "./Types"; 

const Users: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser: User | null = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (!loggedInUser || loggedInUser.role !== "admin") {
      navigate("/todo");
    } else {
      setIsAdmin(true);
      const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]").map((user: User) => ({
        ...user,
        role: user.role || "user", 
      }));
      setUsers(storedUsers);
    }
  }, [navigate]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  return isAdmin ? (
    <div className="w-full">
      <h2 className="text-center mb-4">Users List</h2>

      <button onClick={() => navigate("/all-todos")} className="btn btn-secondary mb-3">
        View All Todos
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={user.role === "admin" ? "text-danger font-weight-bold" : "text-success font-weight-bold"}>
                  {user.role}
                </td>
                <td>
                  {user.role !== "admin" ? (
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-3">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Users;
