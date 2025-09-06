import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return setMessage("You must be logged in.");
    try {
      await API.post("/products", { title, description, category, price, image }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Product added successfully!");
      setTitle(""); setDescription(""); setCategory(""); setPrice(""); setImage("");
      navigate("/my-listings");
    } catch (err) { console.error(err); setMessage("Error adding product."); }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 25, background: "#fff8f0", borderRadius: 15 }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={4}></textarea>
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
