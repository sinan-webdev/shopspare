import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContextComp } from "../context/CreateContext";

function Login() {
  let {token,setToken} = useContext(ContextComp)
  let navigate = useNavigate()
  let [currentState, setCurrentState] = useState("Signup");
  let [name,setName] = useState('')
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState()
  async function handleSubmit(e){
    e.preventDefault();
    try {
      let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${currentState==='Login'?'login':'register'}`,{name,email,password})
    if(data.success){
      setToken(data.message)
      localStorage.setItem('token',data.message)
      navigate("/")
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])
  
  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600">
      <div>
        <p className="text-3xl font-parata">{currentState}</p>
      </div>
      {currentState === "Login" ? (
        null
      ) : (<input
        type="text"
        required
        className="w-full px-3 border py-2 border-gray-700"
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
        value={name}
      />)}
      <input
        type="email"
        required
        className="w-full px-3 border py-2 border-gray-700"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        required
        className="w-full px-3 border py-2 border-gray-700"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Fotgot password?</p>
        {
          currentState==="Login"?<p className="cursor-pointer" onClick={()=>setCurrentState('Signup ')}>Create account</p>:<p className="cursor-pointer" onClick={()=>setCurrentState('Login')}>Login here</p>
        }

      </div>
      <div className="w-full ">
        <button className="w-full bg-black text-white rounded-full px-4 py-2 cursor-pointer">{currentState==='Login'?"Login":"Signup"}</button>
      </div>
    </form>
  );
}

export default Login;
