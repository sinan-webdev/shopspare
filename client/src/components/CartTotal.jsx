import React, { useContext } from 'react'
import { ContextComp } from '../context/CreateContext'
import Title from './Title'

function CartTotoal() {
    let {currency,delivary_fee,getCartAmount,token,setToken} = useContext(ContextComp)
    
  return (
    <div className='w-full '>
      <div className='text-2xl '>
        <Title text1={''} text2={"TOTAL"}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {getCartAmount()}.00</p>

        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivary_fee}</p>

        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency}{getCartAmount()===0?(0):getCartAmount()+delivary_fee}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotoal

