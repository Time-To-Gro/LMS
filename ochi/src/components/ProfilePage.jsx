import { useState, useEffect } from "react";
import img from "../assets/images/image.png";
import { checkAuth } from "../api/auth"; // Ensure correct import

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  // Fetch user details from backend
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await checkAuth();
      if (userData) {
        setUser(userData);
        setUpdatedUser(userData);
      } else {
        // If not logged in, set default guest profile
        setUser({
          name: "Guest User",
          email: "guest@example.com",
          bio: "New user, update your profile.",
          profileImage: img,
        });
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Save updated profile (local for now, can be sent to backend)
  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={user.profileImage || img}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* Profile Details */}
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-lg"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
