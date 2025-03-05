import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { currency } from "../App";
import { data } from "react-router-dom";

function List() {
  let [list, setList] = useState([]);
  async function fetchList() {
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/list`
      );
      if (data.success) {
        setList(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function removeProduct(productId) {
    try {
      let { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/remove`,{productId}
      );
      if(data.success){
        toast.success(data.message)
        fetchList()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <p>Product list</p>
      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action </b>
        </div>
      </div>
      {/* porduct list */}
      {list.map((cur, ind) => (
        <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 border text-sm" key={ind}>
          <img className="w-12" src={cur.image[0]} alt="" />
          <p>{cur.name}</p>
          <p>{cur.category}</p>
          <p>{currency}   {cur.price}</p>
          <p className="text-right md:text-center cursor-pointer text-lg" onClick={()=>removeProduct(cur._id)}>X</p>
        </div>
      ))}
    </div>
  );
}

export default List;
