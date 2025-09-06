import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // 🔍 Apply filters whenever search or category changes
  useEffect(() => {
    let result = products;

    if (search.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    setFilteredProducts(result);
  }, [search, category, products]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#4CAF50", marginBottom: "20px" }}>
        🌱 EcoFinds Marketplace
      </h2>

      {/* Search + Filter */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minWidth: "200px" }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {/* Product Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
        gap: "20px" 
      }}>
        {filteredProducts.map(p => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "10px", background: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            
            {/* Product Image */}
            {p.image ? (
              <img
                src={p.image.startsWith("uploads") 
                  ? `http://localhost:5500/${p.image}` 
                  : `http://localhost:5500/uploads/${p.image}`}
                alt={p.title}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
              />
            ) : (
              <div style={{ width: "100%", height: "150px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}>
                No Image
              </div>
            )}

            {/* Product Info */}
            <h3 style={{ margin: "10px 0", color: "#333" }}>{p.title}</h3>
            <p style={{ color: "#555", fontSize: "14px" }}>{p.description}</p>
            <p style={{ fontWeight: "bold", color: "#4CAF50" }}>${p.price}</p>

            {/* View Details Button */}
            <Link 
              to={`/product/${p.id}`} 
              style={{ display: "inline-block", marginTop: "10px", padding: "8px 12px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px" }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
