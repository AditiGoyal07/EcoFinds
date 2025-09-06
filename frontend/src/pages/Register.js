import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { username, email, password });
      alert(`User created: ${res.data.username}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("Error connecting to backend. Is it running?");
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
