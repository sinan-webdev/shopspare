import React, { useContext, useEffect, useState } from "react";
import { ContextComp } from "../context/CreateContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProuductItem from "../components/ProuductItem";

function Collection() {
  let { products, searchVal, showSearch } = useContext(ContextComp);
  let [showFilter, setShowFilter] = useState(false);
  let [filterProducts, setFilterProducts] = useState([]);
  let [category, setCatagory] = useState([]);
  let [subCatagory, setSubCatagory] = useState([]);
  let [sortType, setSortType] = useState("relevent");

  let toggleCatagory = (e) => {
    if (category.includes(e.target.value)) {
      setCatagory((prev) => prev.filter((cur) => cur !== e.target.value));
    } else {
      setCatagory((prev) => [...prev, e.target.value]);
    }
  };
  let toggleSubCatagory = (e) => {
    if (category.includes(e.target.value)) {
      setSubCatagory((prev) => prev.filter((cur) => cur !== e.target.value));
    } else {
      setSubCatagory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && searchVal) {
      productCopy = productCopy.filter((cur) =>
        cur.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((cur) =>
        category.includes(cur.category)
      );
    }
    if (subCatagory.length > 0) {
      productCopy = productCopy.filter((cur) =>
        subCatagory.includes(cur.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };

  const sortProduct = () => {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(
          filterProductCopy.sort((a, b) => a.price - b.price).reverse()
        );
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
    applyFilter();
  }, [category, subCatagory, searchVal,products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* filter options */}
        <div className="min-w-60 transition-all">
          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            />
          </p>
        </div>
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p>CATAGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Men"
                onChange={toggleCatagory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Women"
                onChange={toggleCatagory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Kids"
                onChange={toggleCatagory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* sub category */}
        <div
          className={`border border-gray-300 pl-3 py-3 my-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Topwear"
                onChange={toggleSubCatagory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Bottomwear"
                onChange={toggleSubCatagory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Winterwear"
                onChange={toggleSubCatagory}
              />
              Winterwear
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="flex-1">
          <div>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            {/* product sort */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="px-2 border-2 text-sm border-gray-300 outline-none"
            >
              <option value="relevant">Sort by:relevent</option>
              <option value="low-high">Sort by:low to high</option>
              <option value="high-low">Sort by:high to low</option>
            </select>
          </div>
          {/* map products */}
          <div className="grid grid-cols-1 mx-auto justify-items-center mt-20 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((cur, ind) => (
              <ProuductItem
                key={ind}
                name={cur.name}
                id={cur._id}
                image={cur.image}
                price={cur.price}
                bestseller={cur.bestseller}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
