import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import PrivateRoute from "./PrivateRoute";
import MyListings from "./pages/MyListings";
import EditProduct from "./pages/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#4CAF50", display: "flex", flexWrap: "wrap" }}>
        <Link to="/register" style={{ color: "white", marginRight: "15px" }}>Register</Link>
        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>Login</Link>
        <Link to="/products" style={{ color: "white", marginRight: "15px" }}>Products</Link>
        <Link to="/my-listings" style={{ color: "white", marginRight: "15px" }}>My Listings</Link>
        <Link to="/add-product" style={{ color: "white", marginRight: "15px" }}>Add Product</Link>
        <Link to="/dashboard" style={{ color: "white", marginRight: "15px" }}>Dashboard</Link>
        <Link to="/cart" style={{ color: "white", marginRight: "15px" }}>Cart</Link>
        <Link to="/purchases" style={{ color: "white", marginRight: "15px" }}>Purchases</Link>
        <button 
          onClick={handleLogout} 
          style={{ marginLeft: "auto", padding: "5px 10px", cursor: "pointer", fontWeight: "bold" }}
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/purchases" element={<PrivateRoute><Purchases /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
