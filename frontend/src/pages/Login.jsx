import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {
   const apiUrl = import.meta.env.VITE_API_URL;
   
   const [form , setForm]=useState({
    aadharCardNumber:'',
    password:''
   })
   const navigate = useNavigate()
   const { setUserInfo} = useContext(userContext)
   const handleSubmit=async(e)=>{
    try{
      e.preventDefault();
    const response = await axios.post(`${apiUrl}/auth/login` , form)
    console.log(response.data.data)
    setUserInfo(response.data.data)
    localStorage.setItem('token' , response.data.token)
    if(response.data.data.role === 'admin')
   {
     navigate('/admin')
   }else{
    navigate('/profile')
   }
    }catch(err){
      console.log(err)
    }
   }

  return (
   <div className="flex h-screen justify-center items-center bg-pink-300">
      <div>
        <form onSubmit={handleSubmit} className="bg-white flex flex-col p-5 rounded-2xl gap-3">
           <div className="flex ">
             <label htmlFor="name">Adhar Card No::</label>
          <input type="text" placeholder="Enter Name" id="name" onChange={(e)=>setForm({...form , aadharCardNumber:e.target.value})} className="p-2 border w-full" />
           </div>
         <div className="flex">
             <label htmlFor="age">Password :</label>
          <input type="text" placeholder="Enter Age :" id="age" onChange={(e)=>setForm({...form , password:e.target.value})} className="p-2 border w-full" />
         </div>
       <button type="submit" className="border p-2 bg-pink-400 text-xl cursor-pointer text-white">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
