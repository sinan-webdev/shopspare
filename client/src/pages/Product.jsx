import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContextComp } from "../context/CreateContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

function Product() {
  const { productId } = useParams();
  let { products, currency,addToCart } = useContext(ContextComp);
  let [productDetails, setProductDetails] = useState();
  let [mainImage, setMainImage] = useState("");
  let [sizes, setSize] = useState("");
  console.log(productId);
  function showProductDetails() {
    products.map((cur) => {
      if (cur._id === productId) {
        setMainImage(cur.image[0]);
        setProductDetails(cur);
      }
    });
  }
  useEffect(() => {
    showProductDetails();
  }, [productId]);
  console.log(productDetails);
  return productDetails ? (
    <div>
      <div>
        {/* product images */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/*  */}
          <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row ">
            <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19.7%] wfull">
              {productDetails.image.map((cur, ind) => (
                <img
                  src={cur}
                  alt=""
                  key={ind}
                  onClick={() => setMainImage(cur)}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={mainImage} alt="" />
            </div>
          </div>
          {/* product info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2 ">
              {productDetails.name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="text-3xl pt-2">
              {currency} {productDetails.price}
            </p>
            <p className="mt-2">{productDetails.description}</p>
            <div className="flex flex-col gap-4 my-8 ">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productDetails.sizes.map((cur, ind) => (
                  <button
                    onClick={() => setSize(cur)}
                    key={ind}
                    className={`p-4 border bg-gray-300 ${
                      sizes === cur ? "bg-orange-300" : ""
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productDetails._id,sizes)} className="bg-black text-white px-8 py-3 text-sm active:bg-amber-300">
                    ADD TO CART
            </button>
            <hr className="sm:w-4/5 mt-6"/>
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days. </p>

            </div>
            {/* review section */}
            <div className="mt-20">
                <div className="flex">
                  <b className="border px-5 py-3 text-sm"> Description</b>
                  <p className="border px-5 py-3 text-sm"> Review(34)</p>

                </div>
            </div>
            <RelatedProduct category={productDetails.category} subCategory={productDetails.subCategory}/>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Product;
