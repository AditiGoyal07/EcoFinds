import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

export default function EditProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const p = res.data;
        setTitle(p.title);
        setDescription(p.description);
        setCategory(p.category);
        setPrice(p.price);
        setImage(p.image);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Error fetching product data.");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in!");

    try {
      await API.put(
        `/products/${id}`,
        { title, description, category, price, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Error updating product. You can only edit your own listings.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading product...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "20px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Edit Product</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>Update Product</button>
    </form>
  );
}
