import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
  function Login({setToken}) {
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/signin`,{email,password})
      if(data.success){
        setToken(data.message)
        toast.success('login successfull')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='min-h-screen grid place-items-center'>
      <div className='bg-white rounded-lg max-w-md border shadow-md p-6'>
        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <p className='text-sm mb-3'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-500 outline-none' type="email" placeholder='admin@gmail.com' required/>
            </div>
            <div>
                <p className='text-sm mb-3'>Email Address</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-500 outline-none' type="password" placeholder='Enter password' required/>
            </div>
            <button className='w-full border bg-black text-white rounded-full mt-3 p-3'>Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login
