import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  // State to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} 
      className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input className="w-full p-2 border rounded mb-2" 
        type="email" placeholder="Email" value={email} 
        onChange={(e) => setEmail(e.target.value)} required />

        <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="p-2 rounded-lg border w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 
              transform -translate-y-1/2 bg-gray-200 p-1 
              rounded cursor-pointer"
            >
               {showPassword ? "Hide" : "Show"}
            </button>
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded 
        cursor-pointer font-bold text-2xl hover:bg-blue-400" 
        type="submit">
            Login
        </button>

        {/* Guest login button with pre-filled credentials */}
        <button
            type="button"
            className='bg-green-600 font-bold w-full rounded mt-2 
            cursor-pointer text-white text-2xl hover:bg-green-700 p-2'
            onClick={() => {
                setEmail("lovely@gmail.com");
                setPassword("lovely");
            }}>
                Continue as Guest
        </button>

      </form>
    </div>
  );
};

export default Login;