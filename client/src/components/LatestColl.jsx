

import React, { useContext, useEffect, useState } from 'react'
import { ContextComp } from '../context/CreateContext'
import Title from './Title'
import ProuductItem from './ProuductItem'

function LatestColl() {
    const {products,crrency} = useContext(ContextComp)

    let [latestProducts,setLatestProducts] = useState(0)
    useEffect(()=>{
        setLatestProducts(products.slice(0,10))
    },[products])
    if(!latestProducts){
        return <div>Loading...</div>
    }
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={"LATEST"} text2={"COLLECTION"}/>
        </div>
        <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4'>
        {latestProducts.map((cur)=>(
            <ProuductItem id={cur._id} name={cur.name} image={cur.image} price={cur.price} bestseller={cur.bestseller}/>
        ))}
        </div>
        
    </div>
  )
}

export default LatestColl
