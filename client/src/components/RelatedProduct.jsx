import React, { useContext, useEffect, useState } from "react";
import { ContextComp } from "../context/CreateContext";

function RelatedProduct({ category, subCategory }) {
  let { products } = useContext(ContextComp);
  let [filterRelatedProduct, setFilterRelatedProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((cur) => category === cur.category);
      productCopy = productCopy.filter(
        (cur) => subCategory === cur.subCategory
      );
      console.log(productCopy.slice(0, 5));
      setFilterRelatedProduct(productCopy);
    }
  }, [category, subCategory]);
  return (
    <div className="my-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {filterRelatedProduct.map((cur, ind) => (
          <img key={ind} src={cur.image[0]} alt="" />
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
