import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      // ✅ Save token in localStorage
      localStorage.setItem("token", res.data.token);

      setMessage("✅ Login successful!");
      console.log("User logged in:", res.data.user);

      // Optionally redirect to products page
      window.location.href = "/products";
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
