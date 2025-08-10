import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";
import toast from "react-hot-toast";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    aadharCardNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUserInfo } = useContext(userContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${apiUrl}/auth/login`, form);
      setUserInfo(response.data.data);
      localStorage.setItem("token", response.data.token);
      if (response.data.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-4xl p-6 md:p-10">
        <div className="w-1/2 hidden md:block">
          <img
            src="../images/login.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-green-800 font-medium mb-1">
                Aadhar Card No:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Aadhar Number"
                onChange={(e) =>
                  setForm({ ...form, aadharCardNumber: e.target.value })
                }
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="age" className="text-green-800 font-medium mb-1">
                Password:
              </label>
              <input
                type="password"
                id="age"
                placeholder="Enter Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="text-sm text-gray-600">
              Don’t have an account?
              <Link
                to="/auth/signup"
                className="text-green-700 font-semibold hover:underline ml-1"
              >
                Create Account
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
