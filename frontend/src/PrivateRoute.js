import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to access this page!");
    return <Navigate to="/login" />;
  }
  return children;
}
