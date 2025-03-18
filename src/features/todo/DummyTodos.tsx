import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTodo } from "./TodoReducer";
import Table from "../../Components/organisms/Table";
import Pagination from "../../Components/Pagination";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number | string;
}

const DummyTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todosPerPage: number = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Logged-in User from Local Storage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  // Fetch Dummy Todos from API
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching dummy todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const indexOfLastTodo: number = currentPage * todosPerPage;
  const indexOfFirstTodo: number = indexOfLastTodo - todosPerPage;
  const currentTodos: Todo[] = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages: number = Math.ceil(todos.length / todosPerPage);

  const handleAddToMyTodos = (todo: Todo) => {
    if (!loggedInUser) {
      alert("Please log in first!");
      return;
    }

    let storedTodos = JSON.parse(localStorage.getItem(`todos_${loggedInUser.email}`) || "[]");

    if (storedTodos.some((t: Todo) => t.id === todo.id)) {
      alert("Todo already exists in your list!");
      return;
    }

    const newTodo = { id: todo.id, text: todo.title, completed: todo.completed, userId: loggedInUser.email };

    // Update localStorage
    storedTodos.push(newTodo);
    localStorage.setItem(`todos_${loggedInUser.email}`, JSON.stringify(storedTodos));

    // Dispatch Redux Action
    dispatch(addTodo(newTodo));

    alert("Todo added successfully!");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Dummy Todos</h2>
        <button onClick={() => navigate("/todo")} className="btn btn-secondary">
          Back to Todos
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="table-responsive">
            <Table
              headers={["User ID", "ID", "Title", "Completed", "Actions"]}
              data={currentTodos}
              onAdd={handleAddToMyTodos}
            />
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default DummyTodos;