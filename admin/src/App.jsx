import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import {ToastContainer}  from "react-toastify"

export let currency = "$"
function App() {
  let [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className="min-h-screen">
      <ToastContainer/>
      {token===""?<Login setToken={setToken}/>:
       <>
       <Navbar setToken={setToken}/>
       <hr />
       <div className="w-full flex">
         <Sidebar />
         <div className="w-[70%]  mx-auto ml-[max(5vw,25px)  my-8 text-gray-500 text-base">
         <Routes>
           <Route path="/add" element={<Add token={token}/>}/>
           <Route path="/list" element={<List token={token}/>}/>
           <Route path="/order" element={<Orders token={token}/>}/>
         </Routes>
         </div>
       </div>
     </>
      }

    </div>
    
   
  );
}

export default App;
