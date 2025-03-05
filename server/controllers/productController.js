import { productModel } from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"
// function for add product
export const addProduct = async (req, res) => {
  try {
    let { name, description, category, subCategory, sizes, price,bestseller } =
      req.body;
      // using && because user can send less than 4 images so if in the req.files.image1 available then store into vriable
    let image1 = req.files.image1 && req.files.image1[0];
    let image2 = req.files.image2 && req.files.image2[0]
    let image3 = req.files.image3 && req.files.image3[0];
    let image4 = req.files.image4 && req.files.image4[0];
    console.log(name, description, category, subCategory, sizes, bestseller);
    let images = [image1,image2,image3,image4].filter((cur)=>cur!==undefined)
    // uploading into cloudinary
    let imageUrl = await Promise.all(
        images.map(async (cur)=>{
            let result = cloudinary.uploader.upload(cur.path,{resource_type:"image"})
            // here sucure_url is that image url crated by cloudinary
            return (await result).secure_url
        })
    )
    let productData = {
        name,
      description,
      category,
      subCategory,
      // parsing data bcz sizes come like "["M","L"]"
      sizes:JSON.parse(sizes),
      price:Number(price),
      bestseller:bestseller==='true'?true:false,
      image: imageUrl,
      date:Date.now()
    }
    let response = await productModel.create(productData);
    console.log(response)
    if(response){
      return  res.json({
            success:true,
            message:'upload product successfull'
        })
    }
  } catch (error) {
    res.json({
        success:false,
        message:error.message
    })
  }
};
// function for listProduct
export const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.json({
          success:true,
          message:products
        })
    } catch (error) {
        res.json({
          success:false,
          message:error.message
        })
    }
};
// function for removeProduct
export const removeProduct = async (req, res) => {
  try {
    let productId = req.body.productId
    let removeProduct = await productModel.findByIdAndDelete(productId)

    res.json({
      success:true,
      message:'product remove successfull'
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};
// function for add singleProductInfo
export const singleProductInfo = async (req, res) => {
  try {
    let productId = req.body.productId
    let response = await productModel.findById(productId)

    res.json({
      success:true,
      message:response
    })
  } catch (error) {
    res.json({
      success:false,
      message:error.message
    })
  }
};
