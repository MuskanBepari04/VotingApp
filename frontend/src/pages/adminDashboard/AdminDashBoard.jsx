import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashBoard = () => {
  const [candidateList, setCandidateList] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/candidate`)
      .then((response) => {
        setCandidateList(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="mb-6">
          <Link
            to={"/admin/add"}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Add Candidate
          </Link>
        </div>

        <div className="space-y-6">
          {candidateList.map((value, index) => (
            <div
              key={index}
              className="bg-green-100 p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-green-900">
                  {value.name}
                </p>
                <p className="text-sm text-gray-700">{value.party}</p>
              </div>

              <div className="space-x-3">
                <Link
                  to={`/admin/update/${value._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Update
                </Link>
                <Link
                  to={`/admin/delete/${value._id}`}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
