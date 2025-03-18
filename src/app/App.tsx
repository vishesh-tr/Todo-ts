import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../Route/ProtectedRoute";
import Navbar from "../Components/organisms/Navbar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Todo from "../features/todo/Todo";
import TodoAuth from "../features/TodoAuth";
import UserList from "../features/user/UserList";
import DummyTodos from "../features/todo/DummyTodos";
import EditProfile from "../Components/EditProfile";
import AllTodos from "../features/todo/AllTodos";

// Avatar images array
const avatarArray = [
  new URL("../assets/vishesh.png", import.meta.url).href,
  new URL("../assets/user.png", import.meta.url).href,
  new URL("../assets/user1.png", import.meta.url).href,
  new URL("../assets/user2.png", import.meta.url).href,
  new URL("../assets/user3.png", import.meta.url).href,
  new URL("../assets/user4.png", import.meta.url).href,
];


const avatars: { [key: string]: string } = avatarArray.reduce((acc, url, index) => {
  acc[`user${index}`] = url; // Assigning keys like user0, user1, etc.
  return acc;
}, {} as { [key: string]: string });

interface User {
  email: string;
  role: "user" | "admin";
  name: string;
  password: string;
  avatar?: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  //  Hide Navbar on Login & Signup Pages
  const hideNavbarOnPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarOnPages.includes(location.pathname);

  return (
    <div className="w-full h-screen">
      {/* Conditionally Render Navbar */}
      {showNavbar && <Navbar user={user} handleLogout={handleLogout} />}

      {/* Routes Configuration */}
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
        <Route path="/todo-auth/:userId" element={<ProtectedRoute><TodoAuth /></ProtectedRoute>} />
        <Route path="/User-list" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/dummy-todos" element={<ProtectedRoute><DummyTodos /></ProtectedRoute>} />
        <Route path="/all-todos" element={<ProtectedRoute><AllTodos /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile avatars={avatars} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
