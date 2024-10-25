import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //login data
  const mockCredentials = {
    admin: { username: "admin", password: "admin123" },
    editor: { username: "editor", password: "editor123" },
    viewer: { username: "viewer", password: "viewer123" },
  };

  //handles error
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //authentication and form validation
    for (const [role, creds] of Object.entries(mockCredentials)) {
      if (username === creds.username && password === creds.password) {
        localStorage.setItem("userRole", role);
        router.push(`/${role}-dashboard`);
        return;
      }
    }
    setError("Invalid credentials");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen ">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="my-10 text-center text-[#4d1441] uppercase font-medium">
            Login
          </h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-lg appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#4d1441] hover:bg-[#4d1441] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
