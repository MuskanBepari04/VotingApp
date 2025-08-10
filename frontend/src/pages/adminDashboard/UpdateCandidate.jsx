import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateCandidate = () => {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { CandidateID } = useParams();
  const [form, setForm] = useState({ name: "", party: "", age: "" });
  
  useEffect(() => {
    axios
      .get(`${apiUrl}/candidate/${CandidateID}`, config)
      .then((response) => {
        setForm({
          ...form,
          name: response.data.name,
          party: response.data.party,
          age: response.data.age,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${apiUrl}/candidate/update/${CandidateID}`, form, config)
      .then(() => {
        toast.success("Candidate Updated Successfuly");
        navigate("/admin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Update Candidate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              placeholder="Enter Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Party
            </label>
            <input
              type="text"
              value={form.party}
              placeholder="Enter Party"
              onChange={(e) => setForm({ ...form, party: e.target.value })}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">Age</label>
            <input
              type="number"
              value={form.age}
              placeholder="Enter Age"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCandidate;
