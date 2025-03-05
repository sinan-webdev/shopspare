import React from 'react'
import {NavLink} from "react-router-dom"
import {assets} from "../assets/assets"
function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-amber-200s'>
      <div className='flex flex-col text-[15px] pl-[20%] gap-4 pt-6'>
        <NavLink to="/add" className={`flex gap-2 border p-4 border-r-0`}> 
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add product</p>
        </NavLink>
        <NavLink to="/list" className='flex gap-2 border p-4 border-r-0'> 
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>list products</p>
        </NavLink>
        <NavLink to="/order" className='flex gap-2 border p-4 border-r-0'> 
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
