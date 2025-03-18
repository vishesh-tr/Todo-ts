import React from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TableProps {
  headers: string[];
  data: Todo[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: (todo: Todo) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, onEdit, onDelete, onAdd }) => {
  return (
    <table className="table table-striped mt-3 w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-black">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border-b">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((todo) => (
          <tr key={todo.id} className="text-center">
            <td className="px-4 py-2 border-b">{todo.userId}</td>
            <td className="px-4 py-2 border-b">{todo.id}</td>
            <td className="px-4 py-2 border-b">{todo.title}</td>
            <td className="px-4 py-2 border-b">{todo.completed ? "True" : "False"}</td>
            <td className="px-4 py-2 border-b">
              <button
                onClick={() => onEdit(todo.id)}
                className="btn btn-warning text-white me-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="btn btn-danger text-white me-2"
              >
                Delete
              </button>
              <button
                onClick={() => onAdd(todo)}
                className="btn btn-success text-white"
              >
                Add
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
