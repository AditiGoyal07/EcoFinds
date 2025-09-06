import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center p-4 bg-green-100 shadow-md">
      {/* Text logo */}
      <div className="text-3xl font-bold text-white bg-green-600 px-6 py-2 rounded-md mb-4">
        EcoFinds
      </div>

      {/* Navigation links */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/register">Register</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/login">Login</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/products">Products</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/mylistings">My Listings</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/add-product">Add Product</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/dashboard">Dashboard</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/cart">Cart</Link>
        <Link className="px-4 py-2 rounded hover:bg-green-200 transition" to="/purchases">Purchases</Link>
      </div>
    </nav>
  );
};

export default Navbar;
