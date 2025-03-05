import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const ContextComp = createContext();

export const ProviderComp = ({ children }) => {
    const currency = "$";
    let backendUrl = import.meta.env.VITE_BACKEND_URL
    
    let delivary_fee = 10;
    let [searchVal, setSearchVal] = useState("");
    let [showSearch, setShowSearch] = useState(true);
    let [cartItems, setCartItems] = useState({});
    let [products,setProducts] = useState([])
    let [token,setToken] = useState(localStorage.getItem('token'))

  let addToCart = async (itemId, sizes) => {
    if (!sizes) {
      return toast.error("please select size");
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][sizes]) {
        cartData[itemId][sizes] += 1;
      } else {
        cartData[itemId][sizes] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][sizes] = 1;
    }

    setCartItems(cartData);
    let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/addtocart`,{itemId,sizes},{headers:{Authorization:`Bearer ${token}`}})
    if(data.success){
      toast.success(data.message)
      getCartItemCount()
      
    }else{toast.error(data.message)}
  };


  async function updateQuantity(itemId, sizes, quantity) {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    try {
      if(token){
        await axios.post(`${backendUrl}/api/v1/cart/updatecart`,{itemId,sizes,quantity},{headers:{Authorization:`Bearer ${token}`}})
        getUserCart(token)
      }
    } catch (error) {
      
    }
  }
  
  function getCartAmount() {
    let totalAmount = 0;
    for (let item in cartItems) {
      let itemInfo = products.find((cur) => cur._id === item);
      for (let i in cartItems[item]) {
        try {
          if (cartItems[item][i] > 0) {
            totalAmount += itemInfo.price * cartItems[item][i];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  }
  async function getUserCart(token) {
    try {
      let {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/getusercart`,{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
          setCartItems(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getCartItemCount()
  }, [cartItems]);

  useEffect(()=>{
    if(token && localStorage.getItem('token')){
      getUserCart(token);
    }
  },[])

  function getCartItemCount() {
    let itemCount = 0;  
    for (let i in cartItems) {
      itemCount += 1;
    }
    return itemCount;
    
  }
  async function  getProductData() {
    try {
      let {data} = await axios.get(`${backendUrl}/api/v1/product/list`)
      if(data.success){
        setProducts(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  async function removeItem(itemId,sizes) {
    try {
      let {data} = await axios.post(`${backendUrl}/api/v1/cart/removeitem`,{itemId,sizes},{headers:{Authorization:`Bearer ${token}`}})
      if(data.success){
        getUserCart(token)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{getProductData()},[])
  let value = {
    products,
    currency,
    searchVal,
    setSearchVal,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartItemCount,
    updateQuantity,
    getCartAmount,
    delivary_fee,
    token,setToken,backendUrl,removeItem,getUserCart
  };
  return <ContextComp.Provider value={value}>{children}</ContextComp.Provider>;
};
