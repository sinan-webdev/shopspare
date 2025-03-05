import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

function Orders({ token }) {

  let [allOrdersData, setAllOrdersData] = useState([])
  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order/allorders`, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {

        setAllOrdersData(data.message)
      } else {

        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => { fetchAllOrders() }, [])
  const handleStatus = async(e,orderId)=>{
    e.preventDefault();
    let status = e.target.value;
    
    try {
      let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order/updatestatus`,{orderId,status},{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        
        toast.success(data.message)
        fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message )
    }
  }
  return (
    <div>
      <h3>All orders</h3>
      <div>
        {
          allOrdersData.map((cur, ind) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={ind}>

              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                {cur.items.map((curElem, ind) => {
                if(ind === cur.items.length -1){
                  return <p key={ind}>{curElem.name} X {curElem.quantity} <span>{curElem.size}  </span></p>
                }
              })}
              </div>
                <div>
                  <p>Name: {cur.address.firstName} {cur.address.lastName}</p>
                  <p>street : {cur.address.street}</p>
                  <p>zip code :{cur.address.zipCode}</p>
                  <p>phone :{cur.address.phone}</p>
                </div>
                <div>
                  <p>{new Date(cur.date).toLocaleString()}</p>
                  <p>payment : {cur.payment?'Done':'Pending'}</p>
                </div>
                <div>
                  <select onChange={(e)=>handleStatus(e,cur._id)} value={cur.status} className='p-2 font-semibold'>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
