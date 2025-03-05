import React, { useContext, useEffect, useState } from 'react'
import { ContextComp } from '../context/CreateContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

function Searchbar() {
    let {searchVal,setSearchVal,showSearch,setShowSearch} = useContext(ContextComp)
    let [visible,setVisible] = useState(false);
    let location = useLocation();
    useEffect(()=>{
      if(location.pathname.includes('collection') ){
        setVisible(true)
      }else{
        setVisible(false)
      }
    },[])
  return showSearch && visible ?(
    <div className='border-t border-b bg-gray-50 text-center '>
      <div className='inline-flex items-center justify-center border border-gray-300 px-5 '>
        <input onChange={(e)=>setSearchVal(e.target.value)} value={searchVal} type="text" className='flex-1 outline-none bg-inherit text-sm' />
        <img src={assets.search_icon} className='w-4'/>
      </div>
      <img src={assets.cross_icon} alt="close icon" className='w-3 cursor-pointer inline' onClick={()=>setShowSearch(false)}/>
    </div>
  ):null
}

export default Searchbar
