import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios"
import { toast } from "react-toastify";
function Add({token}) {
  console.log(token)
  let [image1, setImage1] = useState("");
  let [image2, setImage2] = useState("");
  let [image3, setImage3] = useState("");
  let [image4, setImage4] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men");
  let [subCategory, setSubCategory] = useState("Topwear");
  let [price, setPrice] = useState("");
  let [sizes, setSizes] = useState([]);
  let [bestseller, setBestseller] = useState(false);
  async function  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    image1 && formData.append('image1',image1)
    image2 && formData.append('image2',image2)
    image3 && formData.append('image3',image3)
    image4 && formData.append('image4',image4)
    formData.append('name',name)
    formData.append('description',description)
    formData.append('category',category)
    formData.append('subCategory',subCategory)
    formData.append('price',price)
    // sizes look like "["s","M"]" like this
    formData.append('sizes',JSON.stringify(sizes))
    formData.append('bestseller',bestseller)
    let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/add`,formData,{headers:{token}})
    if(data.success){
      toast.success(data.message) 
      setImage1('')     
      setImage2('')
      setImage3('')
      setImage4('')
      setName('')
      setDescription('')
      setCategory('Men')
      setSubCategory('Women')
      setPrice('')
      setSizes([])
      setBestseller(false)
    }else{
      toast.error(data.message)
    }
  }
  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="w-full flex flex-col gap-3 items-start">
      <div>
        <p>Upload Image </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <div>
          <label htmlFor="file1">
            <img
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
              className="h-24 w-24"
            />
            <input
              type="file"
              className="hidden"
              id="file1"
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <label htmlFor="file2">
            <img
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
              className="h-24 w-24"
            />
            <input
              type="file"
              className="hidden"
              id="file2"
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <label htmlFor="file3">
            <img
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
              className="h-24 w-24"
            />
            <input
              type="file"
              className="hidden"
              id="file3"
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <label htmlFor="file4">
            <img
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
              className="h-24 w-24"
            />
            <input
              type="file"
              className="hidden"
              id="file4"
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <p>porduct name</p>
        <input
          type="text"
          placeholder="Enter Product name"
          required
          className="w-full max-w-[500px] p-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="w-full flex flex-col gap-3">
        <p>Product Description</p>
        <textarea
          type="text"
          placeholder="Type about product"
          required
          className="w-full max-w-[500px] p-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="w-full flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div>
          <p>Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p>Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
          placeholder="Enter Price"
          className="p-2 sm:w-[125px]"
        />
      </div>
      <div className="flex gap-3">
        <p className="mb-3">Product Sizes</p>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("S")
                ? prev.filter((cur) => cur !== "S")
                : [...prev, "S"]
            )
          }
        >
          <p className={`${sizes.includes('S')?"bg-gray-200":'bg-white'} border px-3 py-1  cursor-pointer`}>S</p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("M")
                ? prev.filter((cur) => cur !== "M")
                : [...prev, "M"]
            )
          }
        >
          <p className={`${sizes.includes('M')?"bg-gray-200":'bg-white'} border px-3 py-1  cursor-pointer`}>M</p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("XL")
                ? prev.filter((cur) => cur !== "XL")
                : [...prev, "XL"]
            )
          }
        >
          <p className={`${sizes.includes('XL')?"bg-gray-200":'bg-white'} border px-3 py-1  cursor-pointer`}>XL</p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("XXL")
                ? prev.filter((cur) => cur !== "XXL")
                : [...prev, "XXL"]
            )
          }
        >
          <p className={`${sizes.includes('XXL')?"bg-gray-200":'bg-white'} border px-3 py-1  cursor-pointer`}>XXL</p>
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <input type="checkbox" id="bestseller" onChange={()=>setBestseller(prev=>!prev)} checked={bestseller}/>
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className="bg-black
       text-white rounded-fu borderll px-4 py-3"
      >
        Add product
      </button>
    </form>
  );
}

export default Add;
