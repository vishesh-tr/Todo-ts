import { useState } from "react";
import ProfileModal from "../organisms/ProfileModal";
import DropdownMenu from "../molecules/DropdownMenu";

interface User {
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

interface NavbarProps {
  user: User | null;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, handleLogout }) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const appTitle = user
    ? `Todo App (${user.role === "admin" ? "Admin" : "User"})`
    : "Todo App";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fs-5">{appTitle}</span>

        {user && (
          <DropdownMenu
            user={user}
            userImage={user.avatar || "/default-user.png"}
            handleLogout={handleLogout}
            setProfileOpen={setProfileOpen}
          />
        )}
      </div>

      {profileOpen && user && (
        <ProfileModal
          user={user}
          userImage={user.avatar || "/default-user.png"}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
