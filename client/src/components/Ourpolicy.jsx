import React from "react";
import { assets } from "../assets/assets";

function Ourpolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchangeicon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free policy </p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          alt="exchangeicon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free policy </p>
      </div>
      <div>
        <img
          src={assets.support_img}
          alt="exchangeicon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free policy </p>
      </div>
    </div>
  );
}

export default Ourpolicy;
