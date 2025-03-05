import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, products } from '../assets/assets'
import { ContextComp } from '../context/CreateContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Orders() {
  let {currency,backendUrl,token} = useContext(ContextComp)
  let [allOrders,setAllOrders] = useState([])

  async function ordersData() {
    try {
      if(!token){
        return null
      }
      let {data} = await axios.get(`${backendUrl}/api/v1/order/user-orders`,{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        console.log(data,'data');
        
        let allOrderItem = []
        data.message.map((cur)=>{
          cur.items.map((item)=>{
            item['status'] = cur.status
            item['payment'] = cur.payment
            item['paymentMethod'] = cur.paymentMethod
            item['date'] = cur.date
            allOrderItem.push(item)
          })
        })
        console.log(allOrderItem,'__')
        setAllOrders(allOrderItem.reverse())

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{ordersData()},[token])
  console.log(allOrders);
  
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'ORDERS'} text2={""}/>
      </div>
      <div>
        {
          allOrders.map((cur,ind)=>(
              <div key={ind} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between gap-4 '>
                <div className='flex items-start gap-6 text-sm '>
                  <img className='w-16 sm:w-20' src={cur.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium '>{cur.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-500'>
                <p className='text-lg '>{currency}{cur.price}</p>
                <p>Quantity:{cur.quantity}</p>
                <p>Size:{cur.size}</p>
                  </div>
                  <p>Payment method : {cur.paymentMethod}</p>
                </div>
                </div>
                <div className='md:w-1/2  flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 bg-green-600 rounded-full'></p>
                  <p>{cur.status}</p>

                </div>
                <button  className='px-4 h-1/2 border cursor-pointer'>Track order</button>
                </div>
              </div>
              
          ))
        }
      </div>
    </div>
  )
}

export default Orders
