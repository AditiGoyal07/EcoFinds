import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => { fetchUser(); fetchProducts(); }, []);

  const fetchUser = async () => { if (!token) return; try { const res = await API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } }); setUser(res.data); } catch (err) { console.error(err); } };
  const fetchProducts = async () => { try { const res = await API.get("/products"); setProducts(res.data); } catch (err) { console.error(err); } };

  const handleDelete = async (id) => { if (!token) return alert("You must be logged in to delete a product."); try { await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } }); setProducts(products.filter(p => p.id !== id)); } catch (err) { console.error(err); alert("Error deleting product."); } };
  const handleEdit = (id) => navigate(`/edit/${id}`);
  const addToCart = (product) => { const cart = JSON.parse(localStorage.getItem("cart")) || []; localStorage.setItem("cart", JSON.stringify([...cart, product])); alert("Added to cart!"); };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Products</h2>
      <ul style={styles.list}>
        {products.map(p => (
          <li key={p.id} style={styles.card}>
            <strong style={{ fontSize: 18 }}>{p.title}</strong> - ${p.price}
            <p style={{ margin: "5px 0" }}>{p.description}</p>
            <em>{p.category}</em>
            <div style={{ marginTop: 10 }}>
              {user && user.id === p.userId && (
                <>
                  <button style={styles.editBtn} onClick={() => handleEdit(p.id)}>Edit</button>
                  <button style={styles.delBtn} onClick={() => handleDelete(p.id)}>Delete</button>
                </>
              )}
              {token && <button style={styles.cartBtn} onClick={() => addToCart(p)}>Add to Cart</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  title: { textAlign: "center", marginBottom: 20, color: "#333" },
  list: { listStyle: "none", padding: 0 },
  card: { background: "#fff", margin: "10px 0", padding: 15, borderRadius: 10, boxShadow: "0 3px 8px rgba(0,0,0,0.1)" },
  editBtn: { marginRight: 10, padding: "5px 10px", background: "#007bff", color: "white", border: "none", borderRadius: 6, cursor: "pointer" },
  delBtn: { marginRight: 10, padding: "5px 10px", background: "#dc3545", color: "white", border: "none", borderRadius: 6, cursor: "pointer" },
  cartBtn: { padding: "5px 10px", background: "#28a745", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }
};
