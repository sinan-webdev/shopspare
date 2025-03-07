import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Placeorder from "./pages/Placeorder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import {ToastContainer} from "react-toastify"
function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg-px-[9vw]">
      <Navbar />
      <Searchbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
