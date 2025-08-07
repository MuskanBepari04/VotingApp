import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import userContext from '../../context/userContext';
import CandidateList from '../../components/CandidateList';
const AdminDashBoard = () => {

  const [candidateList , setCandidateList] =useState([])

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(()=>{
     axios.get(`${apiUrl}/candidate`)
     .then((response)=>{
      setCandidateList(response.data)
      //console.log(response.data)
     })
     .catch((err)=>{
      console.log(err)
     })
  },[])

  return (
    <div>
      This is admin Dashboard:
      <div>
     
      <div className='flex'>
        <Link to={'/admin/add'} className='p-2 mx-3 border'>Add</Link>
       <CandidateList candidateList={candidateList}/>
       {candidateList.map((value , index)=>(
         <div className='mt-5'key={index}>
        <Link to={`/admin/update/${value._id}`} className='p-2 mx-3 border'>Update</Link>
        <Link to={`/admin/delete/${value._id}`} className='p-2 mx-3 border'>Delete</Link>
      </div>
       ))}
      </div>
     
      </div>
    </div>
  )
}

export default AdminDashBoard
