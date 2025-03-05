import React, { useContext } from "react";
import { ContextComp } from "../context/CreateContext";
import { Link } from "react-router-dom";
function ProuductItem({ id, name, image, price, bestseller }) {
  let { currency } = useContext(ContextComp);
  return (
    <Link className="cursor-pointer" to={`/products/${id}`}>
      <div className="h-80 w-56 border p-2 rounded-lg shadow-md">
        <div className="h-full w-full">
          <div className="relative h-3/4 w-full">
            <img src={image[0]} alt={id} className="h-full w-full object-cover "/>
            {bestseller ? (
              <p className="absolute top-0 left-0 bg-black px-2 text-white w-2/4">
                Best Seller
              </p>
            ) : null}
          </div>
          <h1 className="p-3 text-2xl">{name}</h1>
          <div className="flex items-center ">
            <p>{currency}</p>
            <p>{price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProuductItem;
