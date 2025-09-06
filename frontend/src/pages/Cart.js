import { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(p => p.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const purchaseAll = () => {
    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    localStorage.setItem("purchases", JSON.stringify([...purchases, ...cart]));
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
    alert("Purchase successful!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> :
        <div>
          {cart.map(p => (
            <div key={p.id} style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "6px", boxShadow: "0px 0px 5px #ccc" }}>
              <strong>{p.title}</strong> - ${p.price}
              <br />
              {p.description}
              <br />
              <em>{p.category}</em>
              <br />
              <button onClick={() => removeFromCart(p.id)} style={{ marginTop: "5px", padding: "5px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Remove</button>
            </div>
          ))}
          <button onClick={purchaseAll} style={{ marginTop: "10px", padding: "8px 12px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Purchase All</button>
        </div>
      }
    </div>
  );
}
