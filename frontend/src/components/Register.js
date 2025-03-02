import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();

  const isInvite = new URLSearchParams(location.search).get("invite"); // Check if invite is present

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", { username });
      localStorage.setItem("userId", response.data.user.id);

      if (isInvite) {
        // Generate WhatsApp invite link
        const inviteLink = `${window.location.origin}/play?invite=${response.data.user.id}`;
        const message = `Hey! I challenge you to play this game. Click here to join: ${inviteLink}`;
        window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
      } else {
        history.push("/play");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register to Play</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
