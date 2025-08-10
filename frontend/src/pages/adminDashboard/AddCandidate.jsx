import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const navigate=useNavigate()
   
   const apiUrl = import.meta.env.VITE_API_URL;
 const token = localStorage.getItem('token')
 const config ={
  headers:{
    Authorization :`Bearer ${token}`,
      "Content-Type": "multipart/form-data"
  }
 }
 const [form , setForm]=useState({name:'', party:'' , age:'' , image:null});

 const handleSubmit = async(e)=>{
  try{
    e.preventDefault();
  const response = await axios.post(`${apiUrl}/candidate/add` , form,config)
  toast.success('Candidate Added Succesfully')
 navigate('/admin')
  }catch(err){
    toast.error(err.response.data.message)
    console.log(err.response.data.message);
  }

 }

  return (
   <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
      Add Candidate
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="text"
        placeholder="Enter Party"
        onChange={(e) => setForm({ ...form, party: e.target.value })}
        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="number"
        placeholder="Enter Age"
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
      />

      <button
        type="submit"
        className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Add Candidate
      </button>
    </form>
  </div>
</div>

  )
}

export default AddCandidate
