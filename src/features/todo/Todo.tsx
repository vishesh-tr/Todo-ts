import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodos, toggleTodo } from "./TodoReducer";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
}

const Todo: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const storedTodos: Todo[] = JSON.parse(localStorage.getItem(`todos_${user.email}`) || "[]");
    dispatch(setTodos(storedTodos));
  }, [dispatch, navigate]);

  const todos: Todo[] = useSelector((state: any) => state.todo.todos || []);

  const handleAddOrUpdate = () => {
    if (text.trim()) {
      if (editId !== null) {
        dispatch(updateTodo({ id: editId, text, completed: false }));
        setEditId(null);
      } else {
        const newTodo: Todo = { id: Date.now(), text, completed: false, userId: user.email };

        let allTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        allTodos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(allTodos));

        let userTodos: Todo[] = JSON.parse(localStorage.getItem(`todos_${user.email}`) || "[]");
        userTodos.push(newTodo);
        localStorage.setItem(`todos_${user.email}`, JSON.stringify(userTodos));

        dispatch(addTodo(newTodo));
      }
      setText("");
    }
  };

  const handleEdit = (todo: Todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));

    let allTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]").filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(allTodos));
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodo(id));
    let updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));

    let allTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]").map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("todos", JSON.stringify(allTodos));
  };

  return user ? (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Todos</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button className="btn btn-primary ms-2" onClick={handleAddOrUpdate} disabled={!text.trim()}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <tr key={todo.id}>
                <td className="text-center">{index + 1}</td>
                <td style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</td>
                <td className="text-center">
                  <button className={`btn btn-sm me-2 ${todo.completed ? "btn-success" : "btn-warning"}`} onClick={() => handleToggleComplete(todo.id)}>
                    {todo.completed ? "Undo" : "Done"}
                  </button>
                  <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(todo)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={3} className="text-center text-muted py-3">No todos found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Todo;
