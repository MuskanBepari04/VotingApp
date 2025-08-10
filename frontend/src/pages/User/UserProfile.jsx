import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [userInformation, setUserInformation] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/profile`, config)
      .then((response) => {
        setUserInformation(response.data.user);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.message);
      });
  }, []);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Welcome {userInformation.name}
        </h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
          <img
            src="../images/profile.jpg"
            alt="Profile Illustration"
            className="w-40 h-40 rounded-full border-4 border-green-500 shadow-md mb-4 sm:mb-0"
          />

          <div className="text-gray-800 space-y-2">
            <p>
              <span className="font-semibold text-green-800">Name:</span>{" "}
              {userInformation.name}
            </p>
            <p>
              <span className="font-semibold text-green-800">Email:</span>{" "}
              {userInformation.email}
            </p>
            <p>
              <span className="font-semibold text-green-800">Mobile:</span>{" "}
              {userInformation.mobile}
            </p>
            <p>
              <span className="font-semibold text-green-800">Age:</span>{" "}
              {userInformation.age}
            </p>
            <p>
              <span className="font-semibold text-green-800">
                Aadhar Card No:
              </span>{" "}
              {userInformation.aadharCardNumber}
            </p>
            <p>
              <span className="font-semibold text-green-800">Address:</span>{" "}
              {userInformation.address}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
          <Button to="/auth/profile/password" text="Change Password" />
          <Button to="/voting" text="Start Voting" />
          <Button to="/voting/count" text=" Vote Count" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
