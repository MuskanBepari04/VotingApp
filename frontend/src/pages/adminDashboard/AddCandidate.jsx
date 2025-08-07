import axios from "axios";
import { useState } from "react";

const AddCandidate = () => {
   const apiUrl = import.meta.env.VITE_API_URL;
 const token = localStorage.getItem('token')
 const config ={
  headers:{
    Authorization :`Bearer ${token}`
  }
 }
 const [form , setForm]=useState({name:'', party:'' , age:''});
 const handleSubmit = async(e)=>{
  try{
    e.preventDefault();
  const response = await axios.post(`${apiUrl}/candidate/add` , form,config)
  console.log(response);
  }catch(err){
    console.log(err.message);
  }

 }

  return (
    <div>
      Add Candidate:
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col p-'>
            <input type="text" placeholder='Enter Name ' onChange={(e)=>setForm({...form , name:e.target.value})} className='border' />
            <input type="text" placeholder='Enter Party ' onChange={(e)=>setForm({...form , party:e.target.value})} className='border' />
            <input type="number" placeholder='Enter Age ' onChange={(e)=>setForm({...form , age:e.target.value})} className='border' />
            <button type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddCandidate
