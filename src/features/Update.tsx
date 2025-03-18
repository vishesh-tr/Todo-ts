import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodos } from "./todo/TodoReducer";
import { useNavigate, useParams } from "react-router-dom";

interface Todo {
  id: number;
  text: string;  
  completed: boolean;
  userId: string;
}

function Todo() {
  const { userId } = useParams<{ userId?: string }>(); 
  const [task, setTask] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
    dispatch(setTodos(storedTodos));
  }, [dispatch]);

  const todos = useSelector((state: { todo: Todo[] }) =>
    state.todo.filter((t) => t.userId === (userId ?? "")) 
  );

  const handleAddOrUpdate = () => {
    if (task.trim()) {
      if (editId) {
        dispatch(updateTodo({ id: editId, text: task, completed: false }));
        setEditId(null);
      } else {
        const newTodo: Todo = { id: Date.now(), text: task, completed: false, userId: userId ?? "" };
        dispatch(addTodo(newTodo));
      }
      setTask("");
    }
  };

  const handleEdit = (todo: Todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <h2>My Todos</h2>
      <button onClick={handleLogout} className="btn btn-danger mb-3">Logout</button>
      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button className="btn btn-primary" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="list-group mt-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.text}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
