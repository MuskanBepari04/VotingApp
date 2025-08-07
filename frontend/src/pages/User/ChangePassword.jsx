
import axios from 'axios';
import { useState } from 'react';

const ChangePassword = () => {
      const apiUrl = import.meta.env.VITE_API_URL;
 const token = localStorage.getItem('token')
 const config ={
  headers:{
    Authorization :`Bearer ${token}`
  }
 }

 const [newPassword , setNewPassword]=useState('');

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`${apiUrl}/auth/profile/password` , {newPassword:newPassword} , config)
            console.log('password Changed Successfully....!')
        }catch(err){
            console.log(err.message);
        }
    }

  return (
    <div>
      ChangePassword:
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter Password' className='p-2 border' />
        <button type='submit'>Change</button>
      </form>
    </div>
  )
}

export default ChangePassword
