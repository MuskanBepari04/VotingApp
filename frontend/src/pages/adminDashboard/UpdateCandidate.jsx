import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCandidate = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {CandidateID} =useParams()
   const [form , setForm]=useState({name:'' , party:'' , age:''})
  useEffect(()=>{
    axios.get(`${apiUrl}/candidate/${CandidateID}` , config)
    .then((response)=>{
      setForm({...form , name:response.data.name ,party:response.data.party, age:response.data.age })
    }).catch((err)=>{
      console.log(err.message)
    })
  } , [])

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.put(`${apiUrl}/candidate/update/${CandidateID}`, form , config)
    .then(()=>{
      console.log('updated Successfully')
    }).catch((err)=>{
      console.log(err.message)
    })
  }

  return( 
  <div>Update Candidate :
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={form.name} placeholder='Enter Name ' onChange={(e)=>setForm({...form , name:e.target.value})} className='border' />
            <input type="text" value={form.party} placeholder='Enter Party ' onChange={(e)=>setForm({...form , party:e.target.value})} className='border' />
            <input type="number" value={form.age} placeholder='Enter Age ' onChange={(e)=>setForm({...form , age:e.target.value})} className='border' />
            <button type="submit">LAlal</button>
      </form>
    </div>
  </div>
);
};

export default UpdateCandidate;
