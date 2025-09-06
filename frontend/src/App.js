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
      {/* Navbar */}
      <nav style={{ 
          padding: "10px 20px", 
          backgroundColor: "#4CAF50", 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center",
          gap: "10px" 
        }}>
        <span style={{ color: "white", fontWeight: "bold", fontSize: "25px", marginRight: "30px" }}>
          🌿 EcoFinds
        </span>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/my-listings" style={linkStyle}>My Listings</Link>
        <Link to="/add-product" style={linkStyle}>Add Product</Link>
        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/purchases" style={linkStyle}>Purchases</Link>
        <button 
          onClick={handleLogout} 
          style={{ 
            marginLeft: "auto", 
            padding: "5px 15px", 
            cursor: "pointer", 
            fontWeight: "bold", 
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#fd6d63ff",
            color: "white"
          }}
        >
          LOGOUT
        </button>
      </nav>

      {/* Routes */}
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

// Reusable style for links
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

export default App;
