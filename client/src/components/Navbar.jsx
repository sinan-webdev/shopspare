import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ContextComp } from "../context/CreateContext";
function Navbar() {
  let navigate = useNavigate()
    let  [visible,setVisible] = useState(false)
    let {showSearch,setShowSearch,getCartItemCount,setCartItems,token,setToken} = useContext(ContextComp)
    function logout(){
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
      navigate("/login")
    }
    
  return (
    <div className=" w-full">
      <div className="flex items-center justify-between w-full py-4">
        <Link to={"/"} > <div className="text-2xl">ShopSphere</div></Link>
        <div className="hidden sm:block">
          <ul className="flex items-center gap-3">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to="/collection">
              <p>Collenction</p>
            </NavLink>
            <NavLink to="/contact">
              <p>Contact</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <img
            src={assets.search_icon}
            alt="search_icon"
            className="w-5 cursor-pointer"
            onClick={()=>setShowSearch(!showSearch)}
          />
          <div className="group relative cursor-pointer flex gap-3">
            <img onClick={()=>navigate("/login")} src={assets.profile_icon} alt="profile_icon" className="w-5" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-8">
              {/* dropdown menu */}
              {token && <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-300 text-black rounded">
                <p onClick={()=>navigate("/orders")} className="cursor-pointer text-black">Orders</p>
                <p onClick={()=>logout()} className="cursor-pointer text-black">Logout</p>
              </div>}
            </div>
          </div>
          <Link to={"/cart"} className="relative">
            <img src={assets.cart_icon} alt="cart-icon" className="w-5" />
            <p className="absolute bottom-[-5px] right-[-5px] w-4 leading-4 bg-black text-white text-[8px] rounded-full text-center">{getCartItemCount()}</p>
          </Link>
          {/* mobile menu */}
          <img src={assets.menu_icon} alt="menu_icon" className="w-6 sm:hidden" onClick={()=>setVisible(true)}/>
          <div className={`text-white bg-black absolute top-0 right-0 bottom-0 transition-all ${visible?'w-full':'w-0'} overflow-hidden`}>
            <p className="text-3xl p-3 font-parata" onClick={()=>setVisible(false)}>back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
