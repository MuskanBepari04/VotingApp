import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

   const apiUrl = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();
  const [form , setForm]=useState({
    name:'',
    age:'',
    email:'',
    password:'',
    mobile:'',
    address:'',
    aadharCardNumber:'',
    role:''
  })

  const handeleSubmit= async(e)=>{
    e.preventDefault();
  try{
     const res= await axios.post(`${apiUrl}/auth/signup`, form)
     console.log("Signup successful:", res.data);
     localStorage.setItem('token' , res.data.token)
      navigate('/auth/login')
   
  }catch(err){
     console.error("Signup error:", err.response?.data?.message || err.message);
  }

  }


  return (
    <div className="flex h-screen justify-center items-center bg-pink-300">
      <div>
        <form onSubmit={handeleSubmit}  className="bg-white flex flex-col p-5 rounded-2xl gap-3">
           <div className="flex ">
             <label htmlFor="name">Name:</label>
          <input type="text"  onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter Name" id="name" className="p-2 border w-full" />
           </div>
         <div className="flex">
             <label htmlFor="age">Age</label>
          <input type="Number"  onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Enter Age :" id="age" className="p-2 border w-full" />
         </div>
         <div className="flex">
             <label htmlFor="email">Email</label>
          <input type="text"  onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter Email" id="email" className="p-2 border"/>
         </div>
         <div className="flex">
             <label htmlFor="password">Password</label>
          <input type="text"  onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter Password" id="password" className="p-2 border" />
         </div>
        <div className="flex">
              <label htmlFor="mobile">Mobile</label>
          <input type="text"  onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="Enter Mobile" id="mobile" className="p-2 border"/>
        </div>
       <div className="flex">
           <label htmlFor="adress">Adress</label>
          <input type="text"  onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Enter Adress" id="adress" className="p-2 border" />
       </div>
          <div className="flex">
            <label htmlFor="adharCard">Aadhar Card</label>
          <input type="text"  onChange={(e) => setForm({ ...form, aadharCardNumber: e.target.value })} placeholder="Enter Aadhar Card" id="adharCard" className="p-2 border"/>
          </div>
       <div className="flex">
           <label htmlFor="role">Role</label>
          <select name="" id="role" className="p-2 border"  onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="">Select Role</option>
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
       </div>
       <button type="submit" className="border p-2 bg-pink-400 text-xl cursor-pointer text-white">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
