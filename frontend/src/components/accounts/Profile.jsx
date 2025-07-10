import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Set initial username from current user
    if (currentUser.displayName) {
      setUsername(currentUser.displayName);
    }

    const fetchData = () => {
      const res = generateAvatar();
      setAvatars(res);
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedAvatar === undefined) {
      return setError("Please select an avatar");
    }

    if (!username.trim()) {
      return setError("Please enter a display name");
    }

    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        displayName: username.trim(),
        photoURL: avatars[selectedAvatar],
      };
      await updateUserProfile(user, profile);
      navigate("/");
    } catch (e) {
      console.error("Profile update error:", e);
      setError("Failed to update profile");
    }
    setLoading(false);
  };

  // Don't render if no current user
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? "border-4 border-blue-700 dark:border-blue-700"
                        : "cursor-pointer hover:border-4 hover:border-blue-700",
                      "block object-cover object-center w-36 h-36 rounded-full"
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md shadow-sm">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating Profile..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}