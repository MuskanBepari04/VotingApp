import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Vote = () => {
    const {CandidateID}=useParams()
const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    useEffect(()=>{
        axios.get(`${apiUrl}/voting/vote/${CandidateID}` , config)
        .then(()=>{
            console.log('voted to ' , CandidateID)
        })
        .catch((err)=>{
            console.log(err.message);
            console.log(err);
        })
    },[])
  return (
    <div>
      Voted To --- {CandidateID}
    </div>
  )
}

export default Vote
