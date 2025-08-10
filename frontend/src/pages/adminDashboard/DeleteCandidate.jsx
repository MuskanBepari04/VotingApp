
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteCandidate = () => {

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { CandidateID } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`${apiUrl}/candidate/delete/${CandidateID}`, config)
      .then(() => {
        toast.success("Candidate Deleted Successfuly");
        navigate("/admin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Delete Candidate
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this candidate? <br />
          This action cannot be undone.
        </p>

        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Yes
          </button>
          <Link
            to={"/admin"}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            No
          </Link>
        </form>
      </div>
    </div>
  );
};

export default DeleteCandidate;
