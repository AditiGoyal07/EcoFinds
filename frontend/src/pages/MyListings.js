import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const userRes = await API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
        setUser(userRes.data);

        const productsRes = await API.get("/products");
        const userProducts = productsRes.data.filter(p => p.userId === userRes.data.id);
        setProducts(userProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in!");

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter(p => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>My Listings</h2>
      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{p.title}</h3>
          {user.profilePic && <img src={user.profilePic.startsWith("http") ? user.profilePic : `http://localhost:5500${user.profilePic}`} alt="Profile" style={{ width: 50, height: 50, borderRadius: "50%", marginRight: "10px" }} />}
          <p>{p.description}</p>
          <p><strong>Category:</strong> {p.category}</p>
          <p><strong>Price:</strong> ${p.price}</p>
          {p.image && <img src={p.image} alt={p.title} style={{ width: 150, height: 150, objectFit: "cover" }} />}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleEdit(p.id)} style={{ marginRight: "10px" }}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
