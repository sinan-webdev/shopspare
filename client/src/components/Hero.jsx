import React from "react";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <div>
      <div className="w-full h-[80vh] sm:flex">
        {/* hero left */}
        <div className="w-full  flex-col sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="flex items-center gap-2">
            <p className="w-8 h-[2px] border-2 md:w-11 bg-black"></p>
            <p>OUR BESTSELLER</p>
          </div>
          <p className="font-parata text-4xl">latest Arrivals</p>
          <div className="flex items-center  gap-2">
            <p>OUR BESTSELLER</p>
            <p className="w-8 h-[2px] border-2 md:w-11 bg-black"></p>
          </div>
        </div>

        {/* hero right side */}
        <img src={assets.p_img48} alt="mainn_image" className="w-full h-full object-contain sm:w-1/2 flex items-center justify-center py-10 sm:py-0" />
      </div>
    </div>
  );
}

export default Hero;
