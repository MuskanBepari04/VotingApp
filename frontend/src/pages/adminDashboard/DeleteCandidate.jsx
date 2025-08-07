import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
const DeleteCandidate = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {CandidateID}=useParams()
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.delete(`${apiUrl}/candidate/delete/${CandidateID}` ,config)
    .then(()=>{
      console.log('deleted successfully....');
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div>
      Delete Candidate : 
      <div>
        Are You Sure You Want To delete
        <form onSubmit={handleSubmit}>
          <button type='submit' className='border mx-5'>Yes</button>
          <Link to={'/admin'}>No</Link>
        </form>
      </div>
    </div>
  )
}

export default DeleteCandidate
