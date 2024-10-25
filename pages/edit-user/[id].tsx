import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Define the User interface
interface UserType {
  id: number; // Ensure this matches your local storage data
  name: string;
  role: string;
  mail: string;
  gender: string;
  position: string;
}

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserType | null>(null); // User type or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u) => u.id === parseInt(id as string));
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User not found");
      }
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  if (user) {
    setUser((prevUser) => ({
      ...prevUser as UserType, // Type assertion here
      [name]: value,
    }));
  }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update local storage with new user data
      console.log("Updated user data:", user);
      router.push("/admin-dashboard"); // Redirect to admin dashboard
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user?.name || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={user?.role || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="mail"
            value={user?.mail || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={user?.gender || ""}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="position"
            value={user?.position || ""}
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
