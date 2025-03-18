import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/user/UserSlice";

interface Props {
  avatars: { [key: string]: string };
}

const EditProfile: React.FC<Props> = ({ avatars }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}") || {};

  const [name, setName] = useState<string>(loggedInUser.name || "");
  const [email, setEmail] = useState<string>(loggedInUser.email || "");
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [image, setImage] = useState<string>(loggedInUser.avatar || "/default-user.png");

  // Sync profile image with localStorage
  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedImage = avatars[e.target.value];
    setImage(selectedImage);

    // Update user avatar in localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]") || [];
    const userIndex = savedUsers.findIndex((user: { email: string }) => user.email === loggedInUser.email);

    if (userIndex !== -1) {
      savedUsers[userIndex].avatar = selectedImage;
      loggedInUser.avatar = selectedImage;

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("users", JSON.stringify(savedUsers));
    }
  };

  // Handle updates for name, email, and password
  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>, field: string) => {
    e.preventDefault();

    if (field === "password" && oldPassword !== loggedInUser.password) {
      alert("Incorrect old password!");
      return;
    }

    const updatedUser = { ...loggedInUser };
    if (field === "name") updatedUser.name = name;
    if (field === "email") updatedUser.email = email;
    if (field === "password") updatedUser.password = password;

    dispatch(updateUser(updatedUser));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");

    // Redirect after update
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Edit Profile</h2>

        <div className="text-center">
          <img
            src={image}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>

        <form>
          {/* Profile Picture Selection */}
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <select
              className="form-control"
              value={Object.keys(avatars).find((key) => avatars[key] === image) || ""}
              onChange={handleImageChange}
            >
              {Object.keys(avatars).map((key) => (
                <option key={key} value={key}>
                  {key}.png
                </option>
              ))}
            </select>
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "name")}>
              Update Name
            </button>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "email")}>
              Update Email
            </button>
          </div>

          {/* Old Password Input */}
          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* New Password Input */}
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-2 w-100" onClick={(e) => handleUpdate(e, "password")}>
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
