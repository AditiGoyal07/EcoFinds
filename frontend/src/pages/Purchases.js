import { useState, useEffect } from "react";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const savedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(savedPurchases);
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Previous Purchases</h2>
      {purchases.length === 0 ? <p>No previous purchases</p> :
        <ul style={{ listStyle: "none", padding: 0 }}>
          {purchases.map(p => (
            <li key={p.id} style={{ background: "#fff", padding: "10px", margin: "10px 0", borderRadius: "6px", boxShadow: "0px 0px 5px #ccc" }}>
              <strong>{p.title}</strong> - ${p.price}
              <br />
              {p.description}
              <br />
              <em>{p.category}</em>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
