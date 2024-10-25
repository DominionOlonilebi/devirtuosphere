import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find((u) => u.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User not found");
      }
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update local storage with new user data
    console.log("Updated user data:", user);
    router.push("/admin-dashboard"); // Redirect to admin dashboard
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="mail"
            value={user.mail}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="position"
            value={user.position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4d1441] text-white p-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;
