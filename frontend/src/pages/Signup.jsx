import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    aadharCardNumber: "",
    role: "",
  });

  const handeleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, form);
      console.log("Signup successful:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/auth/login");
    } catch (err) {
      console.error(
        "Signup error:",
        err.response?.data?.message || err.message
      );
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl p-6 md:p-10">
        <div className="md:w-1/2 max-h-3/4 mb-6 md:mb-0">
          <img
            src="../images/signup.jpg"
            alt="Signup Illustration"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="md:w-1/2 w-full px-2 md:px-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Create an Account
          </h2>

          <form onSubmit={handeleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-green-800 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="age" className="text-green-800 font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                placeholder="Enter Age"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-green-800 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-green-800 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="mobile"
                className="text-green-800 font-medium mb-1"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter Mobile"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-green-800 font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="aadharCard"
                className="text-green-800 font-medium mb-1"
              >
                Aadhar Card
              </label>
              <input
                type="text"
                id="aadharCard"
                placeholder="Enter Aadhar Card"
                onChange={(e) =>
                  setForm({ ...form, aadharCardNumber: e.target.value })
                }
                className="border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-green-800 font-medium mb-2">Role</label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="voter"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="accent-green-600 w-4 h-4"
                  />
                  <span className="text-gray-700">Voter</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="accent-green-600 w-4 h-4"
                  />
                  <span className="text-gray-700">Admin</span>
                </label>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-green-700 font-semibold hover:underline ml-1"
              >
                Login
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 text-lg font-semibold"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
