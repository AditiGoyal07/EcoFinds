import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    API.get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUser(res.data);
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setProfilePic(res.data.profilePic || "");
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in!");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (file) formData.append("profilePic", file);
    try {
      await API.put(`/users/${user.id}`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
      alert("Profile updated!");
      setPassword("");
      if (file) setProfilePic(URL.createObjectURL(file));
    } catch (err) { console.error(err); alert("Error updating profile"); }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "50px auto", textAlign: "center", padding: "25px", background: "#fff0f5", borderRadius: 15 }}>
      <h2 style={{ color: "#ff6f61" }}>User Dashboard</h2>
      {profilePic && <img src={profilePic.startsWith("http") ? profilePic : `http://localhost:5500${profilePic}`} alt="Profile" style={{ width: 130, height: 130, borderRadius: "50%", margin: "0 auto 20px auto", border: "3px solid #ff6f61" }} />}
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" style={inputStyle} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={inputStyle} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" type="password" style={inputStyle} />
        <input type="file" onChange={e => setFile(e.target.files[0])} style={inputStyle} />
        <button type="submit" style={btnStyle}>Update Profile</button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "8px", borderRadius: 8, border: "1px solid #ccc", outline: "none" };
const btnStyle = { padding: "10px", background: "#ff6f61", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "bold" };
