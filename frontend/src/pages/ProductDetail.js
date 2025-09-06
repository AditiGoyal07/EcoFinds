import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    alert("✅ Added to cart!");
  };

  if (!product) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>⬅ Back</button>
      <div style={styles.card}>
        <div style={styles.imagePlaceholder}>
          <span>Image Placeholder</span>
        </div>
        <h2 style={styles.title}>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p>{product.description}</p>
        {token && <button onClick={() => addToCart(product)} style={styles.button}>Add to Cart</button>}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 650, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  backButton: { marginBottom: 15, padding: "6px 12px", borderRadius: 8, border: "none", background: "#ff6f61", color: "white", cursor: "pointer", fontWeight: "bold" },
  card: { padding: 20, borderRadius: 12, background: "linear-gradient(135deg, #fff8f0, #f0f9ff)", boxShadow: "0 6px 20px rgba(0,0,0,0.15)" },
  imagePlaceholder: { width: "100%", height: 250, background: "#eee", borderRadius: 10, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#aaa" },
  title: { color: "#ff6f61", marginBottom: 10 },
  button: { padding: "10px 16px", background: "#28a745", color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: "bold", marginTop: 15 }
};
