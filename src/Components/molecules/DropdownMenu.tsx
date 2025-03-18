import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

interface DropdownMenuProps {
  user: User;
  userImage: string;
  setProfileOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  user,
  userImage,
  handleLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="position-relative">
      <button
        className="btn btn-secondary d-flex align-items-center"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={userImage || "/default-avatar.png"}
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px" }}
        />
        Profile
      </button>

      {dropdownOpen && (
        <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow bg-white rounded">
          {/* "Edit Profile" Button */}
          <button className="dropdown-item" onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>

          {/* "All Todos" Button */}
          {user.role === "admin" && (
            <button className="dropdown-item" onClick={() => navigate("/all-todos")}>
              All Todos
            </button>
          )}

          {/* "Dummy Todos" Button */}
          <button className="dropdown-item" onClick={() => navigate("/dummy-todos")}>
            Dummy Todos
          </button>

          {/* "Users" Button (Visible only to Admin) */}
          {user.role === "admin" && (
            <button className="dropdown-item" onClick={() => navigate("/User-list")}>
              User
            </button>
          )}

          <div className="dropdown-divider"></div>

          {/* Logout Button */}
          <button onClick={handleLogout} className="dropdown-item text-danger">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
