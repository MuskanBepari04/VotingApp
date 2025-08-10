import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Vote = () => {
  const { CandidateID } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/voting/vote/${CandidateID}`, config)
      .then(() => {
        console.log("voted to ", CandidateID);
        toast.success("Your Vote Has Been Saved Successfully");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        navigate("/profile");
      });
  }, []);

  return <div>Voted To --- {CandidateID}</div>;
};

export default Vote;
