import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import api from "../services/api"
export default function Signup() {
  const navigate = useNavigate()
  const [showpassword, setShowpassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err,setErr] = useState("")
  const [loading,setLoading] = useState(false)
  const handlesignUp = async (e) => {
    e.preventDefault()
    setErr("")
    try {
      const res = await api.post("/auth/signup",{
        name,email,password
      })
      navigate("/signin")
      
    } catch (error) {
      if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.log("Data:", error.response.data);
      console.log("Status:", error.response.status); // Will be 404
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Request made but no response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error setting up request:', error.message);
    }
    setErr(error.response.data.message)
      
    }
  }
  return (
    <div className='w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
      <form className='w-100 h-110 max-w-500 bg-[#00000003] backdrop-blur
      shadow-lg shadow-gray-700 flex flex-col items-center justify-center gap-[20px] p-2' onSubmit={handlesignUp}>
        <h1 className='text-white text-2xl font-semibold mb-[30px]'>Register to <span className='text-blue-500'>Virtual Assistant</span></h1>
        <input type="text" required placeholder='Enter your name' className='
        w-full h-6 outline-none border-2  border-white bg-transparent text-white placeholder-gray-300 px-5 py-4 rounded-full'
          onChange={(e) => setName(e.target.value)} value={name} />
        <input type="email" required placeholder='Enter your email' className='
        w-full h-6 outline-none border-2  border-white bg-transparent text-white placeholder-gray-300 px-5 py-4 rounded-full'
          onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className='w-full h-9 border-2 border-white bg-transparent text-white rounded-full '>
          <input type={showpassword ? "text" : "password"} required placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent
          placeholder-gray-300 px-5 py-4'
            onChange={(e) => setPassword(e.target.value)} value={password} />
          {!showpassword && <IoEye className='absolute bottom-46 right-5  text-white cursor-pointer' onClick={() => setShowpassword(true)} />}
          {showpassword && <IoEyeOff className='absolute bottom-46 right-5  text-white cursor-pointer' onClick={() => setShowpassword(false)} />}
        </div>
        {err.length>0 && <p className='text-red-500 text-lg'>
          *{err}
          </p>}
        <button className='min-w-10 mt-10 h-9 bg-white rounded-2xl text-black font-semibold text-2xl active:scale-75 shadow-md shadow-amber-300' disabled={loading}>{loading? "loading..." :"Sign Up"}</button>
        <p className='text-white'>Alrady have an account<span className='text-blue-500 cursor-pointer ' onClick={() => navigate('/signin')}>Sign In</span></p>
      </form>
    </div>
  )
}
