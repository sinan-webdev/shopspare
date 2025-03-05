import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotoal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ContextComp } from "../context/CreateContext";
import axios from "axios";
import { toast } from "react-toastify";

function Placeorder() {
  let {cartItems,setCartItem,backendUrl,token,delivary_fee,getCartAmount,products,getUserCart} = useContext(ContextComp)
  console.log('_________________________carr',cartItems);
  useEffect(()=>{getCartAmount()},[])
  let [method,setMethod] = useState('cod')
  let navigate = useNavigate();
  let [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:"",
    phone2:""

  })
   async function handleOnchange(e){
    let name = e.target.name
    let value = e.target.value
    setFormData(prev=>({...prev,[name]:value}))
  }
  let initPay = (order)=>{
    const options = {
     key:import.meta.env.VITE_razorpay_key_id,
     amount:order.amount,
     currency:order.currency,
     name:'Order Payment',
     description:'Order Payment',
     order_id:order.id,
     receipt:order.receipt,
     handler:async (response) => {
      console.log(response);
      try {
        let {data} = await axios.post(`${backendUrl}/api/v1/order/verifyrazorpay`,response,{headers:{Authorization:`Bearer ${token}`}})
        if(data.success){
          navigate("/orders")
          setCartItem({})
        }
      } catch (error) {
        toast.error(error)
      }
     }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let orderItems = []
      for (let cur in cartItems){
        for(let i in cartItems[cur]){
          if(cartItems[cur][i]>0){
            // filtering in to cart item bcz it has to show that particular item 
            const itemInfo = structuredClone(products.find(j=>j._id===cur))
            console.log('structuredClone',itemInfo);
            
            if(itemInfo){
              itemInfo.size = i
              itemInfo.quantity = cartItems[cur][i] 
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items:orderItems,
        amount:Number(getCartAmount()+delivary_fee)
      }

      // swich care to chek which payment method selected
      switch (method) {
        // api call for cash on delivary
        case 'cod':
          const {data} = await axios.post(`${backendUrl}/api/v1/order/cod`,orderData,{headers:{Authorization:`Bearer ${token}`}})
          if(data.success){
            toast.success(data.message)
            getUserCart(token)
            navigate("/orders")
          }else{
            toast.error(data.message)
          }
          break;
      case 'razorpay':
        const responseRazorpay = await axios.post(`${backendUrl}/api/v1/order/razorpay`,orderData,{headers:{Authorization:`Bearer ${token}`}})
        if(responseRazorpay.data.success){
          initPay(responseRazorpay.data.order);
          
        }else{
          console.log(data.message);
          toast.error(data.message)
        }
        break;
        default:
          break;
      }
    } catch (error) {
      
    }
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"ORDER"} text2={"DETAILS"} />
        </div>
        <div className="flex gap-3">
          <input required onChange={(e)=>handleOnchange(e)} name="firstName" value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input required onChange={(e)=>handleOnchange(e)} name="lastName" value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required onChange={(e)=>handleOnchange(e)} name="email" value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Email Address"
        />
        <input required onChange={(e)=>handleOnchange(e)} name="street" value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input required onChange={(e)=>handleOnchange(e)} name="city" value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input required onChange={(e)=>handleOnchange(e)} name="state" value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input required onChange={(e)=>handleOnchange(e)} name="zipCode" value={formData.zipCode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Zip Code"
          />
          <input required onChange={(e)=>handleOnchange(e)} name="country" value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <div className="flex gap-3">
          <input required onChange={(e)=>handleOnchange(e)} name="phone" value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Phone"
          />
          <input onChange={(e)=>handleOnchange(e)} name="phone2" value={formData.phone2}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Phone 2"
          />
        </div>
      </div>
      {/* right side */}
      <div className="mt-8 ">
        <div className="min-w-80">
          <CartTotoal/>
        </div>
        <div className="mt-12">
        <Title text1={'PAYMENT'} text2={'METHODS'} />
        {/* payment methods */}
        <div className="flex gap-3 flex-col lg:flex-row">
          {/* <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border px-3 py-3 cursor-pointer">
            <p className={`w-2 h-2 rounded-full bg-green-300 ${method==='stripe'?"block":"opacity-0"}`}></p>
            <img  className="h-5 mx-4" src={assets.stripe_logo} alt="" />
          </div> */}
          <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border px-3 py-3 cursor-pointer">
            <p className={`w-2 h-2 rounded-full bg-green-300 ${method==='razorpay'?"block":"opacity-0"}`}></p>
            <img  className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
          </div>
          <div onClick={()=>setMethod('cod')}  className="flex items-center gap-3 border px-3 py-3 cursor-pointer">
            <p className={`w-2 h-2 rounded-full bg-green-300 ${method==='cod'?"block":"opacity-0"}`}></p>
           <p className="text-black text-sm font-medium mx-4">CASH ON DELIVERY</p>
          </div>

        </div>
        <div  className="w-full text-end mt-8">
          <button className="bg-green-500 text-white px-16 py-3 text-sm">
            PLACE ORDER
          </button>
        </div>
        </div>

      </div>
    </form>
  );
}

export default Placeorder;
