import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VoteCount = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [voteList, setVoteList] = useState([]);
  useEffect(() => {
    axios
      .get(`${apiUrl}/voting/count`)
      .then((response) => {
        console.log(response.data);
        setVoteList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Live Vote Count</h1>
        <Link
          to="/profile"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Back to Profile
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full bg-white rounded-xl shadow-lg border border-green-200">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="py-3 px-4">Sr.No</th>
              <th className="py-3 px-4">Candidate Name</th>
              <th className="py-3 px-4">Party</th>
              <th className="py-3 px-4">Votes</th>
              <th className="py-3 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {voteList.map((value, index) => (
              <tr
                key={index}
                className="border-b border-green-100 hover:bg-green-50 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-semibold text-green-800">
                  {value.name}
                </td>
                <td className="py-3 px-4 text-green-600">{value.party}</td>
                <td className="py-3 px-4">
                  <img
                    src={`${apiUrl}/uploads/${value.image}`}
                    alt={value.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-4 font-bold text-green-700">
                  {value.voteCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoteCount;
