import axios from 'axios'
import userContext from '../../context/userContext'
import { useContext , useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CandidateList from '../../components/CandidateList'

const UserProfile = () => {
    const [userInformation , setUserInformation]=useState({});
     const [candidateList , setCandidateList] =useState([])
      const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(()=>{
      axios.get(`${apiUrl}/auth/profile` , config)
      .then((response)=>{
        setUserInformation(response.data.user)
      }).catch((err)=>{
        console.log(err.message)
      })
       axios.get(`${apiUrl}/candidate`)
     .then((response)=>{
      setCandidateList(response.data)
     })
     .catch((err)=>{
      console.log(err)
     })
    } , [])

  return (

    <div>
    <div>
     <div>User Profile</div>
     <div>
        <p>{userInformation.name}</p>
        <p>{userInformation.age}</p>
        <p>{userInformation.aadharCardNumber}</p>
        <p>{userInformation.address}</p>
        <p>{userInformation.email}</p>
        <p>{userInformation.mobile}</p>
     </div>
    </div>
    <div className='mt-5'>
        <Link to={'/auth/profile/password'} className='border p-2 mx-2' >Change Password</Link>
        <Link to={'/'} className='border p-2 mx-2'>Vote</Link>
        <Link to={'/'} className='border p-2 mx-2'>Vote Count</Link>
    </div>
    <div>
    <CandidateList candidateList={candidateList}/>
    </div>
    {candidateList.map((value , index)=>(
             <div className='mt-5'key={index}>
            <Link to={`/voting/vote/${value._id}`} className='p-2 mx-3 border'>Vote {value.name}</Link>
          </div>
           ))}

           <div><Link to={'/voting/count'}>See Vote Count</Link></div>
    </div>
  )
}

export default UserProfile
