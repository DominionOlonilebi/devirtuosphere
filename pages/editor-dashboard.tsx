import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Home,
  Settings,
  User,
  Menu,
  X,
  Trash,
  Activity,
  Edit,
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "@/components/user-data";

const EditorDashboard = () => {
  const router = useRouter();
  const [userList, setUserList] = useState(Users); // Manage user state
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Check if the user role is set and redirect if not
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "editor") {
      router.push("/login");
    }
  }, [router]);

  //handle logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Clear the user role from local storage
    router.push("/"); // Redirect to login page
  };

  //sidebar menu collapse
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // EditDashboard.tsx
  const handleEdit = (user) => {
    router.push({
      pathname: `/edit-user/${user.id}`,
      query: { updateUser: true }, // Add a custom query parameter
    });
  };

  //function to delete user data
  const handleDelete = (userToDelete) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userToDelete.name}?`
    );

    if (confirmDelete) {
      setUserList((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete.id)
      );
      console.log("Deleted user:", userToDelete);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 bg-[#4d1441] text-white shadow-md transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static lg:w-64 sm:w-48 overflow-y-auto`}
      >
        <div className="p-5">
          <h1 className="text-xl font-bold">Editor Dashboard</h1>
        </div>
        <nav>
          <ul>
            <li className="px-4 py-1 mb-4 hover:bg-[#583651] flex items-center text-[16px]">
              <Home className="ml-2 w-5" />
              <a href="#">
                <span className="mx-2">Home</span>
              </a>
            </li>
            <li className="px-4 py-1 mb-4 hover:bg-[#583651] flex items-center text-[16px]">
              <User className="ml-2 w-5" />
              <a href="#">
                <span className="mx-2">Products</span>
              </a>
            </li>
            <li className="px-4 py-1 mb-4 hover:bg-[#583651] flex items-center text-[16px]">
              <User className="ml-2 w-5" />
              <a href="#">
                <span className="mx-2">Users</span>
              </a>
            </li>
            <li className="px-4 py-1 mb-4 hover:bg-[#583651] flex items-center text-[16px]">
              <Settings className="ml-2 w-5" />
              <a href="#">
                <span className="mx-2">Settings</span>
              </a>
            </li>
            <li className="px-4 py-1 mb-4 hover:bg-[#583651] flex items-center text-[16px]">
              <ArrowRight className="ml-2 w-5" />
              <button onClick={handleLogout} className="mx-2">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 px-10 py-5 overflow-y-auto">
        <header className="flex items-center justify-between mb-5">
          <div>
            <h2 className="lg:text-2xl sm:text-xl text-[15px] font-semibold">
              Welcome to the Editor Dashboard
            </h2>
            <p className="lg:text-lg sm:text-sm text-[13px]">
              You have full access to manage users and content.
            </p>
          </div>
          <Avatar className="md:flex hidden">
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="text-[#e4c4fd] bg-[#7f4b8a]">
              ED
            </AvatarFallback>
          </Avatar>
          <button
            className="md:hidden p-2 bg-gray-200 rounded"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex flex-wrap lg:flex-row sm:flex-row mb-10">
          <div className="bg-white p-5 lg:w-[300px] sm:w-[175px] w-full m-2 rounded-lg shadow">
            <h3 className="flex items-center justify-between text-md font-medium">
              Total Users <User className="ml-2" />
            </h3>
            <h1 className="lg:text-2xl sm:text-xl text-md font-bold mb-1">
              4,500
            </h1>
            <p className="lg:text-md sm:text-sm text-[14px]">
              +10% from last month
            </p>
          </div>
          <div className="bg-white p-5 lg:w-[300px] sm:w-[175px] w-full m-2 rounded-lg shadow">
            <h3 className="flex items-center justify-between text-md font-medium">
              Active Users <Activity className="ml-2" />
            </h3>
            <h1 className="lg:text-2xl sm:text-xl text-md font-bold mb-1">
              1,200
            </h1>
            <p className="lg:text-md sm:text-sm text-[14px]">
              +40% from last month
            </p>
          </div>
          <div className="bg-white p-5 lg:w-[300px] sm:w-[175px] w-full m-2 rounded-lg shadow">
            <h3 className="flex items-center justify-between text-md font-medium">
              Deleted Users <Trash className="ml-2" />
            </h3>
            <h1 className="lg:text-2xl sm:text-xl text-md font-bold mb-1">
              3,000
            </h1>
            <p className="lg:text-md sm:text-sm text-[14px]">
              +5% from last month
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead>
              <tr>
                <th className="py-4 px-10 text-start">Name</th>
                <th className="py-4 px-10 text-start">Role</th>
                <th className="py-4 px-10 text-start">Email</th>
                <th className="py-4 px-10 text-start">Gender</th>
                <th className="py-4 px-10 text-start">Country</th>
                <th className="py-4 px-10 text-start">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userList.map((info) => (
                <tr key={info.id}>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm">
                    {info.name}
                  </td>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm">
                    {info.role}
                  </td>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm">
                    {info.mail}
                  </td>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm">
                    {info.gender}
                  </td>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm">
                    {info.position}
                  </td>
                  <td className="whitespace-nowrap text-gray-500 px-7 py-4 text-sm flex items-center">
                    <button
                      className="text-[#4d1441] hover:text-[#4d1441] mr-2"
                      onClick={() => handleEdit(info)}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(info)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EditorDashboard;
