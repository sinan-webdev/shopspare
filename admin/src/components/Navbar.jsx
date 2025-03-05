import React from 'react'
import { assets } from '../assets/assets'

function Navbar({setToken}) {
  console.log('second time__________-')
  return (
    <div className='flex items-center py-2 justify-between px-8'>
      <h1>Logo</h1>
      <button className='px-4 py-3 border bg-black text-white rounded-full' onClick={()=>setToken('')}>Log out</button>
    </div>
  )
}

export default Navbar
