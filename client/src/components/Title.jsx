import React from 'react'

function Title({text1,text2}) {
  return (
    <div>
      <p className='text-gray-500 text-3xl'>{text1} <span className='text-gray-700 font mediup'>{text2}</span></p>
      
    </div>
  )
}

export default Title
