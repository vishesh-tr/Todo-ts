import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string; 
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"), 
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos)); 
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos)); 
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string; completed: boolean }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.completed = action.payload.completed; 
        localStorage.setItem("todos", JSON.stringify(state.todos)); 
      }
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed; 
        localStorage.setItem("todos", JSON.stringify(state.todos)); 
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos)); 
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
