import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletterbox from '../components/Newsletterbox'

function Contact() {
  return (
    <div>
        <div>
          <Title text1={'CONTACT'} text2={"US"}/>
        </div>
      <div className='text-left text-2xl pt-10 border-t flex flex-col md:w-2/4 gap-3'>
        {/* <div>
          <img src={assets.contact_img}  alt="" />
        </div> */}
        <p>Our store</p>
        <p>45887 Willms station <br /> Suite 350 , London ,UK</p>
        <p>Phone:(784) 45781 45 41 67 <br /> Email:random@gmail.com</p>
        <p>Learn more about our team and job openings.</p>
        <button className='p-2 border cursor-pointer'>Explore jobs</button>
      </div>
      <div className='mt-20'>
        <Newsletterbox/>
      </div>
    </div>
  )
}

export default Contact
