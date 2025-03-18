import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "./TodoReducer";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
}

interface User {
  email: string;
  name: string;
  role: "admin" | "user";
}

function AllTodos() {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todos: Todo[] = useSelector((state: any) => state.todo.todos || []);

  useEffect(() => {
    const storedUser: User | null = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    setLoggedInUser(storedUser);

    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);

    if (storedUser.role === "admin") {
      let allTodos: Todo[] = [];

      storedUsers.forEach((user) => {
        const userTodos = JSON.parse(localStorage.getItem(`todos_${user.email}`) || "[]");
        allTodos = [...allTodos, ...userTodos];
      });

      dispatch(setTodos(allTodos));
    } else {
      const userTodos = JSON.parse(localStorage.getItem(`todos_${storedUser.email}`) || "[]");
      dispatch(setTodos(userTodos));
    }
  }, [dispatch, navigate]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {loggedInUser?.role === "admin" ? "All Users' Todos" : "My Todos"}
      </h2>

      <button onClick={() => navigate("/User-list")} className="btn btn-secondary mb-3">
        Back to Users
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => {
              const user = users.find((u) => u.email === todo.userId) || {
                name: "Unknown",
                email: "N/A",
                role: "user",
              };

              return (
                <tr key={todo.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "admin" ? "Admin" : "User"}</td>
                  <td>{todo.text}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-3">
                No todos found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllTodos;
