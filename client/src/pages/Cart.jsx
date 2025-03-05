import React, { useContext, useEffect, useState } from "react";
import { ContextComp } from "../context/CreateContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotoal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

function Cart() {
  let { products, currency, cartItems, updateQuantity,removeItem } = useContext(ContextComp);
  let [cartData, setCartData] = useState([]);
  let navigate = useNavigate()
  useEffect(() => {
    let tempData = [];
    for (let items in cartItems) {
      for (let i in cartItems[items]) {
        if (cartItems[items][i] > 0) {
          tempData.push({
            _id: items,
            size: i,
            quantity: cartItems[items][i],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);
  
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, ind) => {

          let productData = products.find(cur => {
            return cur._id === item._id
            
          });
          return (
            <div key={ind}>
              <div className="py-4 border-t text-gray-500 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6 ">
                  <img className="w-16" src={productData.image} alt="" />
                  <div className="">
                    <h1 className="text-sm sm:text-lg font-medium">
                      {" "}
                      {productData.name}
                    </h1>
                    <div>
                      <p className="flex items-center gap-5 mt-2">
                        {currency}
                        {productData.price}
                      </p>
                      <p>{item.size}</p>
                    </div>
                  </div>
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                  />
                  <img
                    onClick={() => removeItem(item._id,item.size)}
                    src={assets.bin_icon}
                    alt="bin"
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotoal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
