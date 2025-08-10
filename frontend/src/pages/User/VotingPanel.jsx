import { useEffect, useState } from "react";
import axios from "axios";
import CandidateList from "../../components/CandidateList";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const VotingPanel = () => {
  const [candidateList, setCandidateList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/candidate`)
      .then((response) => {
        setCandidateList(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <div className="min-h-screen bg-green-50  p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="../images/upvote.jpg"
            alt="Vote Illustration"
            className="w-48 h-44 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold text-green-700">
            Your Vote Matters!
          </h1>
          <p className="text-green-600 mt-2">
            Every vote is a voice for change — make yours count today!
          </p>
        </div>

        <div className="flex gap-2 sm:gap-6">
          <div className="w-[90%] sm:w-4/5">
            <CandidateList candidateList={candidateList} />
          </div>
          <div className="flex flex-col justify-evenly gap-8 ">
            {candidateList.map((value, index) => (
              <Button
                key={index}
                to={`/voting/vote/${value._id}`}
                text="Vote"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/voting/count"
            className="inline-block bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition shadow-sm"
          >
            See Vote Count
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VotingPanel;
